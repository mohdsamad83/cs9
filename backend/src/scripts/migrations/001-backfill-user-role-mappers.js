import 'dotenv/config'
import mongoose from 'mongoose'
import connectDB from '../../config/db.js'
import Role from '../../models/role.model.js'
import User from '../../models/user.model.js'
import UserRoleMapper from '../../models/user-role-mapper.model.js'
import { ensureRole, normalizeRoleName } from '../../services/role.service.js'

const apply = process.argv.includes('--apply')
const dryRun = !apply

const stats = {
  mode: dryRun ? 'dry-run' : 'apply',
  scanned: 0,
  invalidRole: 0,
  missingRoleDocument: 0,
  alreadyMapped: 0,
  wouldInsert: 0,
  inserted: 0,
  insertConflicts: 0,
  wouldUnsetUsers: 0,
  unsetUsers: 0,
}

async function findRole(roleName) {
  if (apply) {
    return ensureRole(roleName)
  }

  return Role.findOne({ name: roleName.toLowerCase() }).lean()
}

try {
  await connectDB()

  const cursor = User.collection.find(
    { role: { $exists: true } },
    { projection: { user_id: 1, email: 1, role: 1 } },
  )

  for await (const user of cursor) {
    stats.scanned += 1

    const roleName = normalizeRoleName(user.role)

    if (!roleName) {
      stats.invalidRole += 1
      console.warn(`Skipping ${user.email || user.user_id}: invalid role "${user.role}"`)
      continue
    }

    const role = await findRole(roleName)

    if (!role) {
      stats.missingRoleDocument += 1
      console.warn(`Skipping ${user.email || user.user_id}: missing role document ${roleName}`)
      continue
    }

    const existing = await UserRoleMapper.exists({
      user_id: user.user_id,
      role_id: role.role_id,
    })

    if (existing) {
      stats.alreadyMapped += 1
      continue
    }

    if (dryRun) {
      stats.wouldInsert += 1
      continue
    }

    try {
      await UserRoleMapper.create({
        user_id: user.user_id,
        role_id: role.role_id,
      })
      stats.inserted += 1
    } catch (error) {
      if (error.code === 11000) {
        stats.insertConflicts += 1
      } else {
        throw error
      }
    }
  }

  if (dryRun) {
    stats.wouldUnsetUsers = stats.scanned
  } else {
    const result = await User.collection.updateMany(
      { role: { $exists: true } },
      { $unset: { role: '' } },
    )
    stats.unsetUsers = result.modifiedCount
  }

  console.log(JSON.stringify(stats, null, 2))
} finally {
  await mongoose.disconnect()
}

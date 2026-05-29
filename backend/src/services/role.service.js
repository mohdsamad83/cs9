import Role from '../models/role.model.js'
import UserRoleMapper from '../models/user-role-mapper.model.js'

const ROLES = ['USER', 'RESOLVER', 'ADMIN']
const ROLE_PRIORITY = ['ADMIN', 'RESOLVER', 'USER']

export function normalizeRoleName(value) {
  const role = typeof value === 'string' ? value.trim().toUpperCase() : ''

  return ROLES.includes(role) ? role : null
}

export async function ensureRole(roleName) {
  const normalizedRole = normalizeRoleName(roleName)

  if (!normalizedRole) {
    return null
  }

  return Role.findOneAndUpdate(
    { name: normalizedRole.toLowerCase() },
    { $setOnInsert: { name: normalizedRole.toLowerCase() } },
    { returnDocument: 'after', upsert: true, runValidators: true },
  )
}

export async function getMappedRoles(userId) {
  const mappings = await UserRoleMapper.find({ user_id: userId }).lean()

  if (!mappings.length) {
    return []
  }

  const roleIds = mappings.map((mapping) => mapping.role_id)
  const roles = await Role.find({ role_id: { $in: roleIds } }).lean()

  return roles
    .map((role) => normalizeRoleName(role.name))
    .filter(Boolean)
}

export async function getUserRoles(user) {
  const mappedRoles = await getMappedRoles(user.user_id)

  return mappedRoles.length ? mappedRoles : ['USER']
}

export function getPrimaryRole(roles) {
  return ROLE_PRIORITY.find((role) => roles.includes(role)) || 'USER'
}

export async function getUserIdsByRole(roleName) {
  const normalizedRole = normalizeRoleName(roleName)

  if (!normalizedRole) {
    return []
  }

  const role = await Role.findOne({ name: normalizedRole.toLowerCase() }).lean()

  if (!role) {
    return []
  }

  const mappings = await UserRoleMapper.find({ role_id: role.role_id })
    .select('user_id')
    .lean()

  return mappings.map((mapping) => mapping.user_id)
}

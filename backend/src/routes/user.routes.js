import { Router } from 'express'
import {
  getUserById,
  getUserContributions,
  getMyContributions,
  listUsers,
  updateUserStatus,
} from '../controllers/user.controller.js'
import { checkRole, verifyToken } from '../middleware/authMiddleware.js'

const router = Router()

// Block ADMINs from user-scoped routes — they belong in admin.routes.js
router.use(verifyToken, (req, res, next) => {
  if (req.user?.roles?.includes('ADMIN')) {
    return res.status(403).json({ message: 'Admins cannot access user routes' })
  }
  next()
})

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: List and filter users for administration
 *     tags: [Users, Admin]
 *     responses:
 *       200:
 *         description: Paginated users.
 *       403:
 *         description: ADMIN role required.
 */
router.get('/', checkRole('ADMIN'), listUsers)
router.get('/me/contributions', getMyContributions)
router.get('/:userId', getUserById)
router.get('/:userId/contributions', getUserContributions)
router.patch('/:userId/status', checkRole('ADMIN'), updateUserStatus)

export default router

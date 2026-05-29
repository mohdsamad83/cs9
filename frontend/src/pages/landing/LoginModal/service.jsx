import { axisPrivate } from '../../../api/axios'

export async function authLogin(userId, password) {
  const { data } = await axisPrivate().post('/api/auth/login', {
    email: userId,
    password,
  })

  return data
}

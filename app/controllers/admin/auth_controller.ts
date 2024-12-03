import type { HttpContext } from '@adonisjs/core/http'
import Admin from '../../models/admin.js'
import edge from 'edge.js'

// import {  loginValidator } from '../../validators/admin/auth.js'
export default class AuthController {
  async create({ request, response, auth }: HttpContext) {
    const userData = request.only(['email', 'password', 'name', 'phone', 'role'])

    await Admin.create(userData)
    const admin = await Admin.verifyCredentials(userData.email, userData.password)
    await auth.use('admin').login(admin)

    edge.global('admin', {
      admin,
      isLoggedin: true,
    })
    return response.redirect().toRoute('admin.dashboard')
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.all()

    try {

      const admin = await Admin.verifyCredentials(email, password)
      await auth.use('admin').login(admin)
      //saves user data to be accessed by frontend
      edge.global('admin', {
        admin,
        isLoggedin: true,
      })

      return response.redirect().toRoute('admin.dashboard')
    } catch (error) {
      console.log('redirect', error)

      return response.redirect('back')
    }
  }
  async logout({ auth }: HttpContext) {
    auth.use('admin').logout()
    edge.global('admin', {
      admin: {},
      isLoggedin: false,
    })
  }
}

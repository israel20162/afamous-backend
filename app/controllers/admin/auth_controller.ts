import type { HttpContext } from '@adonisjs/core/http'
import Admin from '../../models/admin.js'
import edge from 'edge.js'

// import {  loginValidator } from '../../validators/admin/auth.js'
export default class AuthController {
  async create({ request, response }: HttpContext) {
    const userData = request.only(['email', 'password', 'name', 'phone', 'role'])

    await Admin.create(userData)
    return response.redirect().toRoute('admin.dashboard')
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.all()

    try {
      await auth.use('basicAuth').authenticate()
      await auth.use('basicAuth').authenticateAsClient(email, password)
      const admin = await Admin.verifyCredentials(email, password)
      //saves user data to be accessed by frontend
      edge.global('admin', {
        admin,
        isLoggedin: true,
      })
      // const admin = await Admin.findBy('email',auth.user?.email)
      // console.log(admin);

      // const token = await Admin.accessTokens.create(admin, ['*'])
      // await auth.authenticateUsing(['admin'],{'loginRoute':'/admin/login'})
      return response.redirect().toRoute('admin.dashboard')
    } catch (error) {
      console.log('redirect', error)

      return response.redirect('back')
    }
  }
  async logout() {
    edge.global('admin', {
      admin: {},
      isLoggedin: false,
    })
  }
}

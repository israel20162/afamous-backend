/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import Admin from '#models/admin'
import edge from 'edge.js'
const AuthController = () => import('#controllers/admin/auth_controller')

router.group(() => {
  router
    .get('/dashboard', async ({ view, auth }) => {
     
      
      return view.render('pages/home')
    })
    .as('admin.dashboard')
    .use(
      middleware.auth({
        guards: ['basicAuth'],
      })
    )
})

// auth group route
router
  .group(() => {
    router.get('/login', async ({ view }) => {
      return view.render('pages/auth/login')
    })
    router.get('/create', async ({ view }) => {
      return view.render('pages/auth/register')
    })
    router.post('/login', [AuthController, 'login']).as('admin.login')
    router.post('/create', [AuthController, 'create']).as('admin.create')
  })
  .prefix('admin')

//  router.on('/login').render('')

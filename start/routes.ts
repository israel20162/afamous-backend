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

const AuthController = () => import('#controllers/admin/auth_controller')


// admin group route
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

    router
      .get('/dashboard', async ({ view, }) => {
        return view.render('pages/home')
      })
      .as('admin.dashboard')
      .use(
        [
          middleware.auth({
            guards: ['admin'],
          })
        ]
      )
      })
  .prefix('admin')

//  router.on('/login').render('')

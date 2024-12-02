import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
   console.log(ctx)
    // const {auth} = ctx
  //  await  auth.authenticateUsing(['admin'])
  //  console.log(await auth.use('admin').check());
  //   if (await auth.use('admin').check()) {
  //     console.log(auth.isAuthenticated);
  //     auth.authenticateUsing(['admin'])
  //     await next()
  //   }
    

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
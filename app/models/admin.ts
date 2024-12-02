import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
// import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
// import { AccessToken } from '@adonisjs/auth/access_tokens'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class Admin extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare name:string
  @column()
  declare email: string
  @column()
  declare password: string
  @column()
  declare phone: string
  @column()
  declare role: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime


  // currentAccessToken?: AccessToken
  // static accessTokens = DbAccessTokensProvider.forModel(Admin, {
  //   expiresIn: '5 days',
  //   prefix: 'oat_',
  //   table: 'admin_auth_access_tokens',
  //   type: 'auth_token',
  //   tokenSecretLength: 40,
  // })
}

import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'admins'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('phone')
      table.string('email').unique()
      table.text('password')
      table.enum('role', ['SUPER_ADMIN', 'ADMIN'], {
        useNative: true,
        enumName: 'admin_role',
        existingType: false,
        schemaName: 'public'
      })

      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.raw('DROP TYPE IF EXISTS "admin_role"')
    this.schema.dropTable(this.tableName)
  }
}

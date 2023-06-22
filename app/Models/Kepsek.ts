import { DateTime } from 'luxon'
import { BaseModel, afterCreate, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
let newId = ""

export default class Kepsek extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public nama_kepsek: string

  @column()
  public id_sekolah: string

  @column()
  public nip: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(kepsek: Kepsek) {
    newId = uuidv4()
    kepsek.id = newId
  }

  @afterCreate()
  public static setNewId(kepsek: Kepsek) {
    kepsek.id = newId
  }
}

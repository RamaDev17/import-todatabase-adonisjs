import { DateTime } from 'luxon'
import { BaseModel, afterCreate, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
let newId = ""

export default class Sekolah extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public nama_sekolah: string

  @column()
  public kode_sekolah: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(Sekolah: Sekolah) {
    newId = uuidv4()
    Sekolah.id = newId
  }

  @afterCreate()
  public static setNewId(Sekolah: Sekolah) {
    Sekolah.id = newId
  }
}

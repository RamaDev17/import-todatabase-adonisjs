import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ImportService from 'App/services/ImportServices'

export default class ImportsController {
  public async import({ request, response }: HttpContextContract) {
    let upload = request.file('upload')
    let fname = `${new Date().getTime()}.${upload?.extname}`
    let dir = 'upload/'

    //move uploaded file into custom folder

    if (upload) {
      try {
        await upload.move(Application.tmpPath(dir), {
          name: fname
        })
      } catch (error) {
        console.log(error);

      }

      await ImportService.ImportClassification('tmp/' + dir + fname)
      // console.log(send)

      response.ok({message: 'Success'})
    }
  }
}

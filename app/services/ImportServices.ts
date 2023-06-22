'use strict'

import Kepsek from "App/Models/Kepsek"
import Sekolah from "App/Models/Sekolah"
const Excel = require('exceljs')

class ImportService {
    static async ImportClassification(filelocation) {
        var workbook = new Excel.Workbook()

        workbook = await workbook.xlsx.readFile(filelocation)

        let explanation = workbook.getWorksheet('Sheet 1') // get sheet name

        let colComment = explanation.getColumn('C') //column name

        colComment.eachCell(async (cell, rowNumber) => {
            
            if (rowNumber >= 11) {
                let sekolah = explanation.getCell('B' + rowNumber).value //get cell and the row
                let kode = explanation.getCell('C' + rowNumber).value
                let nama = explanation.getCell('D' + rowNumber).value
                let nip = explanation.getCell('E' + rowNumber).value


                if (typeof (sekolah) == 'string' && typeof (kode) == 'string') {
                    // console.log("nama_sekolah : " + sekolah);
                    // console.log("kode_sekolah : " + kode);
                    // console.log("nama_kepsek : " + nama);
                    // console.log("nip : " + nip);

                    // custom field name in database to variable
                    let inputSekolah = {
                        nama_sekolah: sekolah,
                        kode_sekolah: kode
                    }

                    let inputNama = {
                        nama_kepsek: nama,
                        nip: nip,
                        id_sekolah: kode
                    }
                    
                    await Sekolah.create(inputSekolah)

                }

            }
        })
    }
}

export default ImportService
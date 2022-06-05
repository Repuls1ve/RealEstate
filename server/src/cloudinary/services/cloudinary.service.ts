import { Injectable } from '@nestjs/common'
import { UploadApiErrorResponse, UploadApiOptions, UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import toStream = require('buffer-to-stream')

@Injectable()
export class CloudinaryService {
  public async uploadImage(
    file: Express.Multer.File,
    options?: UploadApiOptions
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(options, (error, result) => {
        if (error) return reject(error)
        resolve(result)
      })

      toStream(file.buffer).pipe(upload)
    })
  }
}

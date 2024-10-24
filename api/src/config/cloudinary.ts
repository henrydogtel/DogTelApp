import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from 'src/helpers/developmentEnv';

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

export const storage = new CloudinaryStorage({
    cloudinary: cloudinary,  
    params: async (req, file) => {
      const fileFormat = file.mimetype.split('/')[1];
      return {
        folder: 'uploads',
        format: fileFormat,
        public_id: file.originalname.split('.')[0], 
      };
    },
  });





// con el metodo  config service
// import { v2 as cloudinary } from 'cloudinary';
// import { ConfigService } from '@nestjs/config';

// export const CloudinaryProvider = {
//   provide: 'Cloudinary',
//   useFactory: (configService: ConfigService) => {
//     return cloudinary.config({
//       cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
//       api_key: configService.get('CLOUDINARY_API_KEY'),
//       api_secret: configService.get('CLOUDINARY_API_SECRET'),
//     });
//   },
//   inject: [ConfigService],
// };

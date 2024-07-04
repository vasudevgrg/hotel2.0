const cloudinary = require('cloudinary').v2;

class FileUploadServices{
  createImageUpload=async ()=>{
    const timestamp = new Date().getTime()
    const signature = await cloudinary.utils.api_sign_request(
      {
        timestamp,
      },
      process.env.API_SECRET
    )
    return { timestamp, signature }
  };


};

module.exports= new FileUploadServices();
const cloudinary = require("cloudinary").v2;
const fs = require("fs")


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});




const uploadOnCloudinary = async (localFilePath) => {
    console.log(process.env.CLOUD_NAME);
    console.log(process.env.API_KEY);
    console.log(process.env.API_SECRET);

    
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })

        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);

        fs.unlinkSync(localFilePath) // ! need to check 
        console.log(`Removile file from`, localFilePath);

        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

module.exports = uploadOnCloudinary 
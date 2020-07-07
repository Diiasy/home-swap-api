const uploadCloud = require('../config/cloudinary.js');

module.exports = function(public_id, error){
    return uploadCloud.storage.cloudinary.uploader
    .destroy(public_id.picture_id,(error, result)=> {
        console.log(error)
    })
}

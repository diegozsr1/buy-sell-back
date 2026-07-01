const cloudinary = require('../config/cloudinary.js');

const extractPublicIdFromUrl = (url) => {
    if (!url || !url.includes('cloudinary.com')) return null;

    const uploadIndex = url.indexOf('/upload/');
    if (uploadIndex === -1) return null;

    let path = url.slice(uploadIndex + '/upload/'.length);
    path = path.replace(/^v\d+\//, '');
    return path.replace(/\.[^/.]+$/, '');
};

const uploadImage = (file, folder) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'image',
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        );

        stream.end(file.buffer);
    });
};

const uploadIcono = (file) => uploadImage(file, 'categorias/iconos');

const uploadFotoArticulo = (file) => uploadImage(file, 'articulos/fotos');

const deleteImage = async (url) => {
    const publicId = extractPublicIdFromUrl(url);
    if (!publicId) return;

    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
};

const deleteIcono = deleteImage;

module.exports = {
    uploadIcono,
    uploadFotoArticulo,
    deleteIcono,
    deleteImage,
    extractPublicIdFromUrl,
};

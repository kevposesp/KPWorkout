import Api from './Api';

const ImageService = {


    uploadImage(image) {
        return Api("multipart/form-data").post(`upload-image`, image);
    }

}

export default ImageService;
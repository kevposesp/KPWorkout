import { useCallback } from "react"
import ImageService from "../services/ImageService";
import { useToastr } from "./useToastr";

export function useImage() {

    const { useCreateToastr } = useToastr();

    const uploadImage = useCallback(async (image, type = "user") => {
        image.append('type', type);
        ImageService.uploadImage(image)
            .then(response => {
                useCreateToastr({ status: true });
            })
            .catch(error => {
                useCreateToastr({ status: true, message: e.response.data.message, error: 'error' })
            });
    }, []);

    return {
        uploadImage
    }
}
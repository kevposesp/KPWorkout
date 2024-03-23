import { useCallback } from "react"
import ImageService from "../services/ImageService";
import { useToastr } from "./useToastr";
import { useAuth } from "./useAuth";

export function useImage() {

    const { useCreateToastr } = useToastr();
    const { user, setUser } = useAuth();

    const uploadImage = useCallback(async (image) => {
        ImageService.uploadImage(image)
            .then(response => {
                setUser({ ...user, image_url: response.data.image_url });
                useCreateToastr({ status: true });
            })
            .catch(e => {
                console.log(e.response.data.message);
                useCreateToastr({ status: true, message: e.response.data.message, error: 'error' })
            });
    }, []);

    return {
        uploadImage
    }
}
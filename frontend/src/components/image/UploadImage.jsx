import React, { useState } from 'react';
import { useImage } from '@/hooks/useImage';

function ImageUpload() {

    const { uploadImage } = useImage();
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        console.log(formData.get('image'));
        uploadImage(formData)
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Subir Imagen</button>
        </form>
    );
}

export default ImageUpload;

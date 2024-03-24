import React, { useState } from 'react';
import { useImage } from '@/hooks/useImage';
import { Button } from 'flowbite-react';

function ImageUpload({ sendData = true }) {

    const { uploadImage } = useImage();
    const [image, setImage] = useState(null);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('image', image);
        uploadImage(formData)
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <form>
            <input type="file" className='my-5' onChange={handleFileChange} />
            <Button color="blue" onClick={() => { handleSubmit(); sendData() }}>
                Update
            </Button>
        </form>
    );
}

export default ImageUpload;

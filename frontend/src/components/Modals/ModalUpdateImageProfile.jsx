import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import UploadImage from '@/components/image/UploadImage';

const ModalUpdateImageProfile = ({ user }) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <div className="relative flex-shrink-0 cursor-pointer" onClick={() => setOpenModal(true)}>
                <div className="relative">
                    <img src={user.image_url} alt="profile"
                        className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover hover:bg-gray-200" />
                    <div className="rounded-full w-14 h-14 absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100">
                        <span className="text-white text-sm">Edit</span>
                    </div>
                </div>
            </div>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div>
                        <div className='flex justify-center'>
                            <img src={user.image_url} alt="profile"
                                className="rounded-full w-52 h-52 border border-gray-200 p-1 object-cover" />
                        </div>
                        <div>
                            <UploadImage />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalUpdateImageProfile;

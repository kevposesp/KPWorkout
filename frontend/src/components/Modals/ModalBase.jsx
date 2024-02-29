import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';

function ModalComponent({
  sendData,
  children,
  settings = {
    titleButton: 'Create',
    type: 'create',
    color: 'blue',
  }
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button color={settings.color} onClick={() => setOpenModal(true)}>
        {settings.titleButton}
      </Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {children}
            <div className="flex justify-center gap-4">
              <Button color={settings.color} onClick={() => { setOpenModal(false); sendData(true) }}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ModalComponent;
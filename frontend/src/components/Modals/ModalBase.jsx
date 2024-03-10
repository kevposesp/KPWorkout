import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';

function ModalComponent({
  sendData,
  children,
  settings = {
    titleButton: 'Create',
    type: 'create',
    color: 'blue',
    classButton: false,
    divClass: 'text-center'
  }
}) {

  const [settingsModal, setSettingsModal] = useState({
    titleButton: settings.titleButton || 'Create',
    type: settings.type || 'create',
    color: settings.color || 'blue',
    classButton: settings.classButton || false,
    divClass: settings.divClass || 'text-center'
  });
  const [openModal, setOpenModal] = useState(false);

  const clsButton = settingsModal.classButton ? settingsModal.classButton : "";

  return (
    <>
      <Button color={settingsModal.color} className={clsButton} onClick={() => setOpenModal(true)}>
        {settingsModal.titleButton}
      </Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className={settingsModal.divClass}>
            {children}
            <div className="flex justify-center gap-4 mt-3">
              <Button color={settingsModal.color} onClick={() => { setOpenModal(false); sendData(true) }}>
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
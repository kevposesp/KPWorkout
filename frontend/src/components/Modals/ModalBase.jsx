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
    divClass: 'text-center',
    okkayButton: 'Yes, I\'m sure',
    closeButton: 'No, cancel'
  }
}) {

  const [settingsModal, setSettingsModal] = useState({
    titleButton: settings.titleButton || 'Create',
    type: settings.type || 'create',
    color: settings.color || 'blue',
    classButton: settings.classButton || false,
    divClass: settings.divClass || 'text-center',
    okkayButton: settings.okkayButton == false ? false : settings.okkayButton || 'Yes, I\'m sure',
    closeButton: settings.closeButton == false ? false : settings.closeButton || 'No, cancel'
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
              {settingsModal.okkayButton && (
                <Button color={settingsModal.color} onClick={() => { setOpenModal(false); sendData(true) }}>
                  {settingsModal.okkayButton}
                </Button>
              )}
              {settingsModal.closeButton && (
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  {settingsModal.closeButton}
                </Button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ModalComponent;
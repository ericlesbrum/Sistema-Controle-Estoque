import { Modal, Button } from 'react-bootstrap';
import { FaCheck, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

interface ConfirmDialogProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmVariant?: 'danger' | 'primary' | 'warning';
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDialog = ({
  show,
  onHide,
  onConfirm,
  title,
  message,
  confirmVariant = 'danger',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: ConfirmDialogProps) => {
  const getIcon = () => {
    switch (confirmVariant) {
      case 'danger':
        return <FaExclamationTriangle className="text-danger me-2" size={24} />;
      case 'warning':
        return <FaExclamationTriangle className="text-warning me-2" size={24} />;
      case 'primary':
        return <FaCheck className="text-primary me-2" size={24} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      className="confirm-dialog"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="d-flex align-items-center w-100">
          {getIcon()}
          <span className="fw-bold">{title}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-2 pb-4">
        <p className="mb-0 text-muted">{message}</p>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="outline-secondary" onClick={onHide} className="px-4">
          <FaTimes className="me-2" /> {cancelText}
        </Button>
        <Button variant={confirmVariant} onClick={onConfirm} className="px-4">
          <FaCheck className="me-2" /> {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDialog;
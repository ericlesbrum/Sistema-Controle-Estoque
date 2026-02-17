import { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { FaCheck, FaTimes, FaExclamationTriangle, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import '../../styles/ConfirmDialog.css';

interface ConfirmDialogProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => Promise<void> | void;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      await onConfirm();
      onHide();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Erro ao executar operação');
    } finally {
      setLoading(false);
    }
  };

  const getIcon = () => {
    switch (confirmVariant) {
      case 'danger': return <FaExclamationTriangle className="text-danger me-2" size={24} />;
      case 'warning': return <FaExclamationTriangle className="text-warning me-2" size={24} />;
      case 'primary': return <FaCheck className="text-primary me-2" size={24} />;
      default: return null;
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="d-flex align-items-center w-100">
          {getIcon()}
          <span className="fw-bold">{title}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-2 pb-4">
        <p className="mb-0 text-muted">{message}</p>
        {error && (
          <Alert variant="danger" className="mt-3 mb-0 d-flex align-items-center">
            <FaExclamationCircle className="me-2" />
            {error}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="outline-secondary" onClick={onHide} className="px-4" disabled={loading}>
          <FaTimes className="me-2" /> {cancelText}
        </Button>
        <Button variant={confirmVariant} onClick={handleConfirm} className="px-4" disabled={loading}>
          {loading ? <FaSpinner className="me-2 spin" /> : <FaCheck className="me-2" />}
          {loading ? 'Processando...' : confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDialog;
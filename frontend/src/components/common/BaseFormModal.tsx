import React from 'react';
import { Modal, Form, Alert } from 'react-bootstrap';
import { FaTimes, FaSave, FaExclamationCircle } from 'react-icons/fa';
import IconButton from '../common/IconButton';

interface BaseFormModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isSubmitting?: boolean;
  error?: string | null;
  children: React.ReactNode;
}

const BaseFormModal: React.FC<BaseFormModalProps> = ({
  show,
  onHide,
  title,
  onSubmit,
  isSubmitting = false,
  error,
  children,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-2">
        <Form onSubmit={onSubmit}>
          {error && (
            <Alert variant="danger" className="d-flex align-items-center mb-4">
              <FaExclamationCircle className="me-2" />
              {error}
            </Alert>
          )}
          {children}
          <Modal.Footer className="border-0 px-0 pb-0">
            <IconButton icon={FaTimes} className="btn-create-outline" onClick={onHide}>
              Cancelar
            </IconButton>
            <IconButton icon={FaSave} className="btn-create" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </IconButton>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BaseFormModal;
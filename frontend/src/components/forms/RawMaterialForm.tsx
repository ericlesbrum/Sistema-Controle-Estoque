import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Modal, Form } from 'react-bootstrap';
import { FaSave, FaTimes, FaExclamationCircle } from 'react-icons/fa';
import { CreateRawMaterialDTO } from '../../dtos/rawMaterial.dto';
import IconButton from '../common/IconButton'; // ajuste o caminho conforme necessário

interface RawMaterialFormProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: CreateRawMaterialDTO) => Promise<void>;
  initialData?: CreateRawMaterialDTO;
  title: string;
}

const RawMaterialForm: React.FC<RawMaterialFormProps> = ({
  show,
  onHide,
  onSubmit,
  initialData = { name: '', stockQuantity: 0 },
  title,
}) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateRawMaterialDTO>({
    defaultValues: initialData,
  });

  const handleFormSubmit: SubmitHandler<CreateRawMaterialDTO> = async (data) => {
    await onSubmit(data);
    reset();
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="raw-material-modal"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-2">
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Nome da Matéria-Prima</Form.Label>
            <Form.Control
              type="text"
              {...register('name', { required: 'Nome da matéria-prima é obrigatório' })}
              isInvalid={!!errors.name}
              className="rounded-3 shadow-sm"
              placeholder="Entre o nome da matéria-prima"
            />
            <Form.Control.Feedback type="invalid" className="d-flex align-items-center gap-1">
              <FaExclamationCircle size={14} />
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Quantidade em Estoque</Form.Label>
            <Form.Control
              type="number"
              {...register('stockQuantity', {
                required: 'Quantidade é obrigatória',
                min: { value: 0, message: 'Quantidade deve ser pelo menos 0' }
              })}
              isInvalid={!!errors.stockQuantity}
              className="rounded-3 shadow-sm"
              placeholder="0"
            />
            <Form.Control.Feedback type="invalid" className="d-flex align-items-center gap-1">
              <FaExclamationCircle size={14} />
              {errors.stockQuantity?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Modal.Footer className="border-0 px-0 pb-0">
            <IconButton
              icon={FaTimes}
              variant="outline-secondary"
              onClick={onHide}
            >
              Cancel
            </IconButton>
            <IconButton
              icon={FaSave}
              variant="primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </IconButton>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RawMaterialForm;
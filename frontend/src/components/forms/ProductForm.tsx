import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Modal, Form } from 'react-bootstrap';
import { FaTimes, FaSave, FaExclamationCircle } from 'react-icons/fa';
import { CreateProductDTO } from '../../dtos/product.dto';
import IconButton from '../common/IconButton';

interface ProductFormProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: CreateProductDTO) => Promise<void>;
  initialData?: CreateProductDTO;
  title: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  show,
  onHide,
  onSubmit,
  initialData = { name: '', price: 0 },
  title,
}) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateProductDTO>({
    defaultValues: initialData,
  });

  const handleFormSubmit: SubmitHandler<CreateProductDTO> = async (data) => {
    await onSubmit(data);
    reset();
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="product-modal"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-2">
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Nome do Produto</Form.Label>
            <Form.Control
              type="text"
              {...register('name', { required: 'Nome do produto é obrigatório' })}
              isInvalid={!!errors.name}
              className="rounded-3 shadow-sm"
              placeholder="Enter product name"
            />
            <Form.Control.Feedback type="invalid" className="d-flex align-items-center gap-1">
              <FaExclamationCircle size={14} />
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Preço (R$)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              {...register('price', {
                required: 'Preço é obrigatório',
                min: { value: 0.01, message: 'Preço deve ser maior que 0' }
              })}
              isInvalid={!!errors.price}
              className="rounded-3 shadow-sm"
              placeholder="0.00"
            />
            <Form.Control.Feedback type="invalid" className="d-flex align-items-center gap-1">
              <FaExclamationCircle size={14} />
              {errors.price?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Modal.Footer className="border-0 px-0 pb-0">
            <IconButton
              icon={FaTimes}
              className='btn-create-outline'
              onClick={onHide}
            >
              Cancelar
            </IconButton>
            <IconButton
              icon={FaSave}
              className='btn-create'
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

export default ProductForm;
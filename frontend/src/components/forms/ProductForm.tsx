import React from 'react';
import { Form } from 'react-bootstrap';
import { FaExclamationCircle } from 'react-icons/fa';
import { CreateProductDTO } from '../../dtos/product.dto';
import BaseFormModal from '../common/BaseFormModal';
import { useFormModal } from '../../hooks/useFormModal';

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
  const { register, handleSubmit, errors, isSubmitting, submitError } = useFormModal<CreateProductDTO>({
    defaultValues: initialData,
    onSubmit,
    onSuccess: onHide,
  });

  return (
    <BaseFormModal
      show={show}
      onHide={onHide}
      title={title}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={submitError}
    >
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold">
          Nome do Produto <span className="text-danger">*</span>
        </Form.Label>
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
        <Form.Label className="fw-semibold">
          Preço (R$) <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          {...register('price', {
            required: 'Preço é obrigatório',
            min: { value: 0.01, message: 'Preço deve ser maior que 0' },
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
    </BaseFormModal>
  );
};

export default ProductForm;
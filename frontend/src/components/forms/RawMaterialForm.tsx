import React from 'react';
import { Form } from 'react-bootstrap';
import { FaExclamationCircle } from 'react-icons/fa';
import { CreateRawMaterialDTO } from '../../dtos/rawMaterial.dto';
import BaseFormModal from '../common/BaseFormModal';
import { useFormModal } from '../../hooks/useFormModal';

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
  const { register, handleSubmit, errors, isSubmitting, submitError } = useFormModal<CreateRawMaterialDTO>({
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
          Nome da Matéria-Prima <span className="text-danger">*</span>
        </Form.Label>
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
        <Form.Label className="fw-semibold">
          Quantidade em Estoque <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="number"
          {...register('stockQuantity', {
            required: 'Quantidade é obrigatória',
            min: { value: 0, message: 'Quantidade deve ser pelo menos 0' },
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
    </BaseFormModal>
  );
};

export default RawMaterialForm;
import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { FaExclamationCircle } from 'react-icons/fa';
import { CreateAssociationDTO } from '../../dtos/productRawMaterial.dto';
import { RawMaterial } from '../../dtos/rawMaterial.dto';
import BaseFormModal from '../common/BaseFormModal';
import { useFormModal } from '../../hooks/useFormModal';

interface AssociationFormProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: CreateAssociationDTO) => Promise<void>;
  rawMaterials: RawMaterial[];
  initialData?: CreateAssociationDTO;
  title: string;
  productId: number;
}

const AssociationForm: React.FC<AssociationFormProps> = ({
  show,
  onHide,
  onSubmit,
  rawMaterials,
  initialData,
  title,
  productId,
}) => {
  const defaultValues = initialData || { productId, rawMaterialId: 0, quantity: 1 };
  const { register, handleSubmit, errors, isSubmitting, submitError, setValue } = useFormModal<CreateAssociationDTO>({
    defaultValues,
    onSubmit,
    onSuccess: onHide,
  });

  useEffect(() => {
    if (initialData) {
      setValue('productId', initialData.productId);
      setValue('rawMaterialId', initialData.rawMaterialId);
      setValue('quantity', initialData.quantity);
    } else {
      setValue('productId', productId);
      setValue('rawMaterialId', 0);
      setValue('quantity', 1);
    }
  }, [initialData, productId, setValue]);

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
        <Form.Select
          {...register('rawMaterialId', { required: 'Matéria-prima é obrigatória', valueAsNumber: true })}
          isInvalid={!!errors.rawMaterialId}
          className="rounded-3 shadow-sm"
        >
          <option value={0}>Selecione a matéria-prima...</option>
          {rawMaterials.map((rm) => (
            <option key={rm.id} value={rm.id}>
              {rm.name} (in stock: {rm.stockQuantity})
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid" className="d-flex align-items-center gap-1">
          <FaExclamationCircle size={14} />
          {errors.rawMaterialId?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold">
          Quantidade <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="number"
          {...register('quantity', {
            required: 'Quantidade é obrigatória',
            min: { value: 1, message: 'Quantidade deve ser pelo menos 1' },
          })}
          isInvalid={!!errors.quantity}
          className="rounded-3 shadow-sm"
        />
        <Form.Control.Feedback type="invalid" className="d-flex align-items-center gap-1">
          <FaExclamationCircle size={14} />
          {errors.quantity?.message}
        </Form.Control.Feedback>
      </Form.Group>
    </BaseFormModal>
  );
};

export default AssociationForm;
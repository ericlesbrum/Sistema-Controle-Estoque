import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Modal, Form } from 'react-bootstrap';
import { FaTimes, FaSave, FaExclamationCircle } from 'react-icons/fa';
import { CreateAssociationDTO } from '../../dtos/productRawMaterial.dto';
import { RawMaterial } from '../../dtos/rawMaterial.dto';
import IconButton from '../common/IconButton';

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
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm<CreateAssociationDTO>({
    defaultValues: initialData || { productId, rawMaterialId: 0, quantity: 1 },
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

  const handleFormSubmit: SubmitHandler<CreateAssociationDTO> = async (data) => {
    await onSubmit(data);
    reset();
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="association-modal"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-2">
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Nome da Matéria-Prima</Form.Label>
            <Form.Select
              {...register('rawMaterialId', { required: 'Matéria-prima é obrigatória', valueAsNumber: true })}
              isInvalid={!!errors.rawMaterialId}
              className="rounded-3 shadow-sm"
            >
              <option value={0}>Selecione a matéria-prima...</option>
              {rawMaterials.map(rm => (
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
            <Form.Label className="fw-semibold">Quantidade</Form.Label>
            <Form.Control
              type="number"
              {...register('quantity', {
                required: 'Quantidade é obrigatória',
                min: { value: 1, message: 'Quantidade deve ser pelo menos 1' }
              })}
              isInvalid={!!errors.quantity}
              className="rounded-3 shadow-sm"
            />
            <Form.Control.Feedback type="invalid" className="d-flex align-items-center gap-1">
              <FaExclamationCircle size={14} />
              {errors.quantity?.message}
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
              type="submit"
              className='btn-create'
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

export default AssociationForm;
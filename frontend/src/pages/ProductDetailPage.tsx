import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Card } from 'react-bootstrap';
import { useAssociations } from '../hooks/useAssociations';
import { useRawMaterials } from '../hooks/useRawMaterials';
import { useProducts } from '../hooks/useProducts';
import AssociationForm from '../components/forms/AssociationForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { CreateAssociationDTO } from '../dtos/productRawMaterial.dto';
import { FaArrowLeft, FaEdit, FaPlus, FaTrash, FaBoxOpen } from 'react-icons/fa';
import IconButton from '../components/common/IconButton';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const navigate = useNavigate();

  const { products } = useProducts();
  const product = products.find((p) => p.id === productId);
  const {
    associations,
    loading,
    error,
    fetchAssociations,
    createAssociation,
    updateAssociation,
    deleteAssociation,
    clearError,
  } = useAssociations(productId);
  const { materials: rawMaterials } = useRawMaterials();

  const [showModal, setShowModal] = useState(false);
  const [editingAssociation, setEditingAssociation] = useState<CreateAssociationDTO | undefined>();
  const [editingId, setEditingId] = useState<number | undefined>();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [associationToDelete, setAssociationToDelete] = useState<number | null>(null);

  const handleOpenCreate = () => {
    setEditingAssociation(undefined);
    setEditingId(undefined);
    setShowModal(true);
  };

  const handleOpenEdit = (assoc: any) => {
    setEditingAssociation({
      productId: assoc.productId,
      rawMaterialId: assoc.rawMaterialId,
      quantity: assoc.quantity,
    });
    setEditingId(assoc.id);
    setShowModal(true);
  };

  const handleSave = async (data: CreateAssociationDTO) => {
    if (editingId) {
      await updateAssociation(editingId, data);
    } else {
      await createAssociation(data);
    }
  };

  const handleDeleteClick = (id: number) => {
    setAssociationToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (associationToDelete) {
      await deleteAssociation(associationToDelete);
      setShowDeleteDialog(false);
      setAssociationToDelete(null);
    }
  };

  if (loading && associations.length === 0) return <LoadingSpinner />;

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center mb-4">
        <IconButton icon={FaArrowLeft} variant="outline-secondary" onClick={() => navigate('/products')}>
          Voltar
        </IconButton>
        <h2 className="ms-3 mb-0 fw-bold">
          <FaBoxOpen className="me-2 text-primary" />
          {product?.name || 'Produto'} - Matérias-Prima
        </h2>
      </div>

      {error && (
        <ErrorAlert
          message={error}
          dismissible
          onClose={clearError}
          onRetry={fetchAssociations}
        />
      )}

      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Lista de Matérias-Prima</span>
          <IconButton icon={FaPlus} className="btn-create" size="sm" onClick={handleOpenCreate}>
            Adicionar Novo
          </IconButton>
        </Card.Header>
        <Card.Body className="p-0">
          <Table striped hover responsive className="mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4">Matéria-Prima</th>
                <th>Quantidade</th>
                <th className="text-end pe-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {associations.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-5 text-muted">
                    Nenhuma matéria-prima associada ainda. Clique em "Adicionar" para começar.
                  </td>
                </tr>
              ) : (
                associations.map((a) => (
                  <tr key={a.id}>
                    <td className="ps-4 fw-medium">{a.rawMaterialName}</td>
                    <td>{a.quantity}</td>
                    <td className="text-end pe-4">
                      <IconButton
                        icon={FaEdit}
                        size="sm"
                        className="me-2 btn-edit-outline"
                        onClick={() => handleOpenEdit(a)}
                      >
                        Editar
                      </IconButton>
                      <IconButton
                        icon={FaTrash}
                        className="btn-remove"
                        size="sm"
                        onClick={() => handleDeleteClick(a.id)}
                      >
                        Remover
                      </IconButton>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <AssociationForm
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleSave}
        rawMaterials={rawMaterials}
        initialData={editingAssociation}
        title={editingId ? 'Editar Associação' : 'Adicionar Matéria-Prima'}
        productId={productId}
      />

      <ConfirmDialog
        show={showDeleteDialog}
        onHide={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Remoção"
        message="Remover esta matéria-prima do produto?"
      />
    </div>
  );
};

export default ProductDetailPage;
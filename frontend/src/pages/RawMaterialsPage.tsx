import { useState } from 'react';
import { Table, Card } from 'react-bootstrap';
import { useRawMaterials } from '../hooks/useRawMaterials';
import RawMaterialForm from '../components/forms/RawMaterialForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { CreateRawMaterialDTO } from '../dtos/rawMaterial.dto';
import { FaPlus, FaEdit, FaTrash, FaCube } from 'react-icons/fa';
import IconButton from '../components/common/IconButton';

const RawMaterialsPage = () => {
  const { materials, loading, error, createMaterial, updateMaterial, deleteMaterial } = useRawMaterials();
  const [showModal, setShowModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<CreateRawMaterialDTO | undefined>();
  const [editingId, setEditingId] = useState<number | undefined>();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState<number | null>(null);

  const handleOpenCreate = () => {
    setEditingMaterial(undefined);
    setEditingId(undefined);
    setShowModal(true);
  };

  const handleOpenEdit = (material: any) => {
    setEditingMaterial({ name: material.name, stockQuantity: material.stockQuantity });
    setEditingId(material.id);
    setShowModal(true);
  };

  const handleSave = async (data: CreateRawMaterialDTO) => {
    if (editingId) {
      await updateMaterial(editingId, { ...data, id: editingId });
    } else {
      await createMaterial(data);
    }
  };

  const handleDeleteClick = (id: number) => {
    setMaterialToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (materialToDelete) {
      await deleteMaterial(materialToDelete);
      setShowDeleteDialog(false);
      setMaterialToDelete(null);
    }
  };

  if (loading && materials.length === 0) return <LoadingSpinner />;

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center mb-4">
        <FaCube size={32} className="text-primary me-3" />
        <h2 className="fw-bold mb-0">Matérias-Prima</h2>
      </div>

      {error && <ErrorAlert message={error} />}

      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Lista de Matérias-Prima</span>
          <IconButton icon={FaPlus} className='btn-create' size="sm" onClick={handleOpenCreate}>
            Adicionar Novo
          </IconButton>
        </Card.Header>
        <Card.Body className="p-0">
          <Table striped hover responsive className="mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="ps-4">ID</th>
                <th>Nome</th>
                <th>Quantidade em Estoque</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {materials.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-5 text-muted">
                    Nenhuma matéria-prima cadastrada ainda. Clique em "Adicionar Novo" para criar uma.
                  </td>
                </tr>
              ) : (
                materials.map(m => (
                  <tr key={m.id}>
                    <td className="ps-4">{m.id}</td>
                    <td className="fw-medium">{m.name}</td>
                    <td>{m.stockQuantity}</td>
                    <td className="text-center">
                      <IconButton
                        icon={FaEdit}
                        size="sm"
                        className="me-2 btn-edit"
                        onClick={() => handleOpenEdit(m)}
                      >
                        Editar
                      </IconButton>
                      <IconButton
                        icon={FaTrash}
                        className='btn-remove'
                        size="sm"
                        onClick={() => handleDeleteClick(m.id)}
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

      <RawMaterialForm
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleSave}
        initialData={editingMaterial}
        title={editingId ? 'Editar Matéria-Prima' : 'Nova Matéria-Prima'}
      />

      <ConfirmDialog
        show={showDeleteDialog}
        onHide={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Remoção"
        message="Tem certeza que deseja remover esta matéria-prima?"
      />
    </div>
  );
};

export default RawMaterialsPage;
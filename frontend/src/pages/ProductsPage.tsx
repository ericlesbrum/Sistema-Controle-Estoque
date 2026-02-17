import { useState } from 'react';
import { Table, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductForm from '../components/forms/ProductForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { CreateProductDTO } from '../dtos/product.dto';
import { FaEdit, FaPlus, FaTrash, FaBoxes, FaPuzzlePiece } from 'react-icons/fa';
import IconButton from '../components/common/IconButton';

const ProductsPage = () => {
  const { products, loading, error, fetchProducts, createProduct, updateProduct, deleteProduct, clearError } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<CreateProductDTO | undefined>();
  const [editingId, setEditingId] = useState<number | undefined>();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const handleOpenCreate = () => {
    setEditingProduct(undefined);
    setEditingId(undefined);
    setShowModal(true);
  };

  const handleOpenEdit = (product: any) => {
    setEditingProduct({ name: product.name, price: product.price });
    setEditingId(product.id);
    setShowModal(true);
  };

  const handleSave = async (data: CreateProductDTO) => {
    if (editingId) {
      await updateProduct(editingId, { ...data, id: editingId });
    } else {
      await createProduct(data);
    }
  };

  const handleDeleteClick = (id: number) => {
    setProductToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete);
      setShowDeleteDialog(false);
      setProductToDelete(null);
    }
  };

  if (loading && products.length === 0) return <LoadingSpinner />;

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center mb-4">
        <FaBoxes size={32} className="text-primary me-3" />
        <h2 className="fw-bold mb-0">Produtos</h2>
      </div>

      {error && (
        <ErrorAlert
          message={error}
          dismissible
          onClose={clearError}
          onRetry={fetchProducts}
        />
      )}

      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Lista de Produtos</span>
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
                <th>Preço</th>
                <th className="text-center">Ações</th>
                <th className="text-center">Associações</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-5 text-muted">
                    Nenhum produto cadastrado ainda. Clique em "Adicionar Novo" para criar um.
                  </td>
                </tr>
              ) : (
                products.map(p => (
                  <tr key={p.id}>
                    <td className="ps-4">{p.id}</td>
                    <td className="fw-medium">{p.name}</td>
                    <td>R$ {p.price.toFixed(2)}</td>
                    <td className="text-center">
                      <IconButton
                        icon={FaEdit}
                        size="sm"
                        className="me-2 btn-edit-outline"
                        onClick={() => handleOpenEdit(p)}
                      >
                        Editar
                      </IconButton>
                      <IconButton
                        icon={FaTrash}
                        className='btn-remove'
                        size="sm"
                        onClick={() => handleDeleteClick(p.id)}
                      >
                        Remover
                      </IconButton>
                    </td>
                    <td className="text-center">
                      <Link to={`/products/${p.id}`}>
                        <IconButton icon={FaPuzzlePiece} className='btn-details-outline' size="sm">
                          Associar
                        </IconButton>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <ProductForm
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleSave}
        initialData={editingProduct}
        title={editingId ? 'Editar Produto' : 'Novo Produto'}
      />

      <ConfirmDialog
        show={showDeleteDialog}
        onHide={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Remoção"
        message="Tem certeza que deseja remover este produto?"
      />
    </div>
  );
};

export default ProductsPage;
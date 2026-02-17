import { useEffect } from 'react';
import { Table, Card, Row, Col, Alert } from 'react-bootstrap';
import { FaSyncAlt, FaMoneyBillWave, FaBoxOpen, FaInfoCircle } from 'react-icons/fa';
import { useProduction } from '../hooks/useProduction';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';
import IconButton from '../components/common/IconButton';
import '../styles/ProductionPage.css';

const ProductionPage = () => {
  const { production, loading, error, calculateProduction, clearError } = useProduction();

  useEffect(() => {
    calculateProduction();
  }, [calculateProduction]);

  if (loading && !production) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} dismissible onClose={clearError} onRetry={calculateProduction} />;
  if (!production) return null;

  const hasProduction = Object.keys(production.productionPlan).length > 0;
  const totalProducts = hasProduction
    ? Object.values(production.productionPlan).reduce((sum, qty) => sum + qty, 0)
    : 0;

  return (
    <div className="production-page">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            <FaBoxOpen className="me-2 text-primary" />
            Plano de Produção Sugerido
          </h2>
          <p className="text-muted mb-0">
            Com base no estoque atual, esta é a combinação de produtos que maximiza o valor total.
          </p>
        </div>
        <IconButton icon={FaSyncAlt} className="btn-refresh mt-2 mt-sm-0" onClick={calculateProduction}>
          Atualizar
        </IconButton>
      </div>

      <Row className="g-4 mb-4">
        <Col md={6} lg={4}>
          <Card className="border-0 shadow-sm h-100 bg-success text-white">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3">
                <FaMoneyBillWave size={32} className="text-white" />
              </div>
              <div>
                <h6 className="text-white fw-bold mb-1">Valor Total</h6>
                <h3 className="mb-0 fw-bold text-white">
                  R$ {production.totalValue.toFixed(2)}
                </h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="border-0 shadow-sm h-100 bg-primary text-white">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3">
                <FaBoxOpen size={32} className="text-white" />
              </div>
              <div>
                <h6 className="text-white fw-bold mb-1">Total de Produtos</h6>
                <h3 className="mb-0 fw-bold text-white">{totalProducts}</h3>
                <small className="text-white fw-bold">
                  {hasProduction ? 'Unidades a fabricar' : 'Nenhum produto'}
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="border-0 shadow-sm h-100 bg-purple text-white">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3">
                <FaInfoCircle size={32} className="text-white" />
              </div>
              <div>
                <h6 className="text-white fw-bold mb-1">Produtos Diferentes</h6>
                <h3 className="mb-0 fw-bold text-white">
                  {hasProduction ? Object.keys(production.productionPlan).length : 0}
                </h3>
                <small className="text-white fw-bold">Tipos distintos</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white py-3 border-bottom">
          <span className="fw-semibold fs-5">📋 Produtos a serem fabricados</span>
        </Card.Header>
        <Card.Body className="p-0">
          {hasProduction ? (
            <div className="table-responsive">
              <Table hover className="mb-0 align-middle">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-4 py-3">Produto</th>
                    <th className="text-end pe-4 py-3">Quantidade a Produzir</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(production.productionPlan).map(([product, quantity]) => (
                    <tr key={product}>
                      <td className="ps-4 fw-medium py-3">{product}</td>
                      <td className="text-end pe-4 py-3">
                        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold">
                          {quantity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <Alert variant="info" className="m-4 d-flex align-items-center">
              <FaInfoCircle size={20} className="me-2" />
              <span>Nenhum produto pode ser produzido com o estoque atual.</span>
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductionPage;
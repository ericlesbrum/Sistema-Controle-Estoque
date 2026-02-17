import { useEffect } from 'react';
import { Table, Card, Row, Col, Alert } from 'react-bootstrap';
import { FaSyncAlt, FaMoneyBillWave, FaBoxOpen } from 'react-icons/fa';
import { useProduction } from '../hooks/useProduction';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';
import IconButton from '../components/common/IconButton';

const ProductionPage = () => {
  const { production, loading, error, calculateProduction, clearError } = useProduction();

  useEffect(() => {
    calculateProduction();
  }, [calculateProduction]);

  if (loading && !production) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} dismissible onClose={clearError} onRetry={calculateProduction} />;
  if (!production) return null;

  const hasProduction = Object.keys(production.productionPlan).length > 0;

  return (
    <div className="d-flex flex-column h-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">
          <FaBoxOpen className="me-2 text-primary" />
          Plano de Produção Sugerido
        </h2>
        <IconButton icon={FaSyncAlt} className="btn-refresh" onClick={calculateProduction}>
          Atualizar
        </IconButton>
      </div>

      <Row className="mb-4">
        <Col md={6} lg={4}>
          <Card className="bg-success text-white shadow-lg border-0 rounded-4">
            <Card.Body className="d-flex align-items-center p-4">
              <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3">
                <FaMoneyBillWave size={32} />
              </div>
              <div>
                <h6 className="text-white-50 mb-1">Valor Total</h6>
                <h2 className="mb-0 fw-bold">R$ {production.totalValue.toFixed(2)}</h2>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm border-0 flex-grow-1 d-flex flex-column">
        <Card.Header className="bg-white py-3">
          <span className="fw-semibold">Produtos a serem fabricados</span>
        </Card.Header>
        <Card.Body className="p-0 flex-grow-1 d-flex flex-column">
          {hasProduction ? (
            <div className="overflow-auto">
              <Table striped hover responsive className="mb-0 align-middle">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-4">Produto</th>
                    <th className="text-end pe-4">Quantidade a Produzir</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(production.productionPlan).map(([product, quantity]) => (
                    <tr key={product}>
                      <td className="ps-4 fw-medium">{product}</td>
                      <td className="text-end pe-4">{quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <Alert variant="info" className="m-3">
              Nenhum produto pode ser produzido com o estoque atual.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductionPage;
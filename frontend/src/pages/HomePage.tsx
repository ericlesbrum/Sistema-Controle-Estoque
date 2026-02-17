import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCube, FaBoxes, FaChartLine, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center text-center mb-5">
        <Col md={8} lg={7}>
          <h1 className="display-4 fw-bold mb-3 text-dark">
            Controle de Estoque para Empresas
          </h1>
          <p className="lead text-secondary">
            Gerencie matérias-primas, produtos e planeje sua produção de forma inteligente.
            Priorizamos produtos de maior valor para maximizar seus resultados.
          </p>
        </Col>
      </Row>

      <Row className="g-4 bg-dark p-4 rounded-4 shadow-lg bg-opacity-25">
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm hover-card">
            <Card.Body className="text-center p-4">
              <div className="feature-icon bg-primary bg-gradient text-white rounded-circle d-inline-flex p-3 mb-3">
                <FaCube size={32} />
              </div>
              <Card.Title className="fw-bold mb-3 fs-4">Matérias-Prima</Card.Title>
              <Card.Text className="text-muted mb-4">
                Cadastre e controle o estoque de todas as matérias-prima necessárias para sua produção.
              </Card.Text>
              <Link to="/raw-materials" className="btn btn-outline-primary rounded-pill px-4">
                Gerenciar
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm hover-card">
            <Card.Body className="text-center p-4">
              <div className="feature-icon bg-success bg-gradient text-white rounded-circle d-inline-flex p-3 mb-3">
                <FaBoxes size={32} />
              </div>
              <Card.Title className="fw-bold mb-3 fs-4">Produtos</Card.Title>
              <Card.Text className="text-muted mb-4">
                Defina seus produtos, preços e as matérias-prima que compõem cada um deles.
              </Card.Text>
              <Link to="/products" className="btn btn-outline-success rounded-pill px-4">
                Gerenciar
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm hover-card">
            <Card.Body className="text-center p-4">
              <div className="feature-icon bg-warning bg-gradient text-white rounded-circle d-inline-flex p-3 mb-3">
                <FaChartLine size={32} />
              </div>
              <Card.Title className="fw-bold mb-3 fs-4">Plano de Produção</Card.Title>
              <Card.Text className="text-muted mb-4">
                Descubra quantos produtos podem ser fabricados com o estoque atual e o valor total obtido.
              </Card.Text>
              <Link to="/production" className="btn btn-outline-warning rounded-pill px-4">
                Visualizar
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5 justify-content-center">
        <Col md={10} lg={8}>
          <Card className="bg-dark text-white border-0 shadow-lg rounded-4 overflow-hidden shadow-lg">
            <Card.Body className="p-5">
              <h3 className="fw-bold mb-4 text-center">Como funciona?</h3>
              <Row className="g-4">
                <Col sm={4} className="text-center">
                  <div className="mb-3">
                    <span className="bg-white bg-opacity-10 rounded-circle d-inline-flex p-3">
                      <FaCheckCircle size={32} className="text-success" />
                    </span>
                  </div>
                  <h5 className="fw-bold">1. Cadastre Matérias-Prima</h5>
                  <p className="text-white-50 small">
                    Informe nome e quantidade em estoque.
                  </p>
                </Col>
                <Col sm={4} className="text-center">
                  <div className="mb-3">
                    <span className="bg-white bg-opacity-10 rounded-circle d-inline-flex p-3">
                      <FaCheckCircle size={32} className="text-success" />
                    </span>
                  </div>
                  <h5 className="fw-bold">2. Cadastre Produtos</h5>
                  <p className="text-white-50 small">
                    Defina nome, preço e as Matérias-Prima necessárias.
                  </p>
                </Col>
                <Col sm={4} className="text-center">
                  <div className="mb-3">
                    <span className="bg-white bg-opacity-10 rounded-circle d-inline-flex p-3">
                      <FaCheckCircle size={32} className="text-success" />
                    </span>
                  </div>
                  <h5 className="fw-bold">3. Veja o plano</h5>
                  <p className="text-white-50 small">
                    O sistema sugere quais produtos fabricar, priorizando os de maior valor, e calcula o retorno total.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
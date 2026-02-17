import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaBoxes, FaCube, FaChartLine } from 'react-icons/fa';
import styles from '../../styles/Navbar.module.css';

const CustomNavbar = () => {
  const location = useLocation();

  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.brand}>
          <FaBoxes className={styles.icon} /> Controle de Produção
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggler} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/raw-materials"
              className={`${styles.navLink} ${location.pathname === '/raw-materials' ? styles.active : ''
                }`}
            >
              <FaCube className={styles.icon} /> Matérias-Prima
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/products"
              className={`${styles.navLink} ${location.pathname === '/products' ? styles.active : ''
                }`}
            >
              <FaBoxes className={styles.icon} /> Produtos
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/production"
              className={`${styles.navLink} ${location.pathname === '/production' ? styles.active : ''
                }`}
            >
              <FaChartLine className={styles.icon} /> Produção
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import CustomNavbar from './components/layout/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RawMaterialsPage from './pages/RawMaterialsPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductionPage from './pages/ProductionPage';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <CustomNavbar />
        <Container className="flex-grow-1 py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/raw-materials" element={<RawMaterialsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/production" element={<ProductionPage />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
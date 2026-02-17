import { Spinner } from 'react-bootstrap';

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner = ({ text = 'Carregando...' }: LoadingSpinnerProps) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '200px' }}>
      <Spinner animation="border" variant="primary" role="status" />
      {text && <span className="mt-3 text-muted">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;
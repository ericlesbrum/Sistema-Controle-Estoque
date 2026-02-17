import { Alert } from 'react-bootstrap';
import { FaExclamationCircle } from 'react-icons/fa';

interface ErrorAlertProps {
  message: string;
  dismissible?: boolean;
  onClose?: () => void;
}

const ErrorAlert = ({ message, dismissible = false, onClose }: ErrorAlertProps) => {
  return (
    <Alert
      variant="danger"
      dismissible={dismissible}
      onClose={onClose}
      className="d-flex align-items-center shadow-sm border-0 rounded-3"
    >
      <FaExclamationCircle size={20} className="me-2 flex-shrink-0" />
      <span>{message}</span>
    </Alert>
  );
};

export default ErrorAlert;
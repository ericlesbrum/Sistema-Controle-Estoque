import { Alert, Button } from 'react-bootstrap';
import { FaExclamationCircle, FaRedoAlt } from 'react-icons/fa';

interface ErrorAlertProps {
  message: string;
  dismissible?: boolean;
  onClose?: () => void;
  onRetry?: () => void;
  retryText?: string;
}

const ErrorAlert = ({
  message,
  dismissible = false,
  onClose,
  onRetry,
  retryText = 'Tentar novamente'
}: ErrorAlertProps) => {
  return (
    <Alert
      variant="danger"
      dismissible={dismissible}
      onClose={onClose}
      className="d-flex align-items-center shadow-sm border-0 rounded-3"
    >
      <FaExclamationCircle size={20} className="me-2 flex-shrink-0" />
      <span className="flex-grow-1">{message}</span>
      {onRetry && (
        <Button
          variant="outline-danger"
          size="sm"
          onClick={onRetry}
          className="ms-3 d-flex align-items-center gap-1"
        >
          <FaRedoAlt size={12} />
          {retryText}
        </Button>
      )}
    </Alert>
  );
};

export default ErrorAlert;
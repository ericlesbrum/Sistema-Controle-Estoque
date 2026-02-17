import React from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { IconType } from 'react-icons';
// import '../../styles/IconButton.css';

interface IconButtonProps extends ButtonProps {
  icon: IconType;
  children: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  children,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const iconElement = <Icon className="icon-btn" />;

  return (
    <Button
      {...props}
      className={`icon-button d-inline-flex align-items-center justify-content-center gap-2 ${className}`}
    >
      {iconPosition === 'left' && iconElement}
      <span className="text-btn">{children}</span>
      {iconPosition === 'right' && iconElement}
    </Button>
  );
};

export default IconButton;
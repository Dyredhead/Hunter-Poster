import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import './BigButton.css';

type BigButtonProps = {
  children: ReactNode;
  to?: string;
  className?: string;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'className'>;

export default function BigButton({
  children,
  to,
  className = '',
  onClick,
  type = 'button',
  ...props
}: BigButtonProps) {
  const navigate = useNavigate();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);

    if (!event.defaultPrevented && to) {
      navigate(to);
    }
  }

  return (
    <button type={type} className={`app-bigbutton ${className}`} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

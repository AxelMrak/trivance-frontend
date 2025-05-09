import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  isLoading = false,
}) => {
  const baseStyles = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 shadow hover:shadow-sm transition-all cursor-pointer border border-transparent';

  const variants = {
    primary: 'bg-primary-base text-white hover:bg-transparent hover:text-primary-base hover:border-primary-base',
    secondary: 'bg-secondary-900 text-white hover:bg-transparent hover:text-secondary-900 hover:border-secondary-900',
    tertiary: 'bg-white text-primary-base border border-primary-600 hover:bg-primary-50 focus:ring-primary-500',
  };

  const disabledStyles = 'opacity-50 !cursor-not-allowed';
  const loadingStyles = 'opacity-50 !cursor-not-allowed';

  const variantStyles = variants[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${disabled ? disabledStyles : ''} ${className} ${isLoading ? loadingStyles : ''}`}
    >
      {
        children && !isLoading ? (
          children
        ) : (
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
            />
          </svg>
                  )
      }
    </button>
  );
};

export default Button;

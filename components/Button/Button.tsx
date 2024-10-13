import React from 'react';

interface ButtonProps {
  variant?: 'main' | 'categoryFilter' | 'danger';
  size?: 'small' | 'base' | 'large';
  children: React.ReactNode;
  additionalStyles?: string;
  onClick?: () => void;
}

export default function Button({
  variant = 'main',
  size = 'base',
  children,
  additionalStyles = '',
  onClick,
}: ButtonProps) {
  const baseStyles =
    'px-4 py-2 rounded-lg border-none cursor-pointer focus:outline-none focus:ring-none shadow-box-style ease transition-colors duration-200';

  const variantStyles = {
    main: 'bg-secondary-color hover:bg-tertiary-color',
    categoryFilter: 'bg-box-color hover:bg-gray-400',
    danger: 'bg-rose-700 text-white hover:bg-rose-600',
  };

  const sizeStyles = {
    small: 'text-sm',
    base: 'text-base',
    large: 'text-lg',
  };

  const className = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${additionalStyles}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

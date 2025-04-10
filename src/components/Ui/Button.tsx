import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  size = 'md',
  onClick,
  fullWidth = false,
  icon,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const sizeClasses = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  const baseStyle = `
    ${sizeClasses[size]} 
    rounded-lg 
    transition-all
    duration-200
    font-bold 
    flex 
    items-center 
    justify-center 
    gap-2
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
  `;

  const styles = {
    primary: `${baseStyle} bg-[#8B5CF6] text-white hover:bg-[#7A3FD6] shadow-md hover:shadow-lg`,
    secondary: `${baseStyle} bg-white text-[#8B5CF6] border-2 border-[#8B5CF6] hover:bg-[#F3E8FF] shadow-sm hover:shadow-md`,
    outline: `${baseStyle} bg-yellow-400 text-purple-900 border-2 border-yellow-500 hover:bg-yellow-300 shadow-lg`,
    danger: `${baseStyle} bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg`,
    success: `${baseStyle} bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg`,
  };

  return (
    <button
      type={type}
      className={`${styles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;
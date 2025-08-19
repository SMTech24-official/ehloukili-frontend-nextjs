import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`w-full py-2 px-4 rounded-md bg-[#8B5C2A] text-white font-semibold hover:bg-[#6d441c] transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;

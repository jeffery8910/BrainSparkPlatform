
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, title }) => {
  const cardClasses = `bg-white shadow-lg rounded-xl p-6 transition-all duration-300 ease-in-out ${onClick ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1' : ''} ${className}`;

  return (
    <div className={cardClasses} onClick={onClick}>
      {title && <h3 className="text-xl font-semibold text-slate-700 mb-3">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
  variants?: Variants;
}

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
};

export const Card: React.FC<CardProps> = ({ children, className, style, as: Component = motion.div, ...rest }) => {
  const MotionComponent = motion(Component as React.ElementType);

  return (
    <MotionComponent
      className={`relative w-full bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl shadow-gray-600/10 ${className}`}
      style={style}
      variants={cardVariants}
      {...rest}
    >
      <div className="relative z-10 p-6 sm:p-8">
        {children}
      </div>
    </MotionComponent>
  );
};
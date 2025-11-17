import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '../types';
import * as Icons from './icons';

interface LinkButtonProps {
  link: Link;
  showToast: (message: string) => void;
}

const getIcon = (name: string) => {
  const iconName = `${name}Icon` as keyof typeof Icons;
  const IconComponent = Icons[iconName];
  return IconComponent ? <IconComponent className="text-2xl" /> : <div className="w-6 h-6" />;
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const LinkButton: React.FC<LinkButtonProps> = ({ link, showToast }) => {
  const isEmail = link.url.startsWith('mailto:');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isEmail) {
      e.preventDefault();
      const email = link.url.replace('mailto:', '');
      navigator.clipboard.writeText(email);
      showToast('Email copied to clipboard!');
    }
  };
  
  return (
    <motion.a
      href={link.url}
      onClick={handleClick}
      target={!isEmail ? '_blank' : undefined}
      rel={!isEmail ? 'noopener noreferrer' : undefined}
      className="flex flex-col items-center justify-center text-center p-4 bg-white/30 hover:bg-white/50 backdrop-blur-lg rounded-2xl transition-all duration-200 group border border-white/20 hover:border-white/40 shadow-lg shadow-gray-500/5 icon-color-hover"
      variants={itemVariants}
      whileHover={{ scale: 1.03, y: -2, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95 }}
      style={{ '--brand-color': link.color } as React.CSSProperties}
    >
      <div className="flex-shrink-0 mb-2 grid place-content-center w-8 h-8">
        {getIcon(link.icon)}
      </div>
      <p className="font-semibold text-gray-800 text-sm leading-tight">{link.name}</p>
    </motion.a>
  );
};
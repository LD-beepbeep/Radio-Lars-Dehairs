import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Card, cardVariants } from '../components/Card';
import * as Icons from '../components/icons';

interface HeroSectionProps {
  info: {
    name: string;
    profession: string;
    location: string;
    email: string;
    avatar: string;
  };
  onContactClick: () => void;
}

const heroContentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 }
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
}


export const HeroSection: React.FC<HeroSectionProps> = ({ info, onContactClick }) => {
  return (
    <Card className="w-full text-center" variants={cardVariants}>
      <motion.div 
        className="flex flex-col items-center"
        variants={heroContentVariants}
      >
        <div className="relative">
            <motion.img
              src={info.avatar}
              alt={info.name}
              className="w-32 h-32 rounded-full object-cover ring-8 ring-white/30 shadow-xl shadow-gray-500/20"
            />
        </div>
        <motion.h1 variants={itemVariants} className="text-4xl font-bold text-gray-900 tracking-tight mt-5">{info.name}</motion.h1>
        <motion.p variants={itemVariants} className="text-md text-gray-600 mt-1">{info.profession}</motion.p>
        
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 w-full max-w-60 mx-auto mt-8">
           <motion.a variants={iconVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href="https://www.instagram.com/larsdehairs/profilecard/?igsh=MWQ1Nnlrd2Zua2p4eQ%3D%3D" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/30 hover:bg-white/50 rounded-2xl transition-colors duration-200 text-2xl icon-color-hover" style={{ '--brand-color': '#E4405F' } as React.CSSProperties}><Icons.InstagramIcon/></motion.a>
           <motion.a variants={iconVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href="https://soundcloud.com/lars-dehairs" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/30 hover:bg-white/50 rounded-2xl transition-colors duration-200 text-2xl icon-color-hover" style={{ '--brand-color': '#FF5500' } as React.CSSProperties}><Icons.SoundcloudIcon/></motion.a>
        </motion.div>

        <motion.button 
          onClick={onContactClick} 
          className="mt-8 bg-white/30 backdrop-blur-sm text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg shadow-gray-500/10 border border-white/30 flex items-center gap-2.5"
          variants={itemVariants}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Icons.EnvelopeIcon className="text-lg" />
          Contact Me
        </motion.button>
      </motion.div>
    </Card>
  );
};
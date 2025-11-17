import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Card } from '../components/Card';

interface AboutSectionProps {
  bio: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { 
    transition: { 
      staggerChildren: 0.1 
    } 
  },
};

const itemVariants: Variants = {
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

export const AboutSection: React.FC<AboutSectionProps> = ({ bio }) => {
  return (
    <Card>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-4">About Me</motion.h2>
        <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed whitespace-pre-line">{bio}</motion.p>
      </motion.div>
    </Card>
  );
};
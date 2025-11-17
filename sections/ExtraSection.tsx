import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Card } from '../components/Card';
import { Education, Language } from '../types';
import * as Icons from '../components/icons';

interface ExtraSectionProps {
  languages: Language[];
  education: Education[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: { 
    transition: { 
      staggerChildren: 0.15,
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

export const ExtraSection: React.FC<ExtraSectionProps> = ({ languages, education }) => {
  return (
    <Card>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Languages */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Languages</h2>
          <motion.div 
            className="space-y-3"
            variants={containerVariants}
          >
            {languages.map((lang, index) => (
              <motion.div key={index} variants={itemVariants} className="bg-gray-50/50 p-4 rounded-xl border border-gray-200/80 text-center">
                <p className="text-gray-700">
                  <span className="font-semibold">{lang.name}</span>
                  <span className="text-gray-600"> - {lang.level}</span>
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Education */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
          >
            {education.map((edu, index) => (
              <motion.div key={index} variants={itemVariants} className="flex items-start gap-4">
                <div className="grid place-items-center w-8 h-8 rounded-lg bg-blue-100/60 mt-0.5 flex-shrink-0">
                   <Icons.GraduationCapIcon className="text-lg text-[#0071e3]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{edu.institution}</h3>
                  <p className="text-gray-600">{edu.degree}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{edu.period}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </Card>
  );
};
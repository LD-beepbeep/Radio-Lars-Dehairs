import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/Card';
import { WorkExperience } from '../types';
import * as Icons from '../components/icons';

interface AccordionItemProps {
  item: WorkExperience;
  isExpanded: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isExpanded, onToggle }) => {
  return (
    <motion.div 
      className="bg-white/30 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-lg shadow-gray-500/5"
      layout
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.header
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={onToggle}
        initial={false}
      >
        <div className="flex items-center gap-4">
            <div className="grid place-items-center w-10 h-10 bg-white/50 backdrop-blur-sm rounded-lg ring-2 ring-white/50 flex-shrink-0">
               <Icons.BriefcaseIcon className="text-2xl text-[#0071e3]" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{item.role}</h3>
              <p className="font-semibold text-gray-700 text-sm">{item.company}</p>
            </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? -180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Icons.ChevronDownIcon className="text-xl text-gray-600" />
        </motion.div>
      </motion.header>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pl-16">
              <p className="text-sm font-medium text-gray-500 mb-3">{item.period}</p>
              <ul className="text-gray-600 space-y-2 text-sm list-none">
                {item.tasks.map((task, index) => (
                  <li key={index} className="flex items-start">
                    <Icons.DashIcon className="text-base text-blue-400 mr-3 mt-1 flex-shrink-0" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


export const WorkSection: React.FC<{ workExperience: WorkExperience[] }> = ({ workExperience }) => {
  const [expanded, setExpanded] = useState<number | false>(0); // First item open by default

  return (
    <Card>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Work Experience</h2>
      <div className="space-y-3">
        {workExperience.map((item, index) => (
          <AccordionItem
            key={index}
            item={item}
            isExpanded={index === expanded}
            onToggle={() => setExpanded(expanded === index ? false : index)}
          />
        ))}
      </div>
    </Card>
  );
};
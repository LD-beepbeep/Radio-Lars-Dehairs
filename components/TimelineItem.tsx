import React from 'react';
import { motion, Variants } from 'framer-motion';
import { WorkExperience } from '../types';
import * as Icons from './icons';

interface TimelineItemProps {
  item: WorkExperience;
  isLast: boolean;
}

const timelineItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, isLast }) => {
  return (
    <motion.div 
      className="relative pl-10"
      variants={timelineItemVariants}
    >
      {/* Connecting Line */}
      {!isLast && (
        <motion.div
          className="absolute left-4 top-10 w-0.5 h-full bg-blue-200/80 origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
        />
      )}

      {/* Icon */}
      <div className="absolute left-4 top-3 transform -translate-x-1/2">
        <div className="grid place-items-center w-8 h-8 bg-white/50 backdrop-blur-sm rounded-full ring-4 ring-white/80">
           <Icons.BriefcaseIcon className="w-5 h-5 text-[#0071e3]" />
        </div>
      </div>

      {/* Content */}
      <div className="pl-4 pb-8">
        <p className="text-sm font-medium text-gray-500">{item.period}</p>
        <h3 className="text-lg font-bold text-gray-900 mt-0.5">{item.role}</h3>
        <p className="font-semibold text-gray-700">{item.company}</p>
        <ul className="mt-3 text-gray-600 space-y-2 text-sm list-none">
          {item.tasks.map((task, index) => (
            <li key={index} className="flex items-start">
                <Icons.DashIcon className="w-4 h-4 text-gray-400 mr-3 mt-1 flex-shrink-0"/>
                <span>{task}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};
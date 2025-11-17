import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import * as Icons from '../components/icons';
import { Skill } from '../types';

interface SkillsSectionProps {
  skills: Skill[];
}

const getIcon = (name: string) => {
    const iconName = `${name}Icon` as keyof typeof Icons;
    const IconComponent = Icons[iconName];
    // A fallback for icons that might not exist
    return IconComponent 
        ? <IconComponent className="text-4xl" /> 
        : <div className="w-10 h-10 bg-gray-200/50 rounded-xl" />;
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkOverflow = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const { scrollWidth, clientWidth } = el;
      setIsOverflowing(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      checkOverflow();
      window.addEventListener('resize', checkOverflow);
      
      const resizeObserver = new ResizeObserver(checkOverflow);
      resizeObserver.observe(el);

      return () => {
        window.removeEventListener('resize', checkOverflow);
        resizeObserver.unobserve(el);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const scrollAmount = clientWidth * 0.8;
      
      if (direction === 'left') {
        if (scrollLeft < 1) {
          el.scrollTo({ left: scrollWidth, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      } else {
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Skills &amp; Tools</h2>
      <div className="flex items-center gap-1 sm:gap-2 -mx-4 sm:-mx-6">
        {/* Left Arrow */}
        <div className={`flex-shrink-0 ${isOverflowing ? 'sm:block hidden' : 'hidden'}`}>
            <motion.button
             onClick={() => scroll('left')}
             className="grid place-items-center w-10 h-10 bg-white/20 hover:bg-white/50 backdrop-blur-md border border-white/30 rounded-full text-gray-800 transition-all duration-200"
             aria-label="Scroll left"
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
            >
                <Icons.ChevronLeftIcon className="text-xl"/>
            </motion.button>
        </div>
        
        {/* Scrollable container */}
        <div 
          ref={scrollContainerRef}
          className="flex flex-1 space-x-4 overflow-x-auto py-4 scrollbar-hide snap-x snap-mandatory sm:snap-none min-w-0"
        >
          {skills.map((skill, index) => (
            <motion.a 
              key={index} 
              href={skill.url}
              target={skill.url === '#' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="flex flex-col items-center flex-shrink-0 w-28 text-center group snap-center icon-color-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={skill.name}
              style={{ '--brand-color': skill.color } as React.CSSProperties}
            >
              <div className="w-20 h-20 grid place-content-center p-2 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/20 group-hover:border-white/40 shadow-lg shadow-gray-500/5 transition-all">
                {getIcon(skill.icon)}
              </div>
              <span className="mt-2 text-xs font-semibold text-gray-700 tracking-wide break-words">{skill.name}</span>
            </motion.a>
          ))}
        </div>
        
        {/* Right Arrow */}
        <div className={`flex-shrink-0 ${isOverflowing ? 'sm:block hidden' : 'hidden'}`}>
            <motion.button
                onClick={() => scroll('right')}
                className="grid place-items-center w-10 h-10 bg-white/20 hover:bg-white/50 backdrop-blur-md border border-white/30 rounded-full text-gray-800 transition-all duration-200"
                aria-label="Scroll right"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Icons.ChevronRightIcon className="text-xl"/>
            </motion.button>
        </div>
      </div>
    </Card>
  );
};
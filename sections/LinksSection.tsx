import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Card } from '../components/Card';
import { LinkButton } from '../components/LinkButton';
import { Link, Project } from '../types';
import * as Icons from '../components/icons';

interface LinksSectionProps {
  personalLinks: Link[];
  projects: Project[];
  showToast: (message: string) => void;
}

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const modalVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
}

// --- Info Modal Component (Co-located) ---
interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, content }) => {
  const ModalComponent = () => createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-modal-title"
        className="fixed inset-0 z-50"
      >
        <motion.div
          className="w-full h-full bg-gray-50 overflow-y-auto"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
           <motion.div 
              className="max-w-lg mx-auto px-6 py-16 sm:py-24"
              variants={contentVariants}
          >
              <h2 id="info-modal-title" className="text-3xl font-bold text-gray-900">{title}</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">{content}</p>
           </motion.div>
        </motion.div>
        <motion.button
          onClick={onClose}
          aria-label="Close modal"
          className="fixed top-5 right-5 z-[51] p-2 rounded-full bg-black/5 hover:bg-black/10 text-gray-700 transition-colors"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <Icons.XIcon className="text-3xl" />
        </motion.button>
      </div>,
    document.body
  );
  
  return (
    <AnimatePresence>
      {isOpen && <ModalComponent />}
    </AnimatePresence>
  );
};

// --- Share Modal Component (Co-located) ---
interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  showToast: (message: string) => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, project, showToast }) => {
    
    const ModalComponent = () => {
        const [isCopied, setIsCopied] = useState(false);
        if (!project) return null;

        const shareUrl = project.links[0]?.url || window.location.href;
        const shareTitle = `Check out this project: ${project.name}`;
        
        const handleCopy = () => {
            navigator.clipboard.writeText(shareUrl);
            showToast('Link copied to clipboard!');
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2500);
        };

        const socialLinks = [
            { name: 'Twitter', icon: <Icons.TwitterXIcon className="text-xl" />, url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, color: '#1DA1F2' },
            { name: 'Facebook', icon: <Icons.FacebookIcon className="text-xl" />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, color: '#1877F2' },
            { name: 'LinkedIn', icon: <Icons.LinkedInIcon className="text-xl" />, url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`, color: '#0A66C2' },
            { name: 'Email', icon: <Icons.EnvelopeIcon className="text-xl" />, url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=Check out this link:%0A${encodeURIComponent(shareUrl)}`, color: '#7f8c8d' },
        ];
        
        return createPortal(
             <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="share-modal-title"
              className="fixed inset-0 z-50"
            >
              <motion.div
                className="w-full h-full bg-gray-50 overflow-y-auto"
                variants={modalVariants} initial="hidden" animate="visible" exit="exit"
              >
                 <motion.div 
                    className="max-w-md mx-auto px-6 py-16 sm:py-24"
                    variants={contentVariants}
                >
                    <h2 id="share-modal-title" className="text-3xl font-bold text-gray-900">Share "{project.name}"</h2>
                    <p className="mt-2 text-gray-600">Share this project with others.</p>
                    <div className="flex items-center bg-white p-2 rounded-xl mt-6 border border-gray-200/60">
                      <input type="text" readOnly value={shareUrl} className="text-sm text-gray-600 truncate bg-transparent flex-1 focus:outline-none ml-2" />
                      <motion.button
                        onClick={handleCopy}
                        className={`grid place-content-center w-8 h-8 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0071e3] flex-shrink-0 ${isCopied ? 'bg-[#0071e3] text-white cursor-default' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                        whileHover={{ scale: isCopied ? 1 : 1.1 }} whileTap={{ scale: isCopied ? 1 : 0.95 }} disabled={isCopied} aria-label={isCopied ? 'Link copied' : 'Copy link'}
                      >
                        <AnimatePresence mode="wait">
                          <motion.div key={isCopied ? 'check' : 'copy'} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}>
                            {isCopied ? <Icons.CheckIcon /> : <Icons.CopyIcon />}
                          </motion.div>
                        </AnimatePresence>
                      </motion.button>
                    </div>
                    <motion.div 
                      className="grid grid-cols-4 gap-3 mt-4"
                      variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
                      initial="hidden"
                      animate="visible"
                    >
                      {socialLinks.map(link => (
                        <motion.a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                          className="flex flex-col items-center justify-center text-center p-3 bg-gray-100 hover:bg-gray-200/80 rounded-2xl transition-all duration-200 group border border-gray-200/60 icon-color-hover"
                          whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                          style={{ '--brand-color': link.color } as React.CSSProperties} title={`Share on ${link.name}`}
                        >
                          {link.icon}
                          <span className="text-xs font-semibold text-gray-700 mt-1.5">{link.name}</span>
                        </motion.a>
                      ))}
                    </motion.div>
                 </motion.div>
              </motion.div>
               <motion.button
                onClick={onClose}
                aria-label="Close modal"
                className="fixed top-5 right-5 z-[51] p-2 rounded-full bg-black/5 hover:bg-black/10 text-gray-700 transition-colors"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <Icons.XIcon className="text-3xl" />
              </motion.button>
            </div>,
            document.body
        );
    }
    
    return (
        <AnimatePresence>
            {isOpen && <ModalComponent />}
        </AnimatePresence>
    )
}

export const LinksSection: React.FC<LinksSectionProps> = ({ personalLinks, projects, showToast }) => {
  const [modalData, setModalData] = useState<{ title: string; content: string; } | null>(null);
  const [shareProject, setShareProject] = useState<Project | null>(null);

  return (
    <Card>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Personal Links</h2>
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {personalLinks.map((link, index) => (
            <LinkButton key={index} link={link} showToast={showToast} />
          ))}
        </motion.div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Links</h2>
        <div className="space-y-6">
          {projects.map((project, projIndex) => (
            <div key={projIndex}>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-bold text-lg text-gray-800">{project.name}</h3>
                {project.description && (
                  <motion.button 
                    onClick={() => setModalData({ title: project.name, content: project.description! })} 
                    className="text-gray-500 hover:text-[#0071e3] transition-colors"
                    aria-label={`More info about ${project.name}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icons.InfoIcon className="text-xl" />
                  </motion.button>
                )}
                <motion.button 
                  onClick={() => setShareProject(project)} 
                  className="text-gray-500 hover:text-[#0071e3] transition-colors"
                  aria-label={`Share ${project.name}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icons.ShareIcon className="text-lg" />
                </motion.button>
              </div>
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                variants={gridContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {project.links.map((link, linkIndex) => (
                  <LinkButton key={linkIndex} link={link} showToast={showToast} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
       <InfoModal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        title={modalData?.title || ''}
        content={modalData?.content || ''}
      />
       <ShareModal
        isOpen={!!shareProject}
        onClose={() => setShareProject(null)}
        project={shareProject}
        showToast={showToast}
      />
    </Card>
  );
};
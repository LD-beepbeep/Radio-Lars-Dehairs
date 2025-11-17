import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import * as Icons from './icons';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (message: string) => void;
  emails: {
    radio: string;
    other: string;
  };
}

interface ContactOptionProps {
  title: string;
  email: string;
  icon: React.ReactNode;
  onCopy: () => void;
  isCopied: boolean;
}

const ContactOption: React.FC<ContactOptionProps> = ({ title, email, icon, onCopy, isCopied }) => (
  <div className="bg-gray-100 hover:bg-gray-200/80 transition-colors border border-gray-200/60 p-4 rounded-2xl space-y-3">
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 grid place-content-center w-10 h-10 rounded-lg bg-white">
          {icon}
      </div>
      <p className="font-bold text-gray-900">{title}</p>
    </div>
    <div className="flex items-center bg-white p-2 rounded-xl">
      <p className="text-sm text-gray-600 truncate flex-1 ml-2">{email}</p>
      <div className="flex items-center gap-1 flex-shrink-0">
          <motion.button
            onClick={onCopy}
            className={`grid place-content-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0071e3] ${isCopied ? 'bg-[#0071e3] text-white cursor-default' : 'hover:bg-gray-200 text-gray-600'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={isCopied}
            aria-label={isCopied ? 'Email copied' : 'Copy email'}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isCopied ? 'check' : 'copy'}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {isCopied ? <Icons.CheckIcon /> : <Icons.CopyIcon />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
          <motion.a
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="grid place-content-center w-8 h-8 rounded-full hover:bg-gray-200 text-gray-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0071e3]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open in mail client"
          >
            <Icons.ExternalLinkIcon />
          </motion.a>
      </div>
    </div>
  </div>
);

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

const ModalContent: React.FC<Omit<ContactModalProps, 'isOpen'>> = ({ onClose, showToast, emails }) => {
  const [copied, setCopied] = useState<'radio' | 'other' | null>(null);

  const handleCopy = (email: string, type: 'radio' | 'other') => {
    navigator.clipboard.writeText(email);
    showToast(`${type === 'radio' ? 'Radio' : 'Personal'} email copied!`);
    setCopied(type);
    setTimeout(() => {
      setCopied(null);
    }, 2500);
  };
    
  return createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="fixed inset-0 z-50"
      >
        {/* Modal Panel */}
        <motion.div
          className="w-full h-full bg-gray-50 overflow-y-auto"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="max-w-md mx-auto px-6 py-16 sm:py-24"
            variants={contentVariants}
          >
              <div>
                  <h2 id="contact-modal-title" className="text-3xl font-bold text-gray-900">Contact Me</h2>
                  <p className="mt-2 text-gray-600">Select an email to copy it or open your mail client.</p>
              </div>
              
              <div className="mt-8 space-y-4">
                  <ContactOption 
                  title="Radio Inquiries"
                  email={emails.radio}
                  icon={<Icons.PodcastIcon className="text-2xl text-[#0071e3]" />}
                  onCopy={() => handleCopy(emails.radio, 'radio')}
                  isCopied={copied === 'radio'}
                  />
                  <ContactOption 
                  title="Other Inquiries"
                  email={emails.other}
                  icon={<Icons.EnvelopeIcon className="text-2xl text-[#0071e3]" />}
                  onCopy={() => handleCopy(emails.other, 'other')}
                  isCopied={copied === 'other'}
                  />
              </div>
          </motion.div>
        </motion.div>

        {/* Close Button */}
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
};


export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, ...props }) => {
  return (
    <AnimatePresence>
      {isOpen && <ModalContent {...props} />}
    </AnimatePresence>
  );
};
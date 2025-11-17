
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, bio, personalLinks, projects, workExperience, skills, languages, education, nowPlayingPlaylist } from './constants';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { LinksSection } from './sections/LinksSection';
import { WorkSection } from './sections/WorkSection';
import { SkillsSection } from './sections/SkillsSection';
import { ExtraSection } from './sections/ExtraSection';
import { ContactModal } from './components/ContactModal';
import { MusicSection } from './sections/MusicSection';
import * as Icons from './components/icons';

// --- Toast Component ---
interface ToastProps {
  message: string;
}
const Toast: React.FC<ToastProps> = ({ message }) => {
  const visible = !!message;
  return (
    <div
      aria-live="assertive"
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-gray-900/80 backdrop-blur-sm text-white rounded-full shadow-lg transition-all duration-300 ease-out transform pointer-events-none flex items-center gap-2 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{ zIndex: 9999 }}
    >
      <Icons.CheckIcon className="text-xl"/>
      {message}
    </div>
  );
};


export const App: React.FC = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [isContactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const contactEmails = {
    radio: 'radio.larsdehairs@outlook.com',
    other: 'lars.dehairs@gmail.com'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen text-gray-800 antialiased">
      <main className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        <motion.div
          className="space-y-6 sm:space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <HeroSection info={personalInfo} onContactClick={() => setContactModalOpen(true)} />
          <AboutSection bio={bio} />
          <LinksSection personalLinks={personalLinks} projects={projects} showToast={showToast} />
          <MusicSection playlist={nowPlayingPlaylist} />
          <WorkSection workExperience={workExperience} />
          <SkillsSection skills={skills} />
          <ExtraSection languages={languages} education={education} />
        </motion.div>
      </main>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setContactModalOpen(false)}
        showToast={showToast}
        emails={contactEmails}
      />
      <Toast message={toastMessage} />
    </div>
  );
};

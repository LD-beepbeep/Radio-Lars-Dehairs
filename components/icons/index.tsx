import React from 'react';

interface IconProps {
  className?: string;
}

// --- UI Icons ---
export const LocationIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-location-dot ${className}`} />;
export const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-chevron-left ${className}`} />;
export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-chevron-right ${className}`} />;
export const CheckIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-check ${className}`} />;
export const DashIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-minus ${className}`} />;
export const BriefcaseIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-briefcase ${className}`} />;
export const PodcastIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-podcast ${className}`} />;
export const XIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-xmark ${className}`} />;
export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-chevron-down ${className}`} />;
export const CopyIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-regular fa-copy ${className}`} />;
export const ExternalLinkIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-arrow-up-right-from-square ${className}`} />;
export const InfoIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-circle-info ${className}`} />;
export const GraduationCapIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-graduation-cap ${className}`} />;
export const PlayIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-play ${className}`} />;
export const PauseIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-pause ${className}`} />;
export const QueueListIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-list-ul ${className}`} />;
export const ShareIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-arrow-up-from-bracket ${className}`} />;


// ------------------ SKILL / GENERIC ICONS ------------------
export const MicIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-microphone ${className}`} />;
export const CommentsIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-comments ${className}`} />;
export const ScissorsIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-scissors ${className}`} />;
export const BoltIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-bolt ${className}`} />;
export const SlidersIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-sliders ${className}`} />;
export const HeadphonesIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-headphones ${className}`} />;
export const FileAltIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-file-alt ${className}`} />;
export const WaveSquareIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-wave-square ${className}`} />;
export const BroadcastTowerIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-broadcast-tower ${className}`} />;
export const RadioIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-radio ${className}`} />;
export const FilmIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-film ${className}`} />;
export const PaletteIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-palette ${className}`} />;
export const MusicIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-music ${className}`} />;
export const WaveformIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-wave-square ${className}`} />;
export const WebsiteIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-globe ${className}`} />;
export const EnvelopeIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-regular fa-envelope ${className}`} />;

// DEPRECATED - old icons kept for potential future use, but replaced in skills list
export const UsersIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-users ${className}`} />;
export const SparklesIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-wand-magic-sparkles ${className}`} />;
export const PencilIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-pencil ${className}`} />;
export const ReaperIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-brands fa-reaper ${className}`} />;
export const PowerstudioIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-bolt-lightning ${className}`} />;
export const ZenonmediaIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-record-vinyl ${className}`} />;
export const DavinciIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-film ${className}`} />;
export const CanvaIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-brands fa-canva ${className}`} />;
export const FlstudioIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-fire-flame-curved ${className}`} />;
export const AudacityIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-wave-square ${className}`} />;

// ------------------ BRAND ICONS ------------------
export const InstagramIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-brands fa-instagram ${className}`} />;
export const SpotifyIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-brands fa-spotify ${className}`} />;
export const SoundcloudIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-brands fa-soundcloud ${className}`} />;
export const ApplePodcastsIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-solid fa-podcast ${className}`} />;
export const AppleMusicIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-brands fa-apple ${className}`} />;
export const TwitterXIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-brands fa-x-twitter ${className}`} />;
export const FacebookIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-brands fa-facebook ${className}`} />;
export const LinkedInIcon: React.FC<IconProps> = ({ className }) => <i className={`fa-brands fa-linkedin ${className}`} />;
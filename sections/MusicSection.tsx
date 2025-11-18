import React, { useState, useEffect, useCallback, useMemo, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { Card } from '../components/Card';
import { Song } from '../types';
import * as Icons from '../components/icons';

// --- Helper Functions ---
const parseDuration = (time: string): number => {
  if (!time) return 0;
  const parts = time.split(':').map(Number);
  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return (minutes * 60) + seconds;
  }
  return 0;
};

const formatTime = (totalSeconds: number): string => {
  const seconds = Math.floor(totalSeconds % 60);
  const minutes = Math.floor(totalSeconds / 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};


// --- Child Components ---
const Marquee: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(10);
  const [overflowAmount, setOverflowAmount] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (container && content) {
      const checkOverflow = () => {
        const overflow = content.scrollWidth - container.clientWidth;
        const isOverflow = overflow > 0;
        setIsOverflowing(isOverflow);
        if (isOverflow) {
          setOverflowAmount(overflow);
          setAnimationDuration(Math.max(5, overflow / 45)); // Slower scroll speed
        }
      };
      checkOverflow();
      const resizeObserver = new ResizeObserver(checkOverflow);
      resizeObserver.observe(container);
      resizeObserver.observe(content);
      return () => resizeObserver.disconnect();
    }
  }, [children]);

  const marqueeVariants = {
    animate: {
      x: [0, 0, -overflowAmount - 16, -overflowAmount - 16, 0],
    },
  };

  const marqueeTransition = {
    x: {
      repeat: Infinity,
      duration: animationDuration + 4, // Add 4 seconds for pauses
      // FIX: Type '{ x: { repeat: number; duration: number; ease: string; times: number[]; }; }' is not assignable to type 'Transition<any>'.
      ease: 'linear' as const,
      times: [0, 0.4, 0.6, 0.9, 1],
    },
  };

  return (
    <div ref={containerRef} className={`relative flex w-full overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        ref={contentRef}
        className="flex"
        variants={isOverflowing ? marqueeVariants : undefined}
        animate={isOverflowing ? 'animate' : undefined}
        transition={isOverflowing ? marqueeTransition : undefined}
      >
        <span>{children}</span>
      </motion.div>
    </div>
  );
};


const ArtDisplay = React.memo(({ albumArtUrl, songId }: { albumArtUrl: string | null, songId: string }) => {
    return (
        <div className="w-24 sm:w-28 flex-shrink-0">
            <AnimatePresence mode="wait">
                <motion.div
                    key={songId}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="relative shadow-xl shadow-gray-500/20 rounded-2xl aspect-square overflow-hidden bg-gray-200/50"
                >
                {albumArtUrl ? (
                    <img src={albumArtUrl} alt="Album Art" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Icons.MusicIcon className="text-5xl text-gray-400/60" />
                    </div>
                )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
});

const SongDetails = React.memo(({ title, artist, songId }: { title: string, artist: string, songId: string }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
              key={songId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="min-h-[48px] sm:min-h-[56px] mt-1"
            >
              <Marquee>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900" title={title}>{title}</h3>
              </Marquee>
              <p className="text-gray-600 truncate" title={artist}>{artist}</p>
            </motion.div>
        </AnimatePresence>
    );
});

const PlaybackProgress = ({ duration, durationSeconds, initialTime }: { duration: string, durationSeconds: number, initialTime: number }) => {
    const [currentTime, setCurrentTime] = useState(initialTime);
    const progress = useMotionValue(initialTime / durationSeconds);

    useEffect(() => {
        setCurrentTime(initialTime);
    }, [initialTime]);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(prevTime => {
                const newTime = prevTime + 1;
                if (durationSeconds > 0) {
                    progress.set(Math.min(newTime / durationSeconds, 1));
                }
                return newTime;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [durationSeconds, progress]);

    return (
        <div className="mt-1">
            <div className="w-full bg-gray-200/50 rounded-full h-1.5 overflow-hidden">
                <motion.div
                    className="bg-gray-600 h-1.5 rounded-full"
                    style={{ scaleX: progress, originX: 0 }}
                />
            </div>
            <div className="flex justify-between text-xs text-gray-500 font-mono mt-1.5">
                <span className="w-10 text-left">{formatTime(currentTime)}</span>
                <span>{duration}</span>
            </div>
        </div>
    );
};

// FIX: Define MusicSectionProps interface.
interface MusicSectionProps {
  playlist: Song[];
}

export const MusicSection: React.FC<MusicSectionProps> = ({ playlist }) => {
  const [songIndex, setSongIndex] = useState(0);
  const [albumArtUrl, setAlbumArtUrl] = useState<string | null>(null);
  const [initialTimeIntoSong, setInitialTimeIntoSong] = useState(0);

  const totalPlaylistDuration = useMemo(() => {
    if (!playlist || playlist.length === 0) return 0;
    return playlist.reduce((total, song) => total + parseDuration(song.duration), 0);
  }, [playlist]);

  useEffect(() => {
    if (totalPlaylistDuration === 0) return;

    const calculateCurrentTrack = () => {
        const now = new Date();
        const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        const currentPlaylistTime = secondsSinceMidnight % totalPlaylistDuration;

        let cumulativeDuration = 0;
        for (let i = 0; i < playlist.length; i++) {
            const duration = parseDuration(playlist[i].duration);
            if (currentPlaylistTime < cumulativeDuration + duration) {
                if (songIndex !== i) {
                    setSongIndex(i);
                    const newTimeIntoSong = currentPlaylistTime - cumulativeDuration;
                    setInitialTimeIntoSong(newTimeIntoSong);
                }
                break;
            }
            cumulativeDuration += duration;
        }
    };
    
    calculateCurrentTrack();
    const timer = setInterval(calculateCurrentTrack, 1000);
    return () => clearInterval(timer);
  }, [playlist, songIndex, totalPlaylistDuration]);

  const currentSong = useMemo(() => {
    return playlist[songIndex];
  }, [songIndex, playlist]);
  
  const fetchAlbumArt = useCallback(async (song: Song) => {
    if (!song) return;
    try {
        const searchTerm = encodeURIComponent(
  `${normalize(song.artist)} ${normalize(song.album)}`
);

const response = await fetch(
  `https://itunes.apple.com/search?term=${searchTerm}&entity=album&attribute=albumTerm&limit=1`
);

        const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}&entity=song&limit=1`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const artworkUrl = data.results[0].artworkUrl100.replace('100x100bb.jpg', '600x600bb.jpg');
            setAlbumArtUrl(artworkUrl);
        } else {
            setAlbumArtUrl(null);
        }
    } catch (error) {
      console.error("Failed to fetch album art:", error);
      setAlbumArtUrl(null);
    }
  }, []);

  useEffect(() => {
    if (currentSong) {
      fetchAlbumArt(currentSong);
    }
  }, [currentSong, fetchAlbumArt]);
  
  if (!currentSong) {
    return null;
  }
  
  const durationSeconds = parseDuration(currentSong.duration);

  return (
    <Card>
      <div className="flex items-center gap-4 sm:gap-6">
        <ArtDisplay albumArtUrl={albumArtUrl} songId={currentSong.spotifyId} />
        
        <div className="flex-grow min-w-0">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Now Playing</p>
          
          <SongDetails title={currentSong.title} artist={currentSong.artist} songId={currentSong.spotifyId} />
          
          <PlaybackProgress 
            key={currentSong.spotifyId} 
            duration={currentSong.duration}
            durationSeconds={durationSeconds}
            initialTime={initialTimeIntoSong}
          />
        </div>

        <div className="flex-shrink-0 self-center">
          <motion.a
            href={`https://open.spotify.com/track/${currentSong.spotifyId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#1DB954] transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Listen on Spotify"
          >
            <Icons.SpotifyIcon className="text-3xl" />
          </motion.a>
        </div>
      </div>
    </Card>
  );
};

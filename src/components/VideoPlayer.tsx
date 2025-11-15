import React, { useState, useRef, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  duration?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  title,
  duration,
  className = '',
  autoPlay = false,
  loop = false,
  muted = true,
  playsInline = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Start loading when video is about to be visible
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before video enters viewport
        threshold: 0.1,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Preload video when it should load
  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;

    const video = videoRef.current;
    
    // Set preload strategy
    video.preload = 'metadata'; // Load metadata first, then data when needed
    
    // Load video
    video.load();

    // Handle loading states
    const handleCanPlay = () => {
      setIsLoading(false);
      setIsLoaded(true);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleError = () => {
      setIsLoading(false);
      console.error('Error loading video:', src);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('error', handleError);
    };
  }, [shouldLoad, src]);

  // Progressive loading: start playing when enough data is buffered
  useEffect(() => {
    if (!videoRef.current || !isLoaded || !autoPlay) return;

    const video = videoRef.current;
    let hasStartedPlaying = false;

    const handleProgress = () => {
      if (hasStartedPlaying) return;
      
      if (video.buffered.length > 0 && video.duration) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        
        // If we have buffered at least 10% or 2 seconds, start playing
        if (bufferedEnd >= Math.min(duration * 0.1, 2)) {
          hasStartedPlaying = true;
          video.play().catch((error) => {
            console.warn('Autoplay prevented:', error);
          });
        }
      }
    };

    const handleCanPlayThrough = () => {
      if (!hasStartedPlaying && autoPlay) {
        hasStartedPlaying = true;
        video.play().catch((error) => {
          console.warn('Autoplay prevented:', error);
        });
      }
    };

    video.addEventListener('progress', handleProgress);
    video.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [isLoaded, autoPlay]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
          <div className="w-16 h-16 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Poster image - shown until video loads */}
      {poster && !isLoaded && (
        <img
          src={poster}
          alt={title || 'Video thumbnail'}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}

      {/* Video element */}
      {shouldLoad && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay={autoPlay && isLoaded}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload="metadata"
          onLoadedData={() => {
            // Start loading more data when metadata is ready
            if (videoRef.current) {
              videoRef.current.preload = 'auto';
            }
          }}
        />
      )}

      {/* Duration badge */}
      {duration && (
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm z-20">
          {duration}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;


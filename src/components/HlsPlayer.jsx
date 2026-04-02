import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

function HlsPlayer({ src, playWithSound = false }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let hls;

        const tryPlay = () => {
            video.volume = 0.68; // đặt âm lượng mặc định

            if (playWithSound) {
                video.muted = false; // mở tiếng
            } else {
                video.muted = true;
            }

            video.play().catch(() => {
                // fallback nếu bị chặn
                video.muted = true;
                video.play();
            });
        };

        if (Hls.isSupported()) {
            hls = new Hls({
                maxBufferLength: 30,
                backBufferLength: 30,
            });

            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, tryPlay);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
            video.addEventListener('loadedmetadata', tryPlay);
        }

        return () => {
            if (hls) hls.destroy();
        };
    }, [src, playWithSound]);

    return <video ref={videoRef} controls playsInline preload="metadata" style={{ width: '100%' }} />;
}

export default HlsPlayer;

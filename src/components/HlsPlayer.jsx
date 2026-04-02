import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

function HlsPlayer({ src, autoPlayWithSound = false }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (Hls.isSupported()) {
            const hls = new Hls({
                lowLatencyMode: true,
            });

            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (autoPlayWithSound) {
                    video.muted = false; // 🔥 mở tiếng
                } else {
                    video.muted = true;
                }

                video.play().catch(() => {
                    // fallback nếu bị chặn
                    video.muted = true;
                    video.play();
                });
            });

            return () => hls.destroy();
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;

            video.addEventListener('loadedmetadata', () => {
                video.muted = !autoPlayWithSound;
                video.play().catch(() => {
                    video.muted = true;
                    video.play();
                });
            });
        }
    }, [src, autoPlayWithSound]);

    return <video ref={videoRef} controls playsInline style={{ width: '100%' }} />;
}

export default HlsPlayer;

import {useEffect, useRef} from 'react';

interface VideoPlayerProps {
    stream: MediaStream | null;
    muted?: boolean;
}

export const VideoPlayer = ({ stream, muted = false }: VideoPlayerProps) => {
    const VideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (VideoRef.current) {
            VideoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <video
            ref={VideoRef}
            autoPlay
            playsInline
            muted={muted}
            style={{
                width: '100%',
                maxWidth: '600px',
                backgroundColor: '#111',
                borderRadius: '8px',
                transform: 'scaleX(-1)',
            }}
        />
    );
};
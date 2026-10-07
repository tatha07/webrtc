import { useState,useEffect,useRef } from "react";
// data that the hook will return to the UI
export interface LocalMediaState{
    stream: MediaStream | null,
    isAudioEnabled: boolean;
    isVideoEnabled: boolean;
    error: String | null;
    toggleAudio: () => void;
    toggleVideo:()=>void;
}
export const useLocalMedia =(): LocalMediaState =>{
    const [stream, setStream]= useState<MediaStream | null>(null);
    const[isAudioEnabled, setIsAudioEnabled] = useState(true);
    const[isVideoEnabled, setIsVideoEnabled] =useState(true);
    const[error,setError]= useState<string | null>(null);
    // tracking if the component is still mounted using ref
    const isMounted = useRef(true);
    useEffect(()=>{
        // request to the user for audio and video
        let localStream: MediaStream | null = null;
        const startMedia = async() =>{
            try{
                localStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
                // update state if component is mounted
                if(isMounted.current){
                    setStream(localStream);
                }
            }catch(err){
                console.error("Error accessing devices: ",err);
                if(isMounted.current){
                    setError("Failed to connect camera/microphone")
                }
            }
            
        };
        startMedia();
        return() =>{
            isMounted.current = false;
            if(localStream){
                localStream.getTracks().forEach((track)=> track.stop());
            }
        };
    },[]);
    const toggleAudio =() =>{
        if(!stream)return;
        const audioTracks = stream.getAudioTracks();
        audioTracks.forEach((track)=>{
            track.enabled =!track.enabled;
        });
        setIsAudioEnabled((prev) => !prev);
    };
    const toggleVideo=()=>{
        if(!stream) return;
        const videoTracks = stream.getVideoTracks();
        videoTracks.forEach((track)=>{
            track.enabled= !track.enabled;
        });
        setIsVideoEnabled((prev) => !prev);
    };
    return {
        stream,
        isAudioEnabled,
        isVideoEnabled,
        error,
        toggleAudio,
        toggleVideo,
    };
};
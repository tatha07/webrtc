interface LocalControlsProps{
    isAudioEnabled: boolean;
    isVideoEnabled: boolean;
    onToggleAudio: () => void;
    onToggleVideo: () =>void;
}
export const LocalControls =({
    isAudioEnabled,
    isVideoEnabled,
    onToggleAudio,
    onToggleVideo,
}:LocalControlsProps)=>{
    return(
        <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
            <button onClick={onToggleAudio}>
                {isAudioEnabled ? 'Mute Mic':'Unmute Mic'}
            </button>
            <button onClick={onToggleVideo}>
                {isVideoEnabled ? 'Turn off Camera': 'Turn on Camera'}
            </button>
        </div>
    );
};
import { useLocalMedia} from "./hooks/useLocalMedia";
import { VideoPlayer } from "./hooks/VideoPlayer";
import { LocalControls } from "./hooks/LocalContols";
function App(){
  const{
    stream,
    isAudioEnabled,
    isVideoEnabled,
    error,
    toggleAudio,
    toggleVideo
  }=useLocalMedia();
  return(
    <div style={{padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif'}}>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <VideoPlayer stream={stream} muted ={true}/>
      <LocalControls
      isAudioEnabled={isAudioEnabled}
      isVideoEnabled={isVideoEnabled}
      onToggleAudio={toggleAudio}
      onToggleVideo={toggleVideo}
      />
    </div>
  );
}
export default App;
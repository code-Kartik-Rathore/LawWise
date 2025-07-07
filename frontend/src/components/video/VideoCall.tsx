import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVideoSlash, faMicrophone, faMicrophoneSlash, faPhone, faPhoneSlash, faDesktop } from '@fortawesome/free-solid-svg-icons';
import './VideoCall.css';

interface VideoCallProps {
  onEndCall: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ onEndCall }) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const screenTrackRef = useRef<MediaStreamTrack | null>(null);

  useEffect(() => {
    const setupMedia = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
    };
    setupMedia();
    return () => {
      if (localStream) localStream.getTracks().forEach(track => track.stop());
      if (peerConnection.current) peerConnection.current.close();
    };
    // eslint-disable-next-line
  }, []);

  const startCall = async () => {
    if (!localStream) return;
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
    pc.ontrack = (event) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
      setRemoteStream(event.streams[0]);
    };
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        // Send candidate to remote peer (simulate)
        console.log('ICE candidate:', event.candidate);
      }
    };
    peerConnection.current = pc;
    // Simulate offer/answer exchange
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    console.log('Created offer:', offer);
    // Simulate remote answer
    setTimeout(async () => {
      const answer = { type: 'answer', sdp: '...fake sdp...' };
      await pc.setRemoteDescription(answer as any);
      setIsCallActive(true);
    }, 1000);
  };

  const endCall = () => {
    if (localStream) localStream.getTracks().forEach(track => track.stop());
    if (remoteStream) remoteStream.getTracks().forEach(track => track.stop());
    if (peerConnection.current) peerConnection.current.close();
    setIsCallActive(false);
    setRemoteStream(null);
    onEndCall();
  };

  const toggleVideo = () => {
    if (!localStream) return;
    localStream.getVideoTracks().forEach(track => {
      track.enabled = !isVideoOn;
    });
    setIsVideoOn(v => !v);
  };

  const toggleAudio = () => {
    if (!localStream) return;
    localStream.getAudioTracks().forEach(track => {
      track.enabled = !isAudioOn;
    });
    setIsAudioOn(a => !a);
  };

  const startScreenShare = async () => {
    if (!localStream || isScreenSharing) return;
    try {
      const screenStream = await (navigator.mediaDevices as any).getDisplayMedia({ video: true });
      const screenTrack = screenStream.getVideoTracks()[0];
      screenTrackRef.current = screenTrack;
      const sender = peerConnection.current?.getSenders().find(s => s.track && s.track.kind === 'video');
      if (sender) sender.replaceTrack(screenTrack);
      screenTrack.onended = () => stopScreenShare();
      if (localVideoRef.current) localVideoRef.current.srcObject = screenStream;
      setIsScreenSharing(true);
    } catch (err) {
      console.error('Screen share error:', err);
    }
  };

  const stopScreenShare = () => {
    if (!localStream || !isScreenSharing) return;
    const sender = peerConnection.current?.getSenders().find(s => s.track && s.track.kind === 'video');
    if (sender && localStream.getVideoTracks().length > 0) {
      sender.replaceTrack(localStream.getVideoTracks()[0]);
    }
    if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
    setIsScreenSharing(false);
  };

  return (
    <div className="video-call-container">
      <div className="video-grid">
        <div className="video-container remote-video">
          <video ref={remoteVideoRef} autoPlay playsInline muted={false} className="video-element" />
          {!isCallActive && <div className="call-status"><p>Waiting to connect...</p></div>}
        </div>
        <div className="video-container local-video">
          <video ref={localVideoRef} autoPlay playsInline muted className="video-element" />
        </div>
      </div>
      <div className="call-controls">
        <button onClick={toggleVideo} className={`control-button ${!isVideoOn ? 'active' : ''}`} title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}>
          <FontAwesomeIcon icon={isVideoOn ? faVideo : faVideoSlash} />
        </button>
        <button onClick={toggleAudio} className={`control-button ${!isAudioOn ? 'active' : ''}`} title={isAudioOn ? 'Mute mic' : 'Unmute mic'}>
          <FontAwesomeIcon icon={isAudioOn ? faMicrophone : faMicrophoneSlash} />
        </button>
        <button onClick={isScreenSharing ? stopScreenShare : startScreenShare} className={`control-button ${isScreenSharing ? 'active' : ''}`} title={isScreenSharing ? 'Stop screen share' : 'Share screen'}>
          <FontAwesomeIcon icon={faDesktop} />
        </button>
        {!isCallActive ? (
          <button onClick={startCall} className="control-button start-call" title="Accept/Start call">
            <FontAwesomeIcon icon={faPhone} />
          </button>
        ) : (
          <button onClick={endCall} className="control-button end-call" title="End call">
            <FontAwesomeIcon icon={faPhoneSlash} />
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCall;

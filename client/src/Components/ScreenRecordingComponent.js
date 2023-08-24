import React, { useState, useRef } from 'react';
import RecordRTC from 'recordrtc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';
import './ScreenRecordingComponent.css';

const ScreenRecordingComponent = () => {
    const [recording, setRecording] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);
    const [recordedBlob, setRecordedBlob] = useState(null);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);

    const recorderRef = useRef(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: videoEnabled,
                audio: audioEnabled,
            });
            const recorder = new RecordRTC(stream, { type: 'video' });
            recorderRef.current = recorder;
            setMediaStream(stream);
            recorder.startRecording();
            setRecording(true);
        } catch (error) {
            console.error('Error starting screen recording:', error);
        }
    };

    const stopRecording = () => {
        if (recorderRef.current) {
            recorderRef.current.stopRecording(() => {
                setRecordedBlob(recorderRef.current.getBlob());
                setMediaStream(null);
                setRecording(false);
            });
        }
    };

    const toggleVideo = () => {
        setVideoEnabled(prevVideoEnabled => !prevVideoEnabled);
    };

    const toggleAudio = () => {
        setAudioEnabled(prevAudioEnabled => !prevAudioEnabled);
    };

    return (
        <div className="screen-recording-container">
            <h2>Screen Recording</h2>
            <button className="recording-button" onClick={startRecording} disabled={recording}>
                <FontAwesomeIcon icon={faVideo} /> Start Recording
            </button>
            <button className="recording-button" onClick={stopRecording} disabled={!recording}>
                <FontAwesomeIcon icon={faStop} /> Stop Recording
            </button>
            <button className="toggle-button" onClick={toggleVideo}>
                {videoEnabled ? 'Disable Video' : 'Enable Video'}
            </button>
            <button className="toggle-button" onClick={toggleAudio}>
                {audioEnabled ? 'Disable Audio' : 'Enable Audio'}
            </button>
            {recordedBlob && (
                <video controls src={URL.createObjectURL(recordedBlob)} />
            )}
        </div>
    );
};

export default ScreenRecordingComponent;

import React, { useState, useRef } from 'react';
import RecordRTC from 'recordrtc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faMicrophone, faMicrophoneSlash, faStop } from '@fortawesome/free-solid-svg-icons';
import './VideoRecordingComponent.css';

const VideoRecordingComponent = () => {
    const [recording, setRecording] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);
    const [recordedBlob, setRecordedBlob] = useState(null);
    const [audioEnabled, setAudioEnabled] = useState(true);

    const recorderRef = useRef(null);

    const startRecording = async () => {
        try {
            const constraints = {
                video: true,
                audio: audioEnabled,
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            const recorder = new RecordRTC(stream, { type: 'video' });
            recorderRef.current = recorder;
            setMediaStream(stream);
            recorder.startRecording();
            setRecording(true);
        } catch (error) {
            console.error('Error starting video recording:', error);
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

    const toggleAudio = () => {
        setAudioEnabled(prevAudioEnabled => !prevAudioEnabled);
    };

    return (
        <div className="recording-container">
            <h2>Video Recording</h2>
            <button className="recording-button" onClick={startRecording} disabled={recording}>
                <FontAwesomeIcon icon={faVideo} /> Start Recording
            </button>
            <button className="recording-button" onClick={stopRecording} disabled={!recording}>
                <FontAwesomeIcon icon={faStop} /> Stop Recording
            </button>
            <button className={`recording-button ${audioEnabled ? '' : 'disabled-button'}`} onClick={toggleAudio}>
                {audioEnabled ? <FontAwesomeIcon icon={faMicrophone} /> : <FontAwesomeIcon icon={faMicrophoneSlash} />}{' '}
                {audioEnabled ? 'Disable Audio' : 'Enable Audio'}
            </button>
            {recordedBlob && (
                <video controls src={URL.createObjectURL(recordedBlob)} style={{ width: '100%', marginTop: '20px' }} />
            )}
        </div>
    );
};

export default VideoRecordingComponent;

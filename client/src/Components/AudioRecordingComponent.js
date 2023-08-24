import React, { useState, useRef } from 'react';
import RecordRTC from 'recordrtc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';
import './AudioRecordingComponent.css';

const AudioRecordingComponent = () => {
    const [recording, setRecording] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);
    const [recordedBlob, setRecordedBlob] = useState(null);

    const recorderRef = useRef(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new RecordRTC(stream, { type: 'audio' });
            recorderRef.current = recorder;
            setMediaStream(stream);
            recorder.startRecording();
            setRecording(true);
        } catch (error) {
            console.error('Error starting audio recording:', error);
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

    return (
        <div className="audio-recording-container">
            <h2>Audio Recording</h2>
            <button className="recording-button" onClick={startRecording} disabled={recording}>
                <FontAwesomeIcon icon={faMicrophone} /> Start Recording
            </button>
            <button className="recording-button" onClick={stopRecording} disabled={!recording}>
                <FontAwesomeIcon icon={faStop} /> Stop Recording
            </button>
            {recordedBlob && (
                <audio controls src={URL.createObjectURL(recordedBlob)} />
            )}
        </div>
    );
};

export default AudioRecordingComponent;

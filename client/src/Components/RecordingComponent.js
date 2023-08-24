import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';
import './RecordingComponent.css'; // Import your CSS file

const RecordingComponent = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioStream, setAudioStream] = useState(null);
    const [videoStream, setVideoStream] = useState(null);
    const [screenStream, setScreenStream] = useState(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);
    const videoRef = useRef(null);

    const handleStartRecording = async () => {
        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setAudioStream(audioStream);

            const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            setScreenStream(screenStream);

            const combinedStream = new MediaStream([...audioStream.getTracks(), ...screenStream.getTracks()]);
            setVideoStream(combinedStream);

            const mediaRecorder = new MediaRecorder(combinedStream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'recording.webm';
                a.click();
                recordedChunksRef.current = [];
            };

            setIsRecording(true);
            mediaRecorder.start();
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            if (audioStream) audioStream.getTracks().forEach(track => track.stop());
            if (screenStream) screenStream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
            setAudioStream(null);
            setScreenStream(null);
            setVideoStream(null);
        }
    };

    return (
        <div className="recording-container">
            {!isRecording ? (
                <button className="recording-button" onClick={handleStartRecording}>
                    <FontAwesomeIcon icon={faMicrophone} /> Start Recording
                </button>
            ) : (
                <>
                    <video ref={videoRef} autoPlay muted controls className="video-display" />
                    <button className="recording-button" onClick={handleStopRecording}>
                        <FontAwesomeIcon icon={faStop} /> Stop Recording
                    </button>
                </>
            )}
        </div>
    );
};

export default RecordingComponent;

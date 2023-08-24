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
    const [downloadUrl, setDownloadUrl] = useState(null);

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
                setDownloadUrl(url);
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
        }
    };

    const handleDownload = () => {
        if (downloadUrl) {
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'recording.webm';
            a.click();
        }
    };

    return (
        <div className="recording-container">
            <h2>Screen Recording with Audio</h2>
            {!isRecording ? (
                <button className="recording-button" onClick={handleStartRecording}>
                    <FontAwesomeIcon icon={faMicrophone} /> Start Recording
                </button>
            ) : (
                <>
                    <button className="recording-button" onClick={handleStopRecording}>
                        <FontAwesomeIcon icon={faStop} /> Stop Recording
                    </button>
                </>
            )}
            {downloadUrl && (
               <button className="recording-button" onClick={handleDownload}>
               Download
           </button>
            )}
        </div>
    );
};

export default RecordingComponent;


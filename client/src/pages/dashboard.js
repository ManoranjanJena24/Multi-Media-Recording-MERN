import React, { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import AudioRecordingComponent from '../Components/AudioRecordingComponent'
import RecordingComponent from '../Components/RecordingComponent'
import VideoRecordingComponent from '../Components/VideoRecordingComponent'
import ScreenRecordingComponent from '../Components/ScreenRecordingComponent'
import Logout from '../pages/Logout'
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [video, setVideo] = useState('')
    const [tempVideo, setTempVideo] = useState('')
    const [loggedIn, setLoggedIn] = useState(false); // New state for authentication status

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt_decode(token)
            console.log(user)
            if (!user) {
                localStorage.removeItem('token')
                window.location.href = '/login'
            } else {
                setLoggedIn(true); // Mark user as logged in
               
            }
        }
    }, [])

    // Conditional rendering based on authentication status
    return (
        <div>
            {loggedIn ? (
                <>
                    <RecordingComponent />
                    <AudioRecordingComponent />
                    <VideoRecordingComponent />
                    <ScreenRecordingComponent />
                    <Logout/>
                </>
            ) : (
                <p>Please <Link to="/login">log in</Link> to access the dashboard.</p>
            )}
        </div>
    )
}

export default Dashboard;

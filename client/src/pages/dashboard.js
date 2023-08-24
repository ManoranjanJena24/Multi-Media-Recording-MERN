// import React, { useEffect, useState } from "react";
// // const jwt = require('jwt-decode');
// import jwt_decode from 'jwt-decode';
// import AudioRecordingComponent from '../Components/AudioRecordingComponent'
// import RecordingComponent from '../Components/RecordingComponent'
// import VideoRecordingComponent from '../Components/VideoRecordingComponent'
// import ScreenRecordingComponent from '../Components/ScreenRecordingComponent'
// import Logout from '../pages/Logout'

// const Dashboard = () => {
//     const [video, setVideo] = useState('')
//     const [tempVideo, setTempVideo] = useState('')

//     async function populateData() {

//         const req = await fetch('http://localhost:3001/api/video', {
//             headers: {
//                 'x-access-token': localStorage.getItem('token')
//             },
//         })
//         const data = await req.json()
//         if (data.status === 'ok') {
//             setVideo(data.video)
//         } else {
//             alert(data.error)
//         }
//         console.log(data)
//     }

//     useEffect(() => {
//         const token = localStorage.getItem('token')
//         if (token) {
//             const user = jwt_decode(token)
//             console.log(user)
//             if (!user) {
//                 localStorage.removeItem('token')
//                 window.location.href = '/login' //history.replace('/login')
//             } else {
//                 populateData()
//             }
//         }
//     }, [])

//     return (
//         <div>
//             <RecordingComponent />
//             <AudioRecordingComponent />
//             <VideoRecordingComponent />
//             <ScreenRecordingComponent />
//             <Logout/>

//         </div>
//     )
// }

// export default Dashboard

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

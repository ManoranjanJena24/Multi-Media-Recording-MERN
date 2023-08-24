import React, { useEffect, useState } from "react";
// const jwt = require('jwt-decode');
import jwt_decode from 'jwt-decode';

const Dashboard = () =>{
    const [video, setVideo] = useState('')
    const [tempVideo, setTempVideo] = useState('')

    async function populateData(){
        // const req = await fetch('/api/data',{
        
            const req = await fetch('http://localhost:3001/api/video',{
            headers:{
                'x-access-token':localStorage.getItem('token') 
            },
        })
        const data=await req.json()
        if(data.status==='ok'){
            setVideo(data.video)
        } else {
            alert(data.error)
        }
        console.log(data)
    }

    useEffect(()=>{
        const token=localStorage.getItem('token') 
        if(token) {
            const user=jwt_decode(token)
            console.log(user)
            if(!user){
                localStorage.removeItem('token')
                window.location.href='/login' //history.replace('/login')
            } else {
                populateData()
            }
        }
    },[])

    async function updateVideo(event){
        event.preventDefault()

        const req = await fetch('http://localhost:3001/api/video',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'x-access-token':localStorage.getItem('token') 
            },
            body: JSON.stringify({
                video: tempVideo,
            }),
        })

        const data=await req.json()
        if(data.status==='ok'){
            setVideo(tempVideo)
            setTempVideo('')
        } else {
            alert(data.error)
        }
    }

    return (
        <div> 
        <h1>Your video : {video || 'No video found'}</h1>
        <form onSubmit={updateVideo}>
            <input 
                type="text" 
                placeholder="Video" 
                value={tempVideo} 
                onChange={(e)=>setTempVideo(e.target.value)}
            />
            <input type="submit" value="Update Video"/>
        </form>
    </div>
    )
}

export default Dashboard
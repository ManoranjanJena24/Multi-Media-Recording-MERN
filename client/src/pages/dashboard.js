import React, { useEffect } from "react";
// const jwt = require('jwt-decode');
import jwt_decode from 'jwt-decode';

const Dashboard = () =>{

    async function populateData(){
        // const req = await fetch('/api/data',{
        try{
            const req = await fetch('http://localhost:3001/api/video',{
            headers:{
                'x-access-token':localStorage.getItem('token') 
            },
        })
        const data=await req.json()
        console.log(data)
    } catch (error) {
        console.error("Error fetching data:", error);
    }


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

    return <h1>Helloo</h1>
}

export default Dashboard
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
    const [name, setName]= useState("");
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const [role, setRole]= useState("");
    const navigate= useNavigate();
    const handleRegister=()=>{
        fetch("http://localhost:5002/user/register", {
            method:'POST',
            body:JSON.stringify({
                name:name,
                username:username,
                password:password,
                role:role
            }),
            headers:{
                "Content-Type":'application/json'
            },
            credentials:'include'
        }).then(e=>e.json()).then(e=>{
            console.log(e);
            if(role==="hotel_owner"){
                navigate("/registerhotel");
            }else{
                navigate("/");
            }
        });
    }
  return (
    <>
    <h1>Register Page</h1>
    <label>
        Name:
        <input onChange={e=>setName(e.target.value)}/>
    </label>
    <label>
        Username:
        <input onChange={e=>setUsername(e.target.value)}/>
    </label>
    <label>
        Password:
        <input onChange={e=>setPassword(e.target.value)}/>
    </label>
    <label>
        Role:
        <select onChange={e=>setRole(e.target.value)}>
            <option value="clerk">clerk</option>
            <option value="hotel_owner">Hotel Owner</option>
            <option value="traveller">Traveller</option>
        </select>
    </label>
    <button onClick={handleRegister}>Register</button>
    </>
  )
}

export default RegisterUser;
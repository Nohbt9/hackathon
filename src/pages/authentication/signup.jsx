import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { useContext } from 'react';
import { User } from '../../utilities/store';
import Home from '../Home/Home';
function SignUp() {
    const {setScreenState,setSignIn}=useContext(User);
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [pincode,setPincode]=useState("");
    function passwordset(e){
 
        setPassword(e.target.value);
     }
     function usernameset(e){
     setUsername(e.target.value);
     }
     function pincodeset(e){
        setPincode(e.target.value);
        }
  return (
    <div style={{marginTop:250,display:"flex",flexDirection:'row',justifyContent:"center"}}>
<div>
<p>Username</p>
    <input onChange={usernameset} type="text" />
    <p>Password</p>
    <input onChange={passwordset} type="text" />
   <br />
   <p>Pincode</p>
    <input onChange={pincodeset} type="text" />
   <br />
    <button onClick={async ()=>{
       const {data}=await  axios.post("http://localhost:800/createUser",{username:username,password:password,pincode:pincode});
       console.log(data.code);
       if(data.code==1){
        localStorage.setItem("username",data.username);
        setSignIn(true);
        setScreenState(<Home/>);
       }
    }}>Sign Up</button>
</div>
</div>
  );
}

export default SignUp;
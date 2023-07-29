import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { useContext } from 'react';
import { useEffect } from 'react';
import { User } from '../../utilities/store';
function News() {
    const {signedIn}=useContext(User);
    async function addfavNews(e){
     const {data}=  await  axios.post("http://localhost:800/addFavNews",{id:e.target.id,username:localStorage.getItem("username")});
      console.log(data.code);
        console.log(e.target.id);
    }
    async function deletefavNews(e){
        const {data}=await axios.post("http://localhost:800/deleteFavNews",{id:e.target.id,username: localStorage.getItem("username")});
        setNews(data.map(({webpage,num_visits,num_readers,_id})=>{

            return (
                <div style={{border: "3px solid rgb(108, 110, 111)",margin:20,borderRadius: 30,paddingTop:20,paddingBottom:20,paddingRight:15,paddingLeft:15,boxShadow:"0 0 4px grey"}}>
              
                <a target="_blank" href={webpage}>{webpage}</a>
                 <p>Number of visits {num_visits}</p>
                 <p>Number of readers {num_readers}</p>
                <button id={_id} onClick={deletefavNews}>Delete</button>
               
                    
                  
                </div>)
            ;
         }));
    }
    async function getFavNews(){
       const {data}= await axios.post("http://localhost:800/getFavNews",{username:localStorage.getItem("username")});
       setNews(data.map(({webpage,num_visits,num_readers,_id})=>{

        return (
            <div style={{border: "3px solid rgb(108, 110, 111)",margin:20,borderRadius: 30,paddingTop:20,paddingBottom:20,paddingRight:15,paddingLeft:15,boxShadow:"0 0 4px grey"}}>
          
            <a target="_blank" href={webpage}>{webpage}</a>
             <p>Number of visits {num_visits}</p>
             <p>Number of readers {num_readers}</p>
            <button id={_id} onClick={deletefavNews}>Delete</button>
           
                
              
            </div>)
        ;
     }));
    }
    async function getNewsonpin(){
        const {data}=await axios.post("http://localhost:800/getNewsonpin",{pincode:pincode});
        setNews(data.news.map(({webpage,num_visits,num_readers,_id})=>{

           return (
               <div style={{border: "3px solid rgb(108, 110, 111)",margin:20,borderRadius: 30,paddingTop:20,paddingBottom:20,paddingRight:15,paddingLeft:15,boxShadow:"0 0 4px grey"}}>
             
               <a target="_blank" href={webpage}>{webpage}</a>
                <p>Number of visits {num_visits}</p>
                <p>Number of readers {num_readers}</p>
               <button id={_id} onClick={addfavNews}>Add</button>
              
                   
                 
               </div>)
           ;
        })); 
    }
    async function getNews(){
     const {data}=await axios.post("http://localhost:800/getNews",{username:localStorage.getItem("username")});
     setNews(data.news.map(({webpage,num_visits,num_readers,_id})=>{
        return (
            <div style={{border: "3px solid rgb(108, 110, 111)",margin:20,borderRadius: 30,paddingTop:20,paddingBottom:20,paddingRight:15,paddingLeft:15,boxShadow:"0 0 4px grey"}}>
                <a target="_blank" href={webpage}>{webpage}</a>
                <p>Number of visits {num_visits}</p>
                <p>Number of readers {num_readers}</p>
                <button id={_id} onClick={addfavNews}>Add</button>
            </div>
       )
     }));
    }
    function pincodeset(e){
        setPincode(e.target.value);
        }
    const [pincode,setPincode]=useState("");
    const [news,setNews]=useState([]);
    const [newsNo,setNewsNo]=useState(0);

    // useEffect(()=>{
    //     async function  fetchNewsno(){
    //        const res=await axios.post("http://localhos",{username:localStorage.getItem("username")});   
    //     }
    //     fetchNewsno();
    // });
    console.log(signedIn);
    const x=<button onClick={getFavNews}>See Your FavouriteNews</button>;
  return (<>
     
      <div style={{marginTop:250,display:"flex",flexDirection:'column',alignItems:"center"}}>
      <div style={{marginBottom:20}}>
          <div>{signedIn ? x  : null}</div>
        
       </div>
        <button onClick={getNews}>Get News for your own Locality</button>
        <br />
        <br />
        <input onChange={pincodeset} type="text" placeholder='Enter pin' name="" id="" />
        <button onClick={getNewsonpin}>Get News for other locality</button>
         <div>
            {news}
         </div>
      </div>
  </>
      


  )
}

export default News;
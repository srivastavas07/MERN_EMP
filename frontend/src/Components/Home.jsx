import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'
import Header from './Header';
import { useSelector } from 'react-redux';
import adminSVG from "../Assets/adminPhoto.svg"

function Home() {
  const navigate = useNavigate();
  const {admin} = useSelector(store=>store.admin);
  useEffect(()=>{
    if(!admin){
      navigate('/login');
    }
  },[admin,navigate]);
  return (
    <>
    <Header/>
    <img src={adminSVG} style={{
      height:"400px",
      width:"400px",
      display:"block",
      margin:"auto",
      marginTop:"100px"
    }}/>
    <div className='text-4xl w-full text-center flex justify-center font-bold '><p>Welcome to Admin Panel</p></div>
    </>
  )
}

export default Home;
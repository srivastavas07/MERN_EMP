import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'
import Header from './Header';
import { useSelector } from 'react-redux';

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
    <div className='text-4xl w-full text-center flex justify-center mt-[300px] font-bold '><p>Welcome to Admin Panel</p></div>
    </>
  )
}

export default Home;
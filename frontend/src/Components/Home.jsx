import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'
import Header from './Header';
import { useSelector } from 'react-redux';
import adminSVG from "../Assets/adminPhoto.png"

function Home() {
  const navigate = useNavigate();
  const { admin } = useSelector(store => store.admin);
  useEffect(() => {
    if (!admin) {
      navigate('/login');
    }
  }, [admin, navigate]);
  return (
    <>
      <Header />

      <div className='text-4xl w-[80%] adminBanner flex backdrop-blur-lg mx-auto p-5 justify-center items-center mt-[12%] shadow-2xl shadow-black '>
        <img src={adminSVG} style={{
        height: "400px",
        width: "500px",
        display: "block",
      }} />
      <p className=' text-black caveat-fonty'>Welcome to Admin Panel</p></div>
    </>
  )
}

export default Home;
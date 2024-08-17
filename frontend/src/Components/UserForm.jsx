import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaBriefcase, FaVenusMars, FaBook, FaUpload } from 'react-icons/fa';
import { EMPLOYEE_END_POINT } from '../utils/constants';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import toast from 'react-hot-toast';
import Header from './Header';

const UserForm = () => {
  // State to manage form data
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
    image: '',
  });

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        courses: checked
          ? [...prevData.courses, value]
          : prevData.courses.filter((course) => course !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const options = {
      maxSizeMB: 1, // Maximum file size in MB
      maxWidthOrHeight: 1920, // Max width/height for the image
      useWebWorker: true,
    };
    if(file){
      const fileType = file.type;
      if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
        setError(true);
      }else{
        setError(false);
        try {
          const compressedFile = await imageCompression(file, options);
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData((prevData) => ({
              ...prevData,
              image: reader.result,
            }));
          };
          reader.readAsDataURL(compressedFile);
        } catch (error) {
          console.error('Image compression error:', error);
        }
      }
    }
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.designation || !formData.gender || !formData.courses || !formData.image) {
      toast.error("Please fill all the fields");
    }
    try {
      const response = await axios.post(`${EMPLOYEE_END_POINT}/create`, {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        designation: formData.designation,
        gender: formData.gender,
        course: formData.courses,
        image: formData.image, // Send Base64 string to backend
      },{
        withCredentials:true,
      },{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex items-center w-[100vw] h-full relative'>
      <Header/>
      <form onSubmit={handleSubmit} className=" w-[55vw] mx-auto mt-[10%] p-8 border-light bg-white rounded-sm shadow-2xl">
        {/* Name */}
        <div className="flex items-center mb-4">
          <FaUser className="text-gray-500 mr-2" />
          <label htmlFor="name" className="w-1/4 text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Email */}
        <div className="flex items-center mb-4">
          <FaEnvelope className="text-gray-500 mr-2" />
          <label htmlFor="email" className="w-1/4 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Mobile Number */}
        <div className="flex items-center mb-4">
          <FaPhone className="text-gray-500 mr-2" />
          <label htmlFor="mobile" className="w-1/4 text-sm font-medium text-gray-700">Mobile No</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Designation */}
        <div className="flex items-center mb-4">
          <FaBriefcase className="text-gray-500 mr-2" />
          <label htmlFor="designation" className="w-1/4 text-sm font-medium text-gray-700">Designation</label>
          <select
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        {/* Gender */}
        <div className="flex items-center mb-4">
          <FaVenusMars className="text-gray-500 mr-2" />
          <label className="w-1/4 text-sm font-medium text-gray-700">Gender</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="M"
                checked={formData.gender === 'M'}
                onChange={handleChange}
                className="mr-2"
              /> Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="F"
                checked={formData.gender === 'F'}
                onChange={handleChange}
                className="mr-2"
              /> Female
            </label>
          </div>
        </div>

        {/* Course */}
        <div className="flex items-center mb-4">
          <FaBook className="text-gray-500 mr-2" />
          <label className="w-1/4 text-sm font-medium text-gray-700">Course</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="course"
                value="MCA"
                checked={formData.courses.includes('MCA')}
                onChange={handleChange}
                className="mr-2"
              /> MCA
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="course"
                value="BCA"
                checked={formData.courses.includes('BCA')}
                onChange={handleChange}
                className="mr-2"
              /> BCA
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="course"
                value="BSC"
                checked={formData.courses.includes('BSC')}
                onChange={handleChange}
                className="mr-2"
              /> BSC
            </label>
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex items-center mb-4">
          <FaUpload className="text-gray-500 mr-2" />
          <label htmlFor="image" className="w-1/4 text-sm font-medium text-gray-700">Img Upload</label>
          <div className='w-full'>
          <input
            type="file"
            id="imgUpload"
            name="image"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <p className='text-xs mt-1 text-red-500'>{error ? "Only PNG and JPEG formats are allowed.": ""}</p>
        </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;

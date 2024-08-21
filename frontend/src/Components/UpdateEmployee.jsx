import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaBriefcase, FaVenusMars, FaBook, FaUpload } from 'react-icons/fa';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { EMPLOYEE_END_POINT } from '../utils/constants';
import toast from 'react-hot-toast';
import Header from './Header';
import { useParams } from 'react-router-dom';
import useGetUpdateDetail from '../Hooks/useGetUpdateDetail';
import { useSelector, useDispatch } from 'react-redux';
import { setRefresh } from '../Redux/employeeSlice';

const UpdateEmployee = () => {
  const dispatch = useDispatch();
  const { id } = useParams()
  useGetUpdateDetail(id);
  const { updateDetail } = useSelector(store => store.employee);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
    image: ''
  });
  useEffect(() => {
    if (updateDetail) {
      setFormData({
        name: updateDetail.name || '',
        email: updateDetail.email || '',
        mobile: updateDetail.mobile || '',
        designation: updateDetail.designation || '',
        gender: updateDetail.gender || '',
        courses: updateDetail.course || [],
        image: updateDetail.image || ''
      })
    };
  }, [updateDetail]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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
    if (file) {
      const fileType = file.type;
      if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
        setError(true);
        e.target.value = "";
        toast.error('Invalid file format.');
        return;
      } else {
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.designation || !formData.gender || !formData.courses) {
      toast.error("Fields cant be empty.");
    }
    else if (!formData.image) {
      toast.error("Invalid Image or << 1Mb");
      return;
    };
    if (updateDetail.email !== formData.email || updateDetail.mobile !== formData.mobile) {
      const isValid = await dataValidation(formData.email, formData.mobile);
      if (!isValid) {
        return;
      }
    }
    try {
      const response = await axios.put(`${EMPLOYEE_END_POINT}/update/${id}`, {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        designation: formData.designation,
        gender: formData.gender,
        course: formData.courses,
        image: formData.image, // Send Base64 string to backend
      }, {
        withCredentials: true
      });
      dispatch(setRefresh());
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const dataValidation = async (email, number) => {
    try {
      const response = await axios.get(`${EMPLOYEE_END_POINT}/validation`, {
        params: {
          email: email,
          number: number
        },
        withCredentials: true,
      });
      response.data.success ? toast.success(response?.data?.message) : toast.error(response?.data?.message);
      if (response?.data?.success) {
        return true;
      }
      return false;
    } catch (error) {
      console.log("Couldn't validate data.")
    }
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Header />
      <form className="w-[55vw] p-8 bg-white rounded-sm shadow-2xl border-light" onSubmit={handleSubmit}>
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
                name="courses"
                value="MCA"
                checked={formData.courses.includes('MCA')}
                onChange={handleChange}
                className="mr-2"
              /> MCA
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="courses"
                value="BCA"
                checked={formData.courses.includes('BCA')}
                onChange={handleChange}
                className="mr-2"
              /> BCA
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="courses"
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
          <label htmlFor="imgUpload" className="w-1/4 text-sm font-medium text-gray-700">New image</label>
          <div className='w-full'>
            <input
              type="file"
              id="imgUpload"
              name="image"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <p className='text-xs mt-1 text-red-500'>{error ? "Only PNG and JPEG formats are allowed.(under 1Mb)" : ""}</p>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;

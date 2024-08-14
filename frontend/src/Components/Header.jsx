import React, { useEffect, useState } from 'react';
import { RiAdminFill } from "react-icons/ri";
import { HiLogout } from "react-icons/hi";
import { IoCreateOutline } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin } from '../Redux/adminSlice';
import { ADMIN_END_POINT, EMPLOYEE_END_POINT } from '../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { setEmployees } from '../Redux/employeeSlice';
import { setSearchEmployee } from '../Redux/employeeSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector(store => store.employee);
  const [searchValue, setSearchValue] = useState("");
  console.log(employees);
  const navigate = useNavigate();
  const { admin } = useSelector(store => store.admin);
  const size = 18;
  useEffect(() => {
    const searchHandler = async () => {
      console.log(searchValue);
      try {
        const response = await axios.get(`${EMPLOYEE_END_POINT}/search_employee`, {
          params: {
              searchValue:searchValue,
          },
          withCredentials: true,
      });
        // dispatch(setSearchEmployee(response.data.employees));
        console.log(response?.data);
      } catch (error) {
        console.log(error);
        toast.error("Error occurred while searching.");
      }
    }
    if(searchValue !== ""){
      searchHandler();
    }
  }, [searchValue]);
  const logOutHandler = async () => {
    try {
      const response = await axios.get(`${ADMIN_END_POINT}/logout`);
      toast.success(response.data.message);
      navigate("/login");
      dispatch(setAdmin(null));
      dispatch(setEmployees([]));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <header className="bg-white shadow-md absolute top-0 left-0 w-[100%]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-2">
          <div className="flex space-x-6">
            <Link to="/" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600 flex items-center"><IoMdHome className='mr-2' size={22} /> Home</Link>
            <Link to="/all_employees" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600 flex items-center"><FaThList className='mr-2' size={16} /> Employee List</Link>
            <Link to="/create" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600 flex items-center"><IoCreateOutline className='mr-1' size={21} />Create Employee</Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-900 flex items-center"><RiAdminFill className='mr-2' size={18} /> {admin?.name}</span>
            <div className="">
              <button className="-mr-3 flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={() => logOutHandler()}>Log Out <HiLogout className='ml-2' size={16} /></button>
            </div>
          </div>
        </nav>
        <div className='h-[60px] text-end bg-slate-200 border-t-[1px] border-b-[1px] border-[#000] font-bold text-black flex items-center justify-end'>
          <p className='px-5'>Total Employees:{employees?.employees?.length}</p>
          <input onChange={(e) => setSearchValue(e.target.value)} type="text" id="menu-toggle" className=" outline-none rounded-sm border-[2px] border-[#000000cc] py-1 px-1 mr-10" />
        </div>

      </header>
    </>
  );
};

export default Header;
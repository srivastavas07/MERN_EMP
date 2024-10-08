import React, { useEffect, useState } from 'react';
import { RiAdminFill } from "react-icons/ri";
import { HiLogout } from "react-icons/hi";
import { IoCreateOutline } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin } from '../Redux/adminSlice';
import { ADMIN_END_POINT, EMPLOYEE_END_POINT } from '../utils/constants';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { setEmployees, setRefresh, setUpdateDetail } from '../Redux/employeeSlice';
import debounce from 'lodash.debounce';

const Header = () => {
  const currentLocation = window.location.pathname;
  const dispatch = useDispatch();
  const { employees } = useSelector(store => store.employee);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { admin } = useSelector(store => store.admin);
  const link = useParams();
  useEffect(() => {
    const searchHandler = debounce(async () => {
      try {
        const response = await axios.get(`${EMPLOYEE_END_POINT}/search_employee`, {
          params: {
            searchValue: searchValue,
          },
          withCredentials: true,
        });
        dispatch(setEmployees(response.data));
      } catch (error) {
        toast.error("Error occurred while searching.");
      }
    }, 400);
    searchHandler();
    return () => {
      searchHandler.cancel();
    };
  }, [searchValue]);

  const logOutHandler = async () => {
    try {
      const response = await axios.get(`${ADMIN_END_POINT}/logout`);
      toast.success(response.data.message);
      navigate("/login");
      dispatch(setAdmin(null));
      dispatch(setEmployees([]));
      dispatch(setRefresh(false));
      dispatch(setUpdateDetail({}));
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
        {currentLocation === "/all_employees" &&
          <div className='text-end bg-slate-200 py-5 border-t-[1px] border-b-[1px] border-[#000] font-bold text-black flex items-center justify-end'>
            <p className='px-5'>Total Employees:<span className='text-[#ff2a2a] mx-1'>{employees?.employees?.length}</span></p>
            <div className="input-container mr-10">
              <input value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} type="text" id="menu-toggle" placeholder="Search here.." className="input" />
            </div>
          </div>}


      </header>
    </>
  );
};

export default Header;
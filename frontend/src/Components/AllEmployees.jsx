import toast from 'react-hot-toast';
import { setRefresh } from '../Redux/employeeSlice';
import React from 'react';
import Header from './Header';
import useGetAllEmployees from '../Hooks/useGetAllEmployees';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { EMPLOYEE_END_POINT } from '../utils/constants';

const AllEmployees = () => {
  const dispatch = useDispatch();
  useGetAllEmployees();
  const { employees } = useSelector(store => store.employee);
  const users = employees.employees;
  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`${EMPLOYEE_END_POINT}/delete/${id}`, {
        withCredentials: true
      })
      toast.success(response.data.message);
      dispatch(setRefresh());
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Header />
      <div className="overflow-x-auto overflow-y-auto max-h-[90vh] text-left mx-auto mt-[10.5%] h-full w-[98%]">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-200">Unique Id</th>
              <th className="px-4 py-2 border-b border-gray-200">Image</th>
              <th className="px-4 py-2 border-b border-gray-200">Name</th>
              <th className="px-4 py-2 border-b border-gray-200">Email</th>
              <th className="px-4 py-2 border-b border-gray-200">Mobile No</th>
              <th className="px-4 py-2 border-b border-gray-200">Designation</th>
              <th className="px-4 py-2 border-b border-gray-200">Gender</th>
              <th className="px-4 py-2 border-b border-gray-200">Courses</th>
              <th className="px-4 py-2 border-b border-gray-200">Create Date</th>
              <th className="px-4 py-2 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {
              const date = new Date(user?.createdAt);
              const createDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
              const capiName = user.name.charAt(0).toUpperCase() + user.name.slice(1);
              return (
                <tr key={user?._id} className='bg-slate-100'>
                  <td className="px-4 py-2 border-b border-gray-200 truncate" title={user?._id}>{user?._id.slice(-6)}</td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {/* Placeholder for image */}
                    <img src={user?.image} alt="Avatar" className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">{capiName}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{user.email}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{user.mobile}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{user.designation}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{user.gender === "M"?"Male":"Female"}</td>
                  <td className="px-4 py-2 border-b border-gray-200 space-x-1">
                    {user.course.map((course, index) => (
                      <p className='inline-block' key={index}>{course}</p>
                    ))}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">{createDate}</td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    <Link to={`/update_employee/${user._id}`}><button className="text-blue-500 hover:underline mr-2">Edit</button></Link>
                    <button className="text-red-500 hover:underline" onClick={() => deleteEmployee(user._id)}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllEmployees;

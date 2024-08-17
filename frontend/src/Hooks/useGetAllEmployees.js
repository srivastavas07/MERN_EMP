import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { setEmployees } from "../Redux/employeeSlice";
import { EMPLOYEE_END_POINT } from "../utils/constants";

const useGetAllEmployees =async()=>{
    const {refresh} = useSelector(state=>state.employee);
    const dispatch = useDispatch();
    const getAllEmployees = async()=>{
        try{
            const response = await axios.get(`${EMPLOYEE_END_POINT}/get_employees`,{
                withCredentials:true,
            });
            dispatch(setEmployees(response.data))
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getAllEmployees();
    },[refresh])
}
export default useGetAllEmployees;
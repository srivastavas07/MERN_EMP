import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { EMPLOYEE_END_POINT } from "../utils/constants";
import { setUpdateDetail } from "../Redux/employeeSlice";

<<<<<<< HEAD
const useGetUpdateDetail = async (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getDetail = async () => {
            try {
                const response = await axios.get(`${EMPLOYEE_END_POINT}/get_employee/${id}`, {
                    withCredentials: true,
                });
                dispatch(setUpdateDetail(response?.data?.employee));
            } catch (error) {
                console.log(error)
            }
        }
        getDetail();
    }, [id])
=======
const useGetUpdateDetail = async(id)=>{
    const dispatch = useDispatch();
    const getDetail = async ()=>{
        try{
            const response = await axios.get(`${EMPLOYEE_END_POINT}/get_employee/${id}`,{
                withCredentials:true,
            });
            dispatch(setUpdateDetail(response.data.employee));
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getDetail();
    },[id])
>>>>>>> 75376c0603125492848baae54e1a0d92d9281d4d
}
export default useGetUpdateDetail;
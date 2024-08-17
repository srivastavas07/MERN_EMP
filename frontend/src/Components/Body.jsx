import {createBrowserRouter ,RouterProvider} from "react-router-dom";
import Home from "./Home";
import UpdateEmployee from "./UpdateEmployee";
import AllEmployees from "./AllEmployees";
import Form from "./Form";
import UserForm from "./UserForm";

const Body = () =>{
    const appRouter = createBrowserRouter([
        {
            path : "/",
            element : <Home/>
        },{
            path:'/login',
            element:<Form/>
        },
        {
            path:'/create',
            element:<UserForm/>
        },
        {
            path:'/all_employees',
            element:<Employees/>,
        },{
            path:'/update_employee/:id',
            element:<UpdateEmployee/>
        }
    ])
    return(
        <div className="w-full h-full">
            <RouterProvider router={appRouter}/>
        </div>
    )
}
function Employees(){
    return(
        <div>
            <AllEmployees/>
        </div>
    )
}
export default Body;
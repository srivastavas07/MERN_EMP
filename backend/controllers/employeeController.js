import {Employee} from "../models/employeeSchema.js";

export const create_employee = async (req, res) => {
    try {
        const {name, email, mobile, designation, gender, course, image} = req.body;
        console.log(req.body);
        const employee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            image
        });
        await employee.save();
        res.status(201).json({message: "Employee created successfully", employee, success:true});
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
};
export const get_employees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({message: "Employees fetched successfully", employees, sucess:true});
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
};
export const get_employee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        res.status(200).json({message: "Employee fetched successfully", employee , suceess:true});
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
};
export const update_employee = async (req, res) => {
    console.log(req.params.id, req.body);
    const {name, email, mobile, designation, gender, course, image} = req.body;
    if(!req.params.id){
        return res.status(400).json({message: "Employee id is required", success:false});
    }
    if(!name || !email || !mobile || !designation || !gender || !course || !image) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({message: "Employee updated successfully", employee ,success:true});
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
};
export const delete_employee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Employee deleted successfully", employee, success:true});
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
};

export const searchEmployee = async (req, res) => {
    try {
        const {searchValue} = req.query;
        console.log("this" + searchValue);
        const employees = await Employee.find({
            $or: [
                { name: { $regex: searchValue, $options: "i" } },
                { mobile: { $regex: searchValue, $options: "i" } },
                { email: { $regex: searchValue, $options: "i" } }
            ]
        });

        return res.status(200).json({
            employees:employees,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error agya", success: false });
    }
}

import { createSlice } from "@reduxjs/toolkit";
const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    updateDetail: {},
    refresh : false,
    employeeSearch: [],
  },
  reducers: {
    setEmployees(state, action) {
      state.employees = action.payload;
    },
    setUpdateDetail(state, action) {
      state.updateDetail = action.payload;
    },
    setRefresh(state) {
      state.refresh = !state.refresh;
    },
    setSearchEmployee(state, action) {
      state.employeeSearch = action.payload;
    },
  },
});
export const { setEmployees, setUpdateDetail, setRefresh, setSearchEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
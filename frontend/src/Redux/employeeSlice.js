import { createSlice } from "@reduxjs/toolkit";
const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    updateDetail: {},
    refresh : false,
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
  },
});
export const { setEmployees, setUpdateDetail, setRefresh, setSearchEmployee, setSearchValue } = employeeSlice.actions;
export default employeeSlice.reducer;
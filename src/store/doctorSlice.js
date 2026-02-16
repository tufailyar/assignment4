import {createSlice } from "@reduxjs/toolkit";


const doctorSlice=createSlice({
  name:"doctors",
  initialState:{
    doctorId:null,
    step:1
  },
  reducers:{
    setDoctorId:(state,action)=>{
      state.doctorId=action.payload;
    },
    nextStep:(state)=>{
      state.step=2
    },
    reset:(state)=>{
      state.doctorId=null;
      state.step=1;
    }
  }

});
export const {setDoctorId,nextStep,reset}=doctorSlice.actions;
export default doctorSlice.reducer;
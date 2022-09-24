
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    Data :{},
    messege :''
  } 

  const userSlice = createSlice({
  
    name: 'users',
    initialState,
    reducers: {
      setMes:(state, action)=>{
        state.messege = action.payload;

      },
    getData:(state , action ) =>{
      state.Data = action.payload 
    },
    removeData:(state) =>{
      state.Data = {};
    },
    addFavorite:(state, action)=>{
      state.Data.favorite.push(action.payload)
    },
    deleteFavorite:(state , action) =>{
     state.Data.favorite =  state.Data.favorite.filter(item => item !== action.payload)
    },
    editData :(state , action) =>{
      state.Data.name  = action.payload.name;
      state.Data.email = action.payload.email;
    },
    },
  })
  export default userSlice;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




export const login = createAsyncThunk(
    'user/login',
    async(data)=>{
        const response = await  fetch('http://localhost:3001/user/login', {
            method: 'POST', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
      
            });
        const loginResponse = await response.json();
        return loginResponse;
    }
  );

const initialState = {

    In:false,
    error:'',
    loading: 'idle',
  } 

  const loginSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      LogOut :(state) =>{
        state.In = false ;
        state.error = '';
        state.loading = 'idle';
        localStorage.removeItem('token');
      },
      setIn:(state) =>{
        state.In = true;
      },
      setInFalse:(state) =>{
        state.In = false;
      }
    },
    extraReducers: (builder) => {
      // Bắt đầu thực hiện action login (Promise pending)
      builder.addCase(login.pending, (state) => {
        // Bật trạng thái loading
        state.loading = 'pending';
      });
  
      // Khi thực hiện action login thành công (Promise fulfilled)
      builder.addCase(login.fulfilled, (state, action) => {
        // Tắt trạng thái loading, lưu thông tin user vào store
        state.loading ='succeeded';
        if(action.payload.error){
          state.error = action.payload;
        }else{
          state.In = true;
          state.error = '';
          localStorage.setItem('token',action.payload.token);
        }
      });
  
      // Khi thực hiện action login thất bại (Promise rejected)
      builder.addCase(login.rejected, (state) => {
        // Tắt trạng thái loading, lưu thông báo lỗi vào store
        state.loading = 'failed';
      });
        
      
    },
  })
  export default loginSlice;
import { createSlice} from "@reduxjs/toolkit";


const initialState ={
    video :[],
    loading:'idle'
}
const videoSlice = createSlice({
    name:'videoSlice',
    initialState,
    reducers :{
    getVideodata:(state, action) =>{
      state.video = action.payload
    },
    comment:(state ,action )=>{
      state.video[action.payload.index].comment.push(action.payload.x);
    },
    deleteCMT:(state , action)=>{
     state.video[action.payload.index].comment = state.video[action.payload.index].comment.filter(item => item.comment !== action.payload.x.comment)
    }
      },
})
export default videoSlice;
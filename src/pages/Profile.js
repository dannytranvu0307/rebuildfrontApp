import {useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../reducers/userData';
import{AiOutlineSetting} from 'react-icons/ai'

function Profile() {
 
  const dispatch = useDispatch();
  const userData = useSelector(state =>state.UserData)
  const [Edit, setEdit] = useState(true);
   const [EmailEdit, setEmailEdit] = useState();
   const [PasswordEdit , setPasswordEdit] = useState();
   const [PasswordConfirm  , setPasswordConfirm ] = useState();
   const [NameEdit , setNameEdit] = useState();
   const [warning  , setWarning] = useState(); 
   const [avatar , setAvatar] =useState();
   const token = localStorage.getItem('token');
   let haventImg = true;
   if(userData.Data.image){
    haventImg = false;
   }

  let img = 'https://www.i-music.com.hk/assets/images/no-avatar.png';
   // quá lười để dùng useReducer  
 

   const Data = {
    name:NameEdit,
    email:EmailEdit,
    password:PasswordEdit
   }
   if(userData.Data.image){
    img = userData.Data.image;
   }
  
   if(avatar){
    avatar.preview =  URL.createObjectURL(avatar)
    img = avatar.preview;
   }


   const handleSubmit = ()=>{
    if( PasswordEdit !== PasswordConfirm || PasswordEdit.length<6){
      setWarning('Please confirm your password , password must be longer than 6 ');
    }else if( !EmailEdit){
      setWarning('Please entry your email');   
    }else if(!NameEdit || NameEdit.length <6 || NameEdit.length>25){
      setWarning('Please confirm your name , name must be from 6-25 letter');
    }else{
       fetch('http://localhost:3001/user/editUser',{
        method: 'PUT', 
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'auth-token':token,
    } ,
    body: JSON.stringify(Data),
    })
    .then(res =>res.json())
    .then((data)=>{
    if(data.error){
      setWarning(data.error)
    }else{
      dispatch(userSlice.actions.editData(Data));
      setEdit(!Edit);
    }  
    })}}






 const handleUpAvatar = ()=>{
  const data = new FormData();
  data.append('avatar' ,avatar)
     console.log(data.get('avatar'))
        fetch('http://localhost:3001/user/upload-avatar-pic',{
          method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth-token':token,
      } ,
      body:data
      })
      .then(res =>res.json())
      .then((data)=>console.log(data))
      .catch((error)=>console.log(error))
    }





  return (
    <div className="h-screen w-3/5 mx-auto bg-gray-100 " 
    data-aos="fade-zoom-in"
    data-aos-easing="ease-in-back"
    data-aos-delay="100"
    data-aos-offset="0"
    >
        <button className="mx-auto text-gray-500 text-[30px] px-4 py-2 flex  transition duration-150 ease-in-out rounded-[5px] hover:scale-125"  onClick={()=>setEdit(!Edit)}>    <AiOutlineSetting  />  </button>
    <div className ='rounded-full mx-auto w-1/3 bg-white mb-10 ' > 
    <img  className = 'rounded-full mx-auto  p-2 ' src ={img}  />
      </div>
    
    { Edit?<div>
      <div className='text-center text-3xl font-bold tracking-tight text-gray-900 '>   
 {userData.Data.name} </div>
     <div className=' mx-auto w-1/3'>
     <p className=" font-normal text-gray-900 m-4   text-start  h-10">email   :  {userData.Data.email} </p>
     <p className=" font-normal text-gray-900 m-4   text-start h-10">password : *************** </p>
     </div>
     </div>:<div>
    {haventImg&&<div className='m-5'>
      <p className='text-center font-bold m-3 '>Updata avatar</p>
   <input id ='cc' type="file" className='block mx-auto'  onChange ={e=>{
    setAvatar(e.target.files[0])}}/>
   <button className='block mx-auto p-2 m-3 text-white hover:bg-blue-800 rounded-md bg-blue-700' onClick={handleUpAvatar}> Upload avatar</button>
      </div>}
      


     





      <div className='p-10'>
      <div className="relative z-0 mb-6 w-full group">
      <div  name="warning" id="warning" className="py-2.5 px-0 w-full text-sm text-red-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  text-[30px] font-bold" > {warning}</div>
      
  </div>
  <div className="relative z-0 mb-6 w-full group">
      <input  value = {EmailEdit} onChange={e=>{setEmailEdit(e.target.value)}} type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none d focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
      <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div className="relative z-0 mb-6 w-full group">
      <input value={PasswordEdit} onChange={e=>{setPasswordEdit(e.target.value)}} type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
      <label  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  <div className="relative z-0 mb-6 w-full group">
      <input value ={PasswordConfirm} onChange={e=>{setPasswordConfirm(e.target.value)}} type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
      <label  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
  </div>

    <div className="relative z-0 mb-6 w-full group">
        <input value={NameEdit } onChange={e=>{setNameEdit(e.target.value)}} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">name</label>
    </div>
   


  <button onClick ={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
</div>

























     </div>

     
    }



    </div>
  );
}

export default Profile;
  
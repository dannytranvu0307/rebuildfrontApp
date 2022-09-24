import {BsSearch } from "react-icons/bs";
import { GoListUnordered } from "react-icons/go";
import{Link} from 'react-router-dom';
import {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  loginSlice from '../reducers/login'
import videoSlice from '../reducers/video'
import userSlice from "../reducers/userData";
import {useNavigate} from 'react-router-dom'
function Nav() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const user= useSelector(state =>state.login);
  const userData = useSelector(state =>state.UserData)
  const [drop, setDrop] = useState(false);
  const token = localStorage.getItem('token');
  let img = 'https://www.i-music.com.hk/assets/images/no-avatar.png';
  if(userData.Data.image){
    img = userData.Data.image;
   }
  if(token !== null){
    dispatch(loginSlice.actions.setIn());
  }
 useEffect(()=>{ 
    fetch('http://localhost:3001/show')
    .then((response) => response.json())
    .then((data) => dispatch(videoSlice.actions.getVideodata(data)));
 },[])


 useEffect(()=>{ 
  token &&fetch('http://localhost:3001/user/getUserbyToken', {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'auth-token':token,
    },
    })
    .then(res =>res.json())
    .then((data)=>{
     dispatch(userSlice.actions.getData(data));
    }) 
},[token])
 
  window.addEventListener('resize', function(){
    var x = window.outerWidth;
    if(x>640){ 
      setDrop(false)
    }
  })
   const handleDropmenu = ()=>{
        setDrop(!drop)
     }

 
  
  return (
   
    <div className="absolute w-full z-30  bg-gradient-to-r from-indigo-800 via-purple-500 to-purple-500 text-white "  data-aos="fade-up">
    <div className=" flex max-w-6xl mx-auto px-4 sm:px-6">

         <div className="mx-10 py-5">
            <Link className="block" to ='' ><svg className="w-12 h-12 hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> </Link>      
          </div>

          <div className = 'flex grow justify-end flex-wrap items-center gap-3'> <BsSearch /><input  className ='text-black rounded-[10px] w-[150px] h-10 md:w-[300px] lg:w-[500px] '  placeholder='   Search your song' /> </div>
       <nav className="hidden md:flex md:grow py-5">
               {!user.In &&<ul className="flex grow justify-end flex-wrap items-center gap-4">
                    <li>
                        <Link className="text-gray-300  bg-indigo-700 hover:bg-violet-300 px-4 py-2 flex items-center transition duration-150 ease-in-out rounded-[5px] hover:scale-125" to="/sign-up">Sign-Up</Link>
                    </li>
                    <li>
                        <Link className="text-gray-300 bg-indigo-700 hover:bg-violet-300 px-4 py-2 flex items-center transition duration-150 ease-in-out rounded-[5px] hover:scale-125" to="/login">Sign-In</Link>
                   </li>

                   
                  </ul>} 

                  {user.In&&<ul className="flex grow justify-end flex-wrap items-center gap-4">
                    <li>
                        <Link className="text-gray-300 hover:bg-violet-900 px-4 py-2 flex items-center transition duration-150 ease-in-out rounded-lg font-bold" to ='/profile'> 
                        <img  src ={img} className ='h-10 mx-2 rounded-full'/>
                        {userData.Data.name}</Link>
                    </li>
                    <li>
                        <Link className="text-gray-300 hover:bg-violet-900 px-4 py-2 flex items-center transition duration-150 ease-in-out rounded-lg font-bold" to="/Favorite">Favorite</Link>
                    </li>
                    <li>
                        <button className="text-gray-300 bg-indigo-700 hover:bg-blue-400 px-4 py-2 flex items-center transition duration-150 ease-in-out rounded-[5px] hover:scale-125" 
                        onClick={()=>{
                          dispatch(loginSlice.actions.LogOut())
                          Navigate('/')
                        }}>
                          Log out</button>
                    </li>
                  </ul>}
        </nav>
        <div  className ='sm:flex md:hidden flex items-center ml-5 '  > <GoListUnordered onClick={handleDropmenu} />  </div>
    </div>
   {drop&& <div data-aos="fade-down">
               { !user.In&& <div> 
                  <Link onClick={handleDropmenu}  className=" my-4 text-[20px] flex justify-center text-gray-300 w-full text-center hover:bg-blue-400 px-4 py-2 flex items-center transition duration-150 ease-in-out rounded-[5px] hover:scale-75" to="/sign-up">Sign-Up</Link>
                   <Link  onClick={handleDropmenu}  className=" my-4 text-[20px] flex justify-center text-gray-300 w-full text-center hover:bg-blue-400 px-4 py-2 flex items-center transition duration-150 ease-in-out rounded-[5px] hover:scale-75" to="/login">Sign-In</Link>
                   </div>}
                   {user.In&&
                   <div>
                     <Link onClick={handleDropmenu}  className=" my-4 text-[20px] flex justify-center text-gray-300 w-full text-center hover:bg-blue-400 px-4 py-2 flex items-center transition duration-150 ease-in-out rounded-[5px] hover:scale-75"to ='/profile'> {userData.Data.name}</Link>
                     <Link onClick={handleDropmenu}  className=" my-4 text-[20px] flex justify-center text-gray-300 w-full text-center hover:bg-blue-400 px-4 py-2 flex items-center transition duration-150 ease-in-out rounded-[5px] hover:scale-75" to="/Favorite">Favorite</Link>
            
                      <div onClick={handleDropmenu} >  <button className="my-4 text-[20px] flex justify-center text-gray-300 w-full text-center hover:bg-blue-400 px-4 py-2 flex items-center transition duration-150 ease-in-out rounded-[5px] hover:scale-75" 
                         onClick={()=>{
                          dispatch(loginSlice.actions.LogOut());
                          Navigate('/')
                        }}
                       >
                          Log out</button> </div>
                    
                   </div>

                   }
   </div>}
  </div>
  );
}

export default Nav;

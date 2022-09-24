
import{Link} from 'react-router-dom';
import { useReducer} from 'react';
import { useDispatch } from 'react-redux';
import userSlice from '../reducers/userData';
import { useNavigate } from 'react-router-dom';
const initialState = {
    Email :'' ,
    password:'' ,
    pwConfirm:'',
    warning :''
  }
  const SET_EMAIL = payload =>{
    return  {
    type:'SET_EMAIL',
    payload}
  };
  const SET_PW = payload =>{
    return  {
    type:'SET_PW',
    payload}
  }
  const SET_PWconfirm = payload =>{
    return  {
    type:'SET_PWconfirm',
    payload}
  }
  const SET_NAME = payload =>{
    return  {
    type:'SET_NAME',
    payload}
  }
  const SET_WARNING = payload =>{
    return  {
    type:'SET_WARNING',
    payload}
  }

  const reducer = (state, action) =>{
    switch(action.type){
        case 'SET_EMAIL':
            return {
            ...state,
              Email : action.payload
            }
        case 'SET_PW':
            return {
             ...state,
              password : action.payload
                }
        case 'SET_PWconfirm':
            return {
            ...state,
            pwConfirm: action.payload
            }
        case 'SET_NAME':
            return {
            ...state,
             name : action.payload
            }
        case 'SET_WARNING':
            return {
            ...state,
             warning : action.payload
            }
        default:
            throw new Error('invalid action')
    }
  }
  
function SignUP() {

    const navigate = useNavigate();  
    const dispatcher= useDispatch();
   
  const [state, dispatch] = useReducer(reducer, initialState);

   const data = {
        name:state.name,
        email:state.Email,
        password:state.password ,  
} 



 const handleSubmit = () =>{
    if( state.password!== state.pwConfirm　|| state.password.length <6){
      dispatch (SET_WARNING('Please confirm your password , password must have more than 6 letter')) 

    }else if(state.name.length <6 || state.name.length > 25){
        dispatch (SET_WARNING("Name's length at lease must be 6 letter and less than 25")) 

    }else{
        fetch('http://localhost:3001/user/register', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
             body: JSON.stringify(data)
            })
            .then(res =>res.json())
            .then((data)=>{
                if(data.error){
                    dispatch (SET_WARNING(data.error)) 
                }else{
                    dispatcher(userSlice.actions.setMes("Welcome " + state.name +" please login to enjoy "));
                    navigate('/login')
                }
            })
    }
 }
  return (
    <div className="" data-aos="fade-up">
      <section className="bg-gray-50 ">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Create new account
              </h1>
              <div className="space-y-4 md:space-y-6" >
                 <div>
                      <div className=" text-red-500 font-bold  text-center w-full p-2.5  text-[30px]" > {state.warning} </div>
                  </div>
                 <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                      <input type="text"  onChange={e=>{ dispatch(SET_NAME(e.target.value)) }} value ={ state.name}
                      name="name"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " placeholder="abcxyz"  />
                  </div>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input type="email" onChange={e=>{dispatch(SET_EMAIL(e.target.value))}} value ={state.Email}
                       name="email"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " placeholder="name@company.com"  />
                  </div>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" name="password" onChange={e=>{ dispatch(SET_PW(e.target.value))}} value ={state.password}
                        placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="password"  onChange={e=>{dispatch(SET_PWconfirm(e.target.value))}} value ={ state.pwConfirm}
                      name="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">


                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "  checked/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label  className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" >Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button  onClick={handleSubmit} className="w-full text-white bg-gray-400 hover:scale-90 duration-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</button>
                  <p className="text-sm font-light text-gray-500 ">
                      Already have an account? <Link className="font-medium text-primary-600 hover:underline " to ='/login'>Login here</Link>
                  </p>
              </div>
          </div>
      </div>
  </div>
</section>
    </div>
  );
}

export default SignUP;

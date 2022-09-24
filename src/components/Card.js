import { useNavigate } from 'react-router-dom';

function Card(props) {
 
   
  const navigate = useNavigate();
    return (
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:scale-110 duration-300" 
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1000">
       
            <img className="rounded-t-lg" src={props.videodata.img} alt=""   onClick={ ()=>{navigate(`/video/${props.videodata._id}`)}}  />
      
        <div className="p-5">
          
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white h-20">{props.videodata.name}</h5>
            
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 h-20 mb-10">{props.videodata.discription}</p>
            <div className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-violet-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  onClick={ ()=>{navigate(`/video/${props.videodata._id}`)}} >
                Watch now
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            
            </div>
        </div>
    </div>
    );
  }
  
  export default Card;
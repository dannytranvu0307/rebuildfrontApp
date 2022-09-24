
import {useSelector  } from 'react-redux';
import Card from '../components/Card'
function Favorite() {
const userData = useSelector(state=>state.UserData);
const  videoData = useSelector(state=>state.video);


const list = videoData.video.filter((video)=>{ 
  for (var i  =  0 ; i <= userData.Data.favorite.length ; i++){
   if( video._id === userData.Data.favorite[i]  ){
     return true;
   }}})
   
if(list.length>0){
  return (
    <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-[300px] h-screen" data-aos="fade-up">
        {list.map((post)=>(
            <div className = ' mx-auto ' key ={post._id}  data-aos="fade-up">
            <Card  videodata= {post}  />
      
          </div>
        ))}
    </div>
  );
}else{
  return (<div className='font-bold text-center h-screen p-20 text-[30px]'>
    Your favorite list is empty , please add song first
  </div>)
}
  
  }
  


export default Favorite;


import { AiOutlinePlus} from  'react-icons/ai';
import{FcLike} from   'react-icons/fc';
import {MdDelete} from 'react-icons/md'
import{ useParams } from 'react-router-dom';
import {useSelector , useDispatch} from 'react-redux'
import videoSlice from '../reducers/video';
import {useState, useEffect} from 'react';
import userSlice from '../reducers/userData';
function Video() {
  const params = useParams(); 
  const [comment , setComment ] = useState('')
  const dispatch = useDispatch();
  const video = useSelector(state => state.video);
  const user = useSelector(state=>state.login);
  const userData = useSelector(state =>state.UserData)
   const token = localStorage.getItem('token');
 const [like , setLike] = useState(false);
  


useEffect(()=>{
  if(user.In===true){
    if(userData.Data.favorite){
      for(let j = 0 ; j <= userData.Data.favorite.length ;j++){
        if(params.id === userData.Data.favorite[j] ){
            setLike(!like);
        }
      }
    }
  }
},[video])
  



  if(video.video.length>0){

    for(let i = 0 ; i <= video.video.length ; i++){

      if(params.id === video.video[i]._id){

        const handleSubmit = ()=>{
          dispatch(videoSlice.actions.comment({index:i , x:{ name:userData.Data.name , image :userData.Data.image , comment : comment }}))
         
          fetch('http://localhost:3001/user/comment', {
            method: 'PATCH', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'auth-token':token,
            },
             body: JSON.stringify({ id: video.video[i]._id , comment : comment })
            })
            .then(response =>response.json())
            .then(data =>{
              console.log(data)
              setComment('')
            })
       }



       const handleDelete =(cmt)=>{
        dispatch(videoSlice.actions.deleteCMT({index:i, x:{ comment : cmt }}))
        fetch('http://localhost:3001/user/delete-comment', {
          method: 'PATCH', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'auth-token':token,
          },
           body: JSON.stringify({ id:video.video[i]._id , comment : cmt })
          })
          .then(response =>response.json())
          .then(data =>{
      
            console.log(data)
          })
    
    }

    const handleAddFavorite =()=>{

      fetch('http://localhost:3001/addfavorite', {
        method: 'PATCH', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'auth-token':token
        },
        body: JSON.stringify({videoid:video.video[i]._id})
        })
        .then(response =>response.json())
        .then(data =>{
          setLike(!like)
          dispatch(userSlice.actions.addFavorite(video.video[i]._id))
        })
    }
    const handleRemove=()=>{
     
    
      fetch('http://localhost:3001/deletefavorite', {
      method: 'PATCH', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth-token':token
      },
      body: JSON.stringify({videoid:video.video[i]._id})
      })
      .then(response =>response.json())
      .then(data =>{
        setLike(!like)
        dispatch(userSlice.actions.deleteFavorite(video.video[i]._id));
      })
      
      }
    
    
          
 return (
          <div data-aos="fade-up" className = 'grid cols-1'>
             <div  data-aos="zoom-out-down"
              data-aos-easing="linear"
            data-aos-duration="1000"> <iframe
                    className='w-full h-[300px] md:w-3/4 md:mx-auto md:h-[500px] lg:h-[700px] rounded-lg'
                    src={`https://www.youtube.com/embed/${video.video[i].videoid}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                    />
               </div>
            {user.In&&<div className='w-full mx-auto flex gap-10 justify-end p-10 text-[50px] bg-gray-100  md:w-3/4 mx-auto '> 

        {   like? <FcLike className = 'transition duration-100 hover:scale-150 ' onClick = {handleRemove} /> : <AiOutlinePlus className = 'transition duration-100 hover:scale-150'  onClick = {handleAddFavorite} />}
              
              </div> }
              {user.In&&<div className='w-full mx-auto p-10   bg-gray-100  md:w-3/4  ' data-aos="fade-up" >
                <input  className ='text-black w-full h-12 border-b-2 border-gray-400 p-3'  placeholder='    write comment...'  onChange={e=>setComment(e.target.value)}
                     value={comment} />
                    {comment&& <button className='w-3/4 bg-gray-400 mx-auto block mt-5 h-10 rounded-full hover:scale-125 duration-300' onClick={()=>handleSubmit()} >Post</button>}
                </div>}
              <div className='w-full mx-auto  p-10  bg-gray-100  md:w-3/4 mx-auto pb-[100px]  '> 

                      {
                        video.video[i].comment.map((cmt)=>(
                          <div key = {cmt.index} className = 'flex gap-7 bg-white p-5 m-2' data-aos="fade-up" >
                            <div className='flex-none w-14 h-20 '> {cmt.image ===null ?<img className=' rounded-full' src ='https://gamemic.com/_nuxt/img/defaultavatar.522560c.png'  alt='non-avatar'/>:<img  className='w-100% rounded-full'  src={cmt.image} /> }</div>
                            <div className=' grow h-20 pl-3'>
                            <h5 className=" text-2xl font-bold tracking-tight text-gray-900 ">{cmt.name}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 h-20 mb-10 flex">{cmt.comment} </p>
                            </div>
                            <div className='flex-none w-14 h-20 flex items-center text-[30px] hover:scale-125 duration-300'>  <MdDelete onClick={()=>handleDelete(cmt.comment)}/></div>
                          </div>
                        ))
                      }
              
              </div> 
          
          </div>
        );
  
      }
  }
}

}

export default Video;

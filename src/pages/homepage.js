import Card from '../components/Card'
import {useSelector} from 'react-redux';
function Homepage() {
  const video = useSelector(state =>state.video);

  return (
    <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 
         { video.video.map((post) => (
        <div className = ' mx-auto ' key ={post._id}  >
          <Card  videodata= {post}  />
          
        </div>
        
      ))}
    </div>
  );
}

export default Homepage;

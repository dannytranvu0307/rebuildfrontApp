import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Aos from "aos";
import 'aos/dist/aos.css';
import {useEffect} from 'react';
import Nav from './components/NavSideBar';
import Favorite from './pages/favorite';
import HomePage from './pages/homepage';
import Login from './pages/login';
import LoginAsAdmin from './pages/LoginAsAdmin';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Video from './pages/Video'
import Footer from './components/Footer'
function App() {
  useEffect(function () {
    Aos.init({ duration: 1200 });
  }, []);
  return (
   


    <Router >     
       <Nav />
    <div className = 'py-[100px]  bg-gray-200'>
     <Routes>
     <Route path='' element={<HomePage />} />
     <Route path='/login' element={<Login />} />
     <Route path='/loginAdmin' element={<LoginAsAdmin />} />
     <Route path='/favorite' element={<Favorite />} />
     <Route path='/profile' element={<Profile />} />
     <Route path='/sign-up' element={<SignUp />} />
     <Route path="/video/:id" element= {<Video />} />
     </Routes>
   </div>
    <Footer />
   </Router>
 
  );
}

export default App;


import './App.css';
import React,{useEffect}  from 'react';
// import {Routes,Route, Redirect,useNavigate} from "react-router-dom"
import Home from './componet/Home';
import Navbar from './componet/Navbar';
import 'toastr/build/toastr.css';
import Signup from './componet/Signup';
import {Switch,Route, Redirect,} from "react-router-dom"
import Login from './componet/Login';
import PrivetRout from './componet/PrivetRout';

// import { route } from '../../backend/Module/User';



//  const token = JSON.stringify(localStorage.getItem("token"));




function App() {
  // const navigator=useNavigate()
  let token=localStorage.getItem("token") ;
  useEffect(()=>{},[token])

  // const token =localStorage.getItem("token")
  // useEffect(()=>{  {token&&token==="" ? <Route  path="/home" exact element={<Home/>}/>:<Route exact element={<Login />} path="/"/>}},[])
  return (
   <>
   <Navbar />
   <Switch> 
     {/* <Route path="/login" element={<Routlogin/>}/> */}
  <Route  path="/signup" exact component={Signup} id="signup1"/>
    {/* <Route  path="/signup" exact element={<Signup/>} id="signup1"/> */}
     {/* <Route exact path="/" element={<Login/>}/> */}
     {/* <Route path="/" element={<Home/>} exact/> */}
     <Route exact component={Login } path="/" id="login2"/>
   </Switch>
   <PrivetRout 
          path='/home'
          Component={Home} 
     />
   </>
  );
}

export default App;

import React,{useEffect} from "react";
import Login from './Login';
import Home from "./Home";
import {Switch,Route,Redirect,withRouter} from "react-router-dom"

const PrivetRout = ({path,Component,history}) =>{
  // console.log(token);
  let token =localStorage.getItem("token");
    useEffect(()=>{ },[token])
  
    return(
      <>
      
      <Switch>
    {token&&token!=="" ? <Route  
        path={path}
        component={Component}
        exact
        />
        :
        // <Route element={<Navigate replace to="/" state={{ from: <Login/> }}/>} />
        <Redirect push to="/" />
        // history.push("/")
        // <Route exact element={<Login />} path="/" id="login2"/>
        }
     {/* {token&&token!=="" ? <Route  path="/home" exact element={<Home/>} id="home4"/>:<Route exact element={<Login />} path="/" id="login2"/>} */}

      </Switch>
    
      </>
    )
  }
  
  export default withRouter(PrivetRout)
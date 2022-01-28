import React,{useEffect} from 'react'
import { Link,withRouter } from "react-router-dom"
// import Home from './Home'

 function Navbar({history}) {
//  const navigator=useNavigate()
 const token =localStorage.getItem("token")

 const onLogout=()=>{
     localStorage.setItem("token","");
    //  navigator('/')
    history.push("/")
//    navigator(props.Component)
 }

//  useEffect(() => {
  
     
//  }, [onLogout])
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/home">Navbar</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to="/home">Home</Link>
                            </li>
                        </ul>
                    </div>

                    <div className='d-flex'>{token==="" ? <button type="button" class="btn btn-primary" onClick={()=>onLogout()}>Login!</button> : <button type="button" class="btn btn-primary" onClick={()=>onLogout()}>Logout</button>}</div>
                </div>
            </nav>
        </div>
    )
}

export default withRouter(Navbar)
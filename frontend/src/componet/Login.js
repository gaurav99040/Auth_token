import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import toastr from 'toastr'
import axios from 'axios'
import {withRouter} from "react-router-dom"
import Home from './Home'

 function Login({history}) {
    // const navigator=useNavigate()

    const [obj, setobj] = useState({email:"",password:""})

const onHandale=(e)=>{
setobj({...obj,[e.target.name]:e.target.value})
}

// useEffect(()=>{localStorage.setItem("token","")},[])


const onLogin=async()=>{
    await axios.post("http://localhost:5000/loginuser",obj).then((res)=>{
        if(res.status==200){
            console.log("asdasf--->",res)
            toastr.success("successfull Login user")
            localStorage.setItem("token",res.data.token) 
            // navigator("/home")
            history.push("/home")
            // {<Navigate to="/home" state={{ from: <Home/> }}/>}
            // console.log("login.......>",props)
        }
        else if(res.status==401){
            toastr.warning("Invalid Password and username")
        }
    })
}
    return (
        <div id='login_main'>
        <div className='login_componet'>
            <div className='login_container'>
                <div className='container'>
                <div className="mb-3" id='login_mail'>
                    <label for="email" className="form-label">Email </label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" onChange={onHandale} value={obj.email}/>
                </div>
                <div className="mb-3" id='login_password'>
                    <label for="password" className="form-label">Password </label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="abc123" onChange={onHandale} value={obj.password} />
                </div>
                <div className="mb-3">
                <button type="button" className="btn btn-success" onClick={onLogin}>Login</button>
                </div>
                <div className="mb-3" id='login_signup'>
                    <Link to="/signup">I won to signin</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default withRouter(Login)
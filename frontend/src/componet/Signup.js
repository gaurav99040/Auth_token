import React,{useState,useEffect} from 'react'
import {Link,withRouter} from "react-router-dom"
import axios from "axios"
import toastr from 'toastr'


 function Signup({history}) {
const [obj, setobj] = useState({email:"",password:"",cpassword:""})
// const navigator=useNavigate()
const onHandale=(e)=>{
setobj({...obj,[e.target.name]:e.target.value})
}

// useEffect(()=>{localStorage.setItem("token","")},[])
const onSignup=async()=>{
    localStorage.setItem("token","")
 
    const signup=await axios.post("http://localhost:5000/signuser",obj).catch((e)=>{
        toastr.error("user detail alredy exist")
    })
    console.log(signup);

    if(signup.status==200){
        localStorage.setItem("token",signup.data.token) 
        toastr.success("successfull signin user")
        setobj({email:"",password:"",cpassword:""})
// navigator("/home")
history.push('/home')
    }
    else if(signup.status==401){
        toastr.warning("password not match")
    }
}

    return (
        <div>
            <div className='login_componet'>
                <div className='login_container'>
                    <div className='container'>
                    <div className="mb-3">
                        <label for="email" className="form-label">Email </label>
                        <input type="email" className="form-control" id="email" name='email' placeholder="name@example.com" onChange={onHandale} value={obj.email}/>
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password </label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="abc123" onChange={onHandale} value={obj.password} />
                    </div>
                    <div className="mb-3">
                        <label for="cpassword" className="form-label">cpassword </label>
                        <input type="password" className="form-control" id="cpassword" placeholder="abc123" name="cpassword" onChange={onHandale} value={obj.cpassword} />
                    </div>

                    <div className="mb-3">
                    <button type="button" className="btn btn-success" onClick={onSignup}>I won to signup</button>
                    </div>

                    
                    <div className="mb-3">
                    <Link to="/">I Alrady login</Link>
                </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Signup)
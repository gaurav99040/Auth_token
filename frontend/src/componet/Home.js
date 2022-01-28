import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toastr from 'toastr'
import { withRouter } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

function Home({history}) {
    // const todolist = await axios.get("http://localhost:5000/todolist")
    // const navigetor=useNavigate()
    const [strid, setstrid] = useState("")
    
    
    const [todo, settodo] = useState([])
    
    const [data,setdata] =useState({title:"",discription:""})
    const token = localStorage.getItem("token")

    const onHandale=(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
    }
    // const getList = async () => {
    //     const todolist = await axios.get("http://localhost:5000/todolist")
    //     settodo(todolist.data)
    //     console.log("list ",todolist)
    // }
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTY0MTU1NzU2NCwiZXhwIjoxNjQxNTY0NzY0fQ.SIqoShDeoosRUu-EcybkEo6LZ2-JzGq-NguBe6OdEGQ"
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTY0MTkwMDQwMywiZXhwIjoxNjQxOTA3NjAzfQ.2mJB5edFIqlUsFmt0BdJSP8ieBLCbkiQ05s9Z2WbYHQ
    console.log("token------>", token)
    const getList = async () => {
        await axios({
            method: 'get',
            url: 'http://localhost:5000/todolist',
            headers: { "token": `${token}` }
        }).then((res) => {
            console.log("result", res)
            settodo(res.data)
        })
    }

    const addTodo = async () => {
     console.log("strid--->",strid);

        if(strid===""){
        await axios({
            method: 'post',
            url: 'http://localhost:5000/addtodo',
            headers: { "token": `${token}` },
            data:{title:data.title,discription:data.discription}
        }).then((res) => {
            console.log("kdfjfd----->",res)
            if(res.status===200){
                toastr.success("successfull add todo")
            getList()
            setdata({title:"",discription:""})
            }
        })
    }
    else{
    //     const obj = todo.filter((item) => (item._id !== id))

    //     obj.map((item)=>(
    //         item.title=data.title;
    // item.discription=data.discription
    //     ))
        // tododata.title=data.title;
        // tododata.discription
    await axios.put(`http://localhost:5000/updatetodo/${strid}`,data).then((res)=>{
        if(res.status===200){
            toastr.success("successfull update todo")
            getList()
            setdata({title:"",discription:""})
            setstrid("")
        }
    })
    }

    }

    useEffect(() => {debugger
        // if(!token&&!token){
        //     history.push('/')
        // }else{
        getList()
        // }
    }, [])

    // useEffect(() => {debugger
    //     if(!token&&!token){
    //         history.push('/')
    //     }else{
    //     getList()
    //     }
    // }, [history])

    const onDeletes = async (id) => {
        const tododata = todo.filter((item) => (item._id !== id))
        const deletetodo = await axios.delete(`http://localhost:5000/deletetodo/${id}`, tododata)
        if (deletetodo) {
            toastr.success("delete successfull")
            getList()    
        }
    }

 const onUpdate=(id)=>{
     const obj=todo.filter((item)=>(item._id===id));
     obj.map((list)=>(setdata({title:list.title,discription:list.discription})))
    //  console.log("upadtestrid--->",);
      setstrid(id)
 }

    return (
        <div>
            {/* {console.log("you are authenticat")}
            <h1>you are authentication porson</h1> */}
            <div className='container'>
                <div className='input_task'>
                    <div className="mb-3">
                        <label for="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" placeholder="task..." name="title" onChange={(e)=>{onHandale(e)}} value={data.title}/>
                    </div>
                    <div className="mb-3">
                        <label for="discription" className="form-label">Example textarea</label>
                        <textarea className="form-control" id="discription" rows="5" name="discription" onChange={(e)=>{onHandale(e)}} value={data.discription}></textarea>
                    </div>

                    <button type="button" className="btn btn-success" onClick={()=>{addTodo()}}>Add Todo</button>
                </div>


                <div style={{"flexWrap":"wrap"}} className="mt-3">
                <div className="row row-cols-4">
                    {
                        todo && todo.map((item, id) => (
                            <div className="col" style={{"padding":"10px"}} key={id}>
                            <div className="card" style={{ "width": "18rem", "display": "flex"}} >
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.discription}</p>
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <i className="fas fa-trash-alt" style={{ "margin": "10px" }} onClick={() => { onDeletes(item._id) }}></i>
                                    <i className="fas fa-pen-alt" style={{ "margin": "10px" }} onClick={() => { onUpdate(item._id) }}></i>
                                </div>
                            </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Home) 
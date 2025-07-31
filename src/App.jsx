import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [user, setUser] = useState([])

  const [id, setId] = useState(0);
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const [modal,setModal]=useState(false)
  const [edit,setEdit]=useState({});
// https://api-node-payment-23la.onrender.com
  useEffect(() => {
    axios.get("https://api-node-payment-23la.onrender.com/user/getdata")
      // .then((res) => res.json())
      .then(res => setUser(res.data.result))
      .catch((err) => setError(err.message))
  }, [id , modal])

  const addData = (e) => {
    e.preventDefault();
    var newData = {
      id: Number(id),
      name: name,
      age: Number(age),
      email: email,
      password: pass
    }

    axios.post("https://api-node-payment-23la.onrender.com/user/postdata", newData)
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.message))
    setId("")
    setName("")
    setEmail("")
    setAge("")
    setPass("")
  
    
  }
 const deleteData = (e) => {//string  
  axios.delete(`https://api-node-payment-23la.onrender.com/user/delete/${e}`)//
    .then((res) => {
      alert(res.data.message);
      setUser(prev => prev.filter(ele => ele.id !== e)); // remove from UI
    })
    .catch(err => alert(err.message));
}

  const editClicked=(e)=>{
    setModal(true)
    setEdit(e)    
  }

  const updateData=(e)=>{
      e.preventDefault();
      console.log(edit);
      axios.put(`https://api-node-payment-23la.onrender.com/user/update/${edit.id}`,edit)
      .then((res)=>{
        alert(res.data.message);
        setModal(false);
      })
      .catch(err=>alert(err.message))
      
  }
  return (
    <>
      <div>
        <form onSubmit={addData} style={{ border: "1px solid red", borderRadius: "10px", padding: "30px 60px", marginBottom: "50px" }}>
          <h1>Welcome</h1>
          <label>ID</label><br />
          <input type="number" value={id} onChange={(e) => setId(e.target.value)} placeholder='Enter a number' /><br />
          <label>Name</label><br />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter a text' /><br />
          <label>Age</label><br />
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder='Enter a Age' /><br />
          <label>Email</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter a Email' /><br />
          <label>Password</label><br />
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder='Enter a password' /><br />
          <input type="submit" value="Submit" />
        </form>

        <table border={"1"} >
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((ele, i) => (
              <tr key={i}>
                <td style={{ padding: "5px" }}>{ele.id}</td>
                <td style={{ padding: "5px" }}>{ele.name}</td>
                <td style={{ padding: "5px" }}>{ele.age}</td>
                <td style={{ padding: "5px" }}>{ele.email}</td>
                <td style={{ padding: "5px" }}>
                  <button style={{ marginRight: "10px" }} onClick={()=>editClicked(ele)}>Edit</button>
                  <button onClick={() => deleteData(ele.id)}>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* edit modal */}
        {modal && (
          <div className="modal">
          <div className="modal-content">
            <h2>Edit User</h2>
            <form style={{gap:"0px"}} >
              <label>ID</label><br />
              <input type="number" value={edit.id} onChange={(e)=>setEdit({...edit,id:e.target.value})} /><br />
              <label>Name</label><br />
              <input type="text" value={edit.name} onChange={(e)=>setEdit({...edit,name:e.target.value})} /><br />
              <label>Age</label><br />
              <input type="number" value={edit.age} onChange={(e)=>setEdit({...edit,age:e.target.value})}/><br />
              <label>Email</label><br />
              <input type="email" value={edit.email} onChange={(e)=>setEdit({...edit,email:e.target.value})} /><br />
              <label>Password</label><br />
              <input type="password" value={edit.password} onChange={(e)=>setEdit({...edit,password:e.target.value})} /><br />
              <button onClick={updateData} type="submit" style={{color:"red"}}>Update</button>
            </form>
          </div>
        </div>
        )}

      </div>
    </>
  )
}

export default App

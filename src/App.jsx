
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";


function App() {
  const [form, setForm] = useState({ id:Number(""), name: "", age:Number(""), email: "", password: "" });
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const[edit,setEdit]=useState({});

  const fetchUsers = () => {
    axios.get("https://api-node-payment-23la.onrender.com/user/getdata")
      .then((res) => setUsers(res.data.result))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, [editMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     
      // Add new user
      axios.post("https://api-node-payment-23la.onrender.com/user/postdata", form)
        .then(() => {
          fetchUsers();
          setForm({ id: "", name: "", age: "", email: "", password: "" });
        })
        .catch((err) => console.error(err));
    
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`https://api-node-payment-23la.onrender.com/user/delete/${id}`)
        .then(() => fetchUsers())
        .catch((err) => console.error(err));
    }
  };
const handleUpdate=(e)=>{
   e.preventDefault()
   axios.put(`https://api-node-payment-23la.onrender.com/user/update/${edit.id}`,edit)
   .then((res)=> {
    alert(res.data.message)
    setEditMode(false);
   })
   .catch((err) => console.error(err));
   
     fetchUsers();
}
  const handleEdit = (user) => {
    setEditMode(true);
    setEdit(user);
  
   
  };

  return (
    <div className="container">
      <h1>Welcome</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" value={form.id} placeholder="ID" onChange={handleChange} required />
        <input type="text" name="name" value={form.name} placeholder="Enter a text" onChange={handleChange} required />
        <input type="number" name="age" value={form.age} placeholder="Age" onChange={handleChange} required />
        <input type="email" name="email" value={form.email} placeholder="Enter Email" onChange={handleChange} required />
        <input type="password" name="password" value={form.password} placeholder="Enter a password" onChange={handleChange} required />
        <button type="submit">{editMode ? "Update" : "Submit"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th><th>Name</th><th>Age</th><th>Email</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.age}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Edit</button>
                <button onClick={() => handleDelete(u.id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       {editMode && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit User</h2>
            <form onSubmit={handleUpdate}>
              <input type="text" name="id" value={edit.id} onChange={(e) => setEdit({...edit,id:e.target.value})} readOnly />
              <input type="text" name="name" value={edit.name} onChange={(e)=>setEdit({...edit,name:e.target.value})}required />
              <input type="number" name="age" value={edit.age} onChange={(e)=>setEdit({...edit,age:e.target.value})} required />
              <input type="email" name="email" value={edit.email} onChange={(e)=>setEdit({...edit,email:e.target.value})} required />
              <input type="password" name="password" value={edit.password} onChange={(e)=>setEdit({...edit,password:e.target.value})} required />
              <button type="submit">Update</button>
              
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

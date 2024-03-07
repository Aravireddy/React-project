import axios from "axios"
import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { CiRead } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";







function Home() {

    const [data, setData] = useState([])

    const navegate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3000/users')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
        

    },[])

    const handleDelete = (id) =>{
        const confirm = window.confirm("would you like to delete the record ..?")
        if(confirm){
            axios.delete('http://localhost:3000/users/'+id)
            .then(res =>{
                window.location.reload();
            })
            .catch(err => console.log(err));
        }
      }
    
  return (
    <div>
    <div className='d-flex flex-column align-items-center bg-light vh-50'>
        <h1>List of Users</h1>
        <div className='w-75 rounded bh-white border shadow p-4'>
            <div className="d-flex justify-content-end">
                <Link to='/create' className="btn btn-success">Add <IoIosAddCircle/></Link>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>PHONE</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((data , index) => (
                            <tr key={index}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.phone}</td>
                                <td>
                                    {/* her i am psssing the id nothing but user id i am giveing in read option */}
                                    <Link to={`/read/${data.id}`} className="btn btn-sm btn-info me-2"><CiRead /> Read</Link>
                                    <Link className="btn btn-sm btn-primary me-2" to={`/update/${data.id}`}><FaEdit /> Edit</Link>
                                    <button onClick={e => handleDelete(data.id)} className="btn btn-sm btn-danger m-2 " > <MdDeleteForever /> Delete</button>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
    </div>
  )
  
}

export default Home
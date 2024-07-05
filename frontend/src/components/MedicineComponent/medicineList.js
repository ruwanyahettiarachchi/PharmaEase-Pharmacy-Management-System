import {useState,useEffect, useRef } from 'react'
import axios  from 'axios'

function MedicineList(){

    const [medicinelist,setmedicinelist]=useState([]);

//read
    const getfetchdetails=async()=>{
    try{
        const data=await axios.get("http://localhost:8060/medicine")
        console.log(data.data.success)
        if(data.data.success){
            setmedicinelist(data.data.data)
        }
    }catch(err){
        console.log(err)
    }
    }
    useEffect(()=>{
    getfetchdetails()
    },[])


//delete
    const handledelete=async(id)=>{
    const data=await axios.delete("http://localhost:8060/delete_medicine/"+id)
    if(data.data.success){
        getfetchdetails()
        console.log(data.data.message)
        alert("Medicine record deleted successfully")
    }
    }


    return(
        <div> 

            <table>
                
                        
                <tr>
                <th>Medicine Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Supplier</th>
                <th>Action</th>
                </tr>


                <tbody>
                    { 
                    medicinelist.map((e1)=>{
                        return(
                            <tr> 
                                <td> {e1.name}</td> 
                                <td> {e1.description}</td> 
                                <td> {e1.price}</td> 
                                <td> {e1.stock}</td>
                                <td> {e1.supplier}</td>
                                
                                <td>
                                    <a href='#' className='btn1'>View Medicine</a>
                                
                                    <a href='#' className='btn1'>Edit</a>
                                
                                    <button onClick={()=>handledelete(e1._id)}>Delete</button>
                                </td>
                            </tr>
                        )

                        })
                    }
                </tbody>
            </table>

        </div>
    )
}

export default MedicineList
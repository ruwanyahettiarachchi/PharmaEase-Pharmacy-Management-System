import {useState,useEffect, useRef } from 'react'
import axios  from 'axios'

function SupplierList(){

    const [supplierlist,setsupplierlist]=useState([]);

//read
    const getfetchdetails=async()=>{
    try{
        const data=await axios.get("http://localhost:8060/supplier")
        console.log(data.data.success)
        if(data.data.success){
            setsupplierlist(data.data.data)
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
    const data=await axios.delete("http://localhost:8060/delete_supplier/"+id)
    if(data.data.success){
        getfetchdetails()
        console.log(data.data.message)
        alert("Supplier record deleted successfully")
    }
    }


    return(
        <div> 

            <table>
                
                        
                <tr>
                <th>Supplier Name</th>
                <th>Email</th>
                <th>Contract Information</th>
                <th>Action</th>
                </tr>


                <tbody>
                    { 
                    supplierlist.map((e1)=>{
                        return(
                            <tr> 
                                <td> {e1.name}</td> 
                                <td> {e1.email}</td> 
                                <td> {e1.contractInfo}</td> 
                                
                                <td>
                                    <a href='#' className='btn1'>View details</a>
                                
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

export default SupplierList
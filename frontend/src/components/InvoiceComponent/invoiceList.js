import {useState,useEffect, useRef } from 'react'
import axios  from 'axios'

function InvoiceList(){

    const [invoicelist,setinvoicelist]=useState([]);

//read
    const getfetchdetails=async()=>{
    try{
        const data=await axios.get("http://localhost:8060/invoice")
        console.log(data.data.success)
        if(data.data.success){
            setinvoicelist(data.data.data)
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
    const data=await axios.delete("http://localhost:8060/delete_invoice/"+id)
    if(data.data.success){
        getfetchdetails()
        console.log(data.data.message)
        alert("Invoice record deleted successfully")
    }
    }


    return(
        <div> 

            <table>
                
                        
                <tr>
                <th>Customer Name</th>
                <th>Total Amount</th>
                <th>Action</th>
                </tr>


                <tbody>
                    { 
                    invoicelist.map((e1)=>{
                        return(
                            <tr> 
                                <td> {e1.customerName}</td> 
                                <td> {e1.total}</td> 
                                <td>
                                    <a href='#' className='btn1'>View Invoice</a>
                                
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

export default InvoiceList
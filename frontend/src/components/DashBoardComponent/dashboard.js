import { useEffect, useState } from 'react'
import axios from "axios"

function PharmacyDashBoard(){
    const [countlist, setcountlist]=useState([]);
    const [supplierlist, setsupplierlist]=useState([]);
    const [medicecountlist, setmedicinecountlist]=useState([]);
    const [medcinelist, setmedicinesupplierlist]=useState([]);


//read
const getfetchdata=async()=>{
    try{
        const data=await axios.get("http://localhost:8060/count_supplier")
        const { count } = data.data;
        setcountlist(count);//get count
        setsupplierlist(data.data.data);//get table data
    }catch(err){
        alert(err)
    }
}
useEffect(()=>{
    getfetchdata()
},[])

const getfetchdatamedcine=async()=>{
    try{
        const data=await axios.get("http://localhost:8060/count_medicine")
        const { count } = data.data;
        setmedicinecountlist(count);//get count
        setmedicinesupplierlist(data.data.data);//get table data
    }catch(err){
        alert(err)
    }
}
useEffect(()=>{
    getfetchdatamedcine()
},[])
return(
    <div>
        <h1>Total Suppliers:</h1>
            {countlist !== null ? (
                <p>Total suppliers: {countlist}</p>
                
            ) : (
                <p>Loading...
                     </p>  
            )}

        <h2> Supplier / Company Name :</h2>
            {   
                supplierlist.map((e)=>{
                    return(
                    
                        <p> {e.name}</p> 
                    )
                    })
            }


<h1>Total Medicine:</h1>
            {countlist !== null ? (
                <p>Total medicine: {medicecountlist}</p>
                
            ) : (
                <p>Loading...
                     </p>  
            )}

        <h2> Supplier / Company Name :</h2>
            {   
                medcinelist.map((e)=>{
                    return(
                    
                        <p> {e.m_name}</p> 
                    )
                    })
            }
            
    </div>
)

}
export default PharmacyDashBoard
import React, {useState} from "react";
import axios from 'axios';

function AddSupplier(){

    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        contractInfo: "",
       
    });

    //const [errors, setErrors] = useState({});


    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setformdata((prev) => ({
            ...prev,
            [name]: value
        }));

    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8060/create_supplier", formdata);
            console.log(response.data);
            alert("Data added successfully!");
        } catch (error) {
            console.error("Error adding data:", error);
            alert("An error occurred while adding data");
        }
    }

    return (
        <div>
            <div className="supplier-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <h2>ADD NEW SUPPLIER / MANUFACTURER</h2>
                    </div>
                    <br></br>

                    <label>Supplier / Manufacturer  Name :</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter name"
                        onChange={handleOnChange} 
                    />
                    
                    <label>Email Address :</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={handleOnChange} 
                    />

                    <label>Contract Information :</label>
                    <input
                        type="text"
                        id="contractInfo"
                        name="contractInfo"
                        placeholder="Enter contract information"
                        onChange={handleOnChange} 
                    />

                    <button type="submit" className="submit-btn"> Add Supplier</button>

                </form>
            </div>
        </div>
    );
}

export default AddSupplier;
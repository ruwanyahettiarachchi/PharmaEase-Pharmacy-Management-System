import React, {useState} from "react";
import axios from 'axios';

function AddMedicine(){

    const [formdata, setformdata] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        supplier: "",
    });

    const [errors, setErrors] = useState({});


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
            const response = await axios.post("http://localhost:8060/create_medicine", formdata);
            console.log(response.data);
            alert("Data added successfully!");
        } catch (error) {
            console.error("Error adding data:", error);
            alert("An error occurred while adding data");
        }
    }

    return (
        <div>
            <div className="medicine-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <h2>ADD NEW MEDICINE</h2>
                    </div>
                    <br></br>

                    <label>Medicine Name :</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter medicine / drug name"
                        onChange={handleOnChange} 
                    />
                    
                    <label>Description :</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Enter description"
                        onChange={handleOnChange} 
                    />

                    <label>Medicine Price :</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Enter unit price"
                        onChange={handleOnChange} 
                    />

                    <label>Stock:</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        placeholder="Enter stock amount"
                        onChange={handleOnChange} 
                    />

                    <label>Supplier :</label>
                    {/* <select name="supplier" value={medicine.supplier} onChange={handleOnChange} >
                    <option value="">Select a supplier</option>
                        {suppliers.map(supplier => (
                    <option key={supplier._id} value={supplier._id}>{supplier.name}</option>
                     ))}
                    </select> */}

                    <input
                        type="text"
                        id="supplier"
                        name="supplier"
                        placeholder="Enter supplier name"
                        onChange={handleOnChange} 
                    />

                    <button type="submit" className="submit-btn"> Add Medicine</button>

                </form>
            </div>
        </div>
    );
}

export default AddMedicine;
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import './addSupplier.css'; 
import pharmacyImage from '../../images/supplier.jpg'; 


function AddSupplier() {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    contractInfo: "",
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8060/create_supplier", formdata);
      console.log(response.data);
      alert("Data added successfully!");
      navigate('/supplierlist');
    } catch (error) {
      console.error("Error adding data:", error);
      alert("An error occurred while adding data");
    }
  };

  return (
    <div className='add-supplier-page'>
      <div className="add-supplier-container">
        <div className="supplier-form">
          <form onSubmit={handleSubmit}>
            <div>
              <h2>ADD NEW SUPPLIER / MANUFACTURER</h2>
            </div>
            <br />

            <label>Supplier / Manufacturer Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              onChange={handleOnChange}
              required
            />
            
            <label>Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              onChange={handleOnChange}
              required
            />

            <label>Contact Information:</label>
            <input
              type="text"
              id="contractInfo"
              name="contractInfo"
              placeholder="Enter contact information"
              onChange={handleOnChange}
              required
            />

            <button type="submit" className="submit-btn">Add Supplier</button>
          </form>
        </div>
        <div className="image-container">
          <img src={pharmacyImage} alt="Supplier" />
        </div>
      </div>
    </div>
  );
}

export default AddSupplier;

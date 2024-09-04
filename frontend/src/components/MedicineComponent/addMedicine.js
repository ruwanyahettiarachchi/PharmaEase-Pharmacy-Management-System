import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addMedicine.css';
import pharmacyImage from '../../images/medicine1.jpg'; // Correctly import the image

const AddMedicine = () => {
  const [medicine, setMedicine] = useState({
    m_name: "",
    description: "",
    price: "",
    stock: "",
    supplier: ""
  });

  const [suppliers, setSuppliers] = useState([]);

  // Fetch suppliers
  const getFetchData = async () => {
    try {
      const data = await axios.get("http://localhost:8060/supplier");
      if (data.data.success) {
        setSuppliers(data.data.data);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setMedicine((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:8060/create_medicine", medicine);
      console.log(data);
      alert("Medicine added successfully!");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className='add-medicine-page'>
      <div className="add-medicine-container">
        <div className="medicine-form">
          <form onSubmit={handleSubmit}>
            <div>
              <h2>ADD NEW MEDICINE</h2>
            </div>
            <br />

            <label>Medicine Name:</label>
            <input
              type="text"
              id="m_name"
              name="m_name"
              placeholder="Enter medicine / drug name"
              onChange={handleOnChange}
              required
            />

            <label>Description:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter description"
              onChange={handleOnChange}
              rows="4"
              cols="70"
            />

            <label>Medicine Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter unit price"
              onChange={handleOnChange}
              step="0.01"
              required
            />

            <label>Stock:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="Enter stock amount"
              onChange={handleOnChange}
              required
            />

            <label>Supplier:</label>
            <select
              id="supplier"
              name="supplier"
              value={medicine.supplier}
              onChange={handleOnChange}
              required
            >
              <option value="">Select a supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </option>
              ))}
            </select>

            <button type="submit" className="submit-btn">
              Add Medicine
            </button>
          </form>
        </div>
        <div className="image-container">
          <img src={pharmacyImage} alt="Medicine" />
        </div>
      </div>
    </div>
  );
};

export default AddMedicine;

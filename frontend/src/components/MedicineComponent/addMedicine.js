import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddMedicine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState({ name: '', description: '', price: '', stock: '', supplier: '' });
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchMedicine = async () => {
      if (id) {
        const result = await axios.get(`http://localhost:8060/medicines/${id}`);
        setMedicine(result.data);
      }
    };

    const fetchSuppliers = async () => {
      const result = await axios.get('http://localhost:8060/suppliers');
      setSuppliers(result.data);
    };

    fetchMedicine();
    fetchSuppliers();
  }, [id]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setMedicine({ ...medicine, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:8060/medicines/${id}`, medicine);
      } else {
        await axios.post('http://localhost:8060/create_medicine', medicine);
      }
      navigate('/');
      alert("Data added successfully!");
    } catch (error) {
      console.error("Error adding data:", error);
      alert("An error occurred while adding data");
    }
  };

  return (
    <div>
      <div className="medicine-form">
        <form onSubmit={handleSubmit}>
          <div>
            <h2>ADD NEW MEDICINE</h2>
          </div>
          <br />

          <label>Medicine Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={medicine.name}
            placeholder="Enter medicine / drug name"
            onChange={handleOnChange}
            required
          />

          <label>Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={medicine.description}
            placeholder="Enter description"
            onChange={handleOnChange}
          />

          <label>Medicine Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={medicine.price}
            placeholder="Enter unit price"
            onChange={handleOnChange}
            required
          />

          <label>Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={medicine.stock}
            placeholder="Enter stock amount"
            onChange={handleOnChange}
            required
          />

          <label>Supplier:</label>
          <select
            name="supplier"
            value={medicine.supplier}
            onChange={handleOnChange}
            
          >
            <option value="">Select a supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier._id} value={supplier._id}>{supplier.name}</option>
            ))}
          </select>

          <button type="submit" className="submit-btn">
            {id ? 'Update' : 'Add'} Medicine
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;

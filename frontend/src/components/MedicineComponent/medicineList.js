import { useState, useEffect } from 'react';
import axios from 'axios';
import './medicineList.css'; // Import the CSS file
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons

function MedicineList() {
  const [suppliers, setSuppliers] = useState([]);
  const [medicineList, setMedicineList] = useState([]);

  // Fetch suppliers
  const getFetchSuppliers = async () => {
    try {
      const data = await axios.get('http://localhost:8060/supplier');
      if (data.data.success) {
        setSuppliers(data.data.data);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getFetchSuppliers();
  }, []);

  // Fetch medicines
  const getFetchDetails = async () => {
    try {
      const data = await axios.get('http://localhost:8060/medicine');
      if (data.data.success) {
        setMedicineList(data.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFetchDetails();
  }, []);

  // Delete medicine
  const handleDelete = async (id) => {
    try {
      const data = await axios.delete('http://localhost:8060/delete_medicine/' + id);
      if (data.data.success) {
        getFetchDetails();
        console.log(data.data.message);
        alert('Medicine record deleted successfully');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="medicine-list-page">
      <div className="medicine-list-container">
      <h2>Available Medicines</h2>
        <table>
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Supplier</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicineList.map((medicine) => {
              const supplier = suppliers.find((sup) => sup._id === medicine.supplier);
              return (
                <tr key={medicine._id}>
                  <td>{medicine.m_name}</td>
                  <td>{medicine.description}</td>
                  <td>{medicine.price}</td>
                  <td>{medicine.stock}</td>
                  <td>{supplier ? supplier.name : 'Unknown'}</td>
                  <td>
                    <a href={`/update_medicine/${medicine._id}`} className="action-btn">
                      <FaEdit className="icon edit-icon" />
                    </a>
                    <button onClick={() => handleDelete(medicine._id)} className="action-btn">
                      <FaTrashAlt className="icon delete-icon" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MedicineList;

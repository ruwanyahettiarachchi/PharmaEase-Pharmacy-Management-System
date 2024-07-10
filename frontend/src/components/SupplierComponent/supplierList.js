import { useState, useEffect } from 'react';
import axios from 'axios';
import './supplierList.css'; // Import the CSS file
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons

function SupplierList() {
  const [supplierList, setSupplierList] = useState([]);

  // Fetch suppliers
  const getFetchDetails = async () => {
    try {
      const data = await axios.get('http://localhost:8060/supplier');
      if (data.data.success) {
        setSupplierList(data.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFetchDetails();
  }, []);

  // Delete supplier
  const handleDelete = async (id) => {
    try {
      const data = await axios.delete('http://localhost:8060/delete_supplier/' + id);
      if (data.data.success) {
        getFetchDetails();
        console.log(data.data.message);
        alert('Supplier record deleted successfully');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="supplier-list-page">
      <div className="supplier-list-container">
        <h2>Supplier List</h2>
        <table>
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Email</th>
              <th>Contract Information</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {supplierList.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier.name}</td>
                <td>{supplier.email}</td>
                <td>{supplier.contractInfo}</td>
                <td>
                  <a href={`/update_supplier/${supplier._id}`} className="action-btn">
                    <FaEdit className="icon edit-icon" />
                  </a>
                  <button onClick={() => handleDelete(supplier._id)} className="action-btn">
                    <FaTrashAlt className="icon delete-icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SupplierList;

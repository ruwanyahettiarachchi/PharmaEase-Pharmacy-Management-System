import { useState, useEffect } from 'react';
import axios from 'axios';
import './invoiceList.css'; // Import the CSS file
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons

function InvoiceList() {
  const [invoiceList, setInvoiceList] = useState([]);

  // Fetch invoices
  const getFetchDetails = async () => {
    try {
      const data = await axios.get('http://localhost:8060/invoice');
      if (data.data.success) {
        setInvoiceList(data.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFetchDetails();
  }, []);

  // Delete invoice
  const handleDelete = async (id) => {
    try {
      const data = await axios.delete('http://localhost:8060/delete_invoice/' + id);
      if (data.data.success) {
        getFetchDetails();
        alert('Invoice record deleted successfully');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="invoice-list-page">
      <div className="invoice-list-container">
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoiceList.map((invoice) => (
              <tr key={invoice._id}>
                <td>{invoice.customerName}</td>
                <td>{invoice.total}</td>
                <td>
                  <a href={`/update_invoice/${invoice._id}`} className="action-btn">
                    <FaEdit className="icon edit-icon" />
                  </a>
                  <button onClick={() => handleDelete(invoice._id)} className="action-btn">
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

export default InvoiceList;

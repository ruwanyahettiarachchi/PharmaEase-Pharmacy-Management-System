import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import { FaUser, FaPills, FaFileInvoice } from 'react-icons/fa';

function PharmacyDashBoard() {
  const [countlist, setCountlist] = useState(null);
  const [supplierlist, setSupplierlist] = useState([]);
  const [medicinecountlist, setMedicinecountlist] = useState(null);
  const [medicinelist, setMedicinelist] = useState([]);
  const [invoicecountlist, setInvoicecountlist] = useState(null);
  const [invoicelist, setInvoicelist] = useState([]);

  const getFetchData = async () => {
    try {
      const { data } = await axios.get('http://localhost:8060/count_supplier');
      setCountlist(data.count);
      setSupplierlist(data.data);
    } catch (err) {
      alert(err);
    }
  };

  const getFetchDataMedicine = async () => {
    try {
      const { data } = await axios.get('http://localhost:8060/count_medicine');
      setMedicinecountlist(data.count);
      setMedicinelist(data.data);
    } catch (err) {
      alert(err);
    }
  };

  const getFetchDataInvoice = async () => {
    try {
      const { data } = await axios.get('http://localhost:8060/count_invoice');
      setInvoicecountlist(data.count);
      setInvoicelist(data.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getFetchData();
    getFetchDataMedicine();
    getFetchDataInvoice();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="summary-container">
          <div className="summary-box">
            <FaUser className="summary-icon" />
            <h2>Total Suppliers</h2>
            <p>{countlist !== null ? countlist : 'Loading...'}</p>
          </div>
          <div className="summary-box">
            <FaPills className="summary-icon" />
            <h2>Total Medicines</h2>
            <p>{medicinecountlist !== null ? medicinecountlist : 'Loading...'}</p>
          </div>
          <div className="summary-box">
            <FaFileInvoice className="summary-icon" />
            <h2>Total Invoices</h2>
            <p>{invoicecountlist !== null ? invoicecountlist : 'Loading...'}</p>
          </div>
        </div>

        <div className="list-container">
          <div className="list-section">
            <h2>Registered Suppliers</h2>
            {supplierlist.map((supplier) => (
              <p key={supplier.id}>{supplier.name}</p>
            ))}
          </div>
          <div className="list-section">
            <h2>Available Medicines</h2>
            {medicinelist.map((medicine) => (
              <p key={medicine.id}>{medicine.m_name}</p>
            ))}
          </div>
          <div className="list-section">
            <h2>Created Invoices</h2>
            {invoicelist.map((invoice) => (
              <p key={invoice.id}>{invoice.customerName}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PharmacyDashBoard;

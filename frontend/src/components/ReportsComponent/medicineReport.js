import { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './medicineReport.css'; // Import the CSS file
import logo from '../../images/logo.png';

function MedicineReport() {
  const [suppliers, setSuppliers] = useState([]);
  const [medicineList, setMedicineList] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

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
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  const downloadPDF = () => {
    const input = document.getElementById('medicine-report-container');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Medicine_Details_Report.pdf');
    });
  };

  return (
    <div className="medicine-report-page">
      <button className="download-button" onClick={downloadPDF}>Download Report</button>
      <div id="medicine-report-container" className="medicine-report-container">
        <header className="report-header">
          <img src={logo} alt="Pharma Ease Logo" className="company-logo" />
          <div className="company-details">
            <h2>Pharma Ease</h2><br></br>
            <p>123 Health St., Wellness City, 12345</p>
            <p>Phone: (123) 456-7890</p>
            <p>Fax: (123) 456-7891</p>
          </div>
        </header>
        <h1>Medicine Details Report</h1>
        <table>
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Supplier</th>
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
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="report-footer">
          <p className="report-date">Date: {currentDate}</p>
          <p className="report-signature">Signature: __________________________</p>
        </div>
      </div>
    </div>
  );
}

export default MedicineReport;

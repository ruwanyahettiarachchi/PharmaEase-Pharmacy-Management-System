import { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './supplierReport.css'; // Import the CSS file

function SupplierReport() {
  const [supplierList, setSupplierList] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

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
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  const downloadPDF = () => {
    const input = document.getElementById('supplier-report-container');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Supplier_Details_Report.pdf');
    });
  };

  return (
    <div className="supplier-report-page">
      <button className="download-button" onClick={downloadPDF}>Download Report</button>
      <div id="supplier-report-container" className="supplier-report-container">
        <h1>Supplier Details Report</h1>
        <table>
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Email</th>
              <th>Contract Information</th>
            </tr>
          </thead>
          <tbody>
            {supplierList.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier.name}</td>
                <td>{supplier.email}</td>
                <td>{supplier.contractInfo}</td>
              </tr>
            ))}
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

export default SupplierReport;

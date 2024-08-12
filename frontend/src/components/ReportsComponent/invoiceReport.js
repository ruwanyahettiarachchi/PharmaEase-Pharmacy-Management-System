import { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './invoiceReport.css'; // Import the CSS file
import logo from '../../images/logo.png';

function InvoiceReport() {
  const [invoiceList, setInvoiceList] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

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
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  const downloadPDF = () => {
    const input = document.getElementById('invoice-report-container');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Invoice_Details_Report.pdf');
    });
  };

  return (
    <div className="invoice-report-page">
      <button className="download-button" onClick={downloadPDF}>Download Report</button>
      <div id="invoice-report-container" className="invoice-report-container">
        <header className="report-header">
          <img src={logo} alt="Pharma Ease Logo" className="company-logo" />
          <div className="company-details">
            <h2>Pharma Ease</h2><br></br>
            <p>123 Health St., Wellness City, 12345</p>
            <p>Phone: (123) 456-7890</p>
            <p>Fax: (123) 456-7891</p>
          </div>
        </header>
        <h1>Sales Details Report</h1>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceList.map((invoice) => (
              <tr key={invoice._id}>
                <td>{invoice.customerName}</td>
                <td>{invoice.customerEmail}</td>
                <td>{invoice.total}</td>
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

export default InvoiceReport;

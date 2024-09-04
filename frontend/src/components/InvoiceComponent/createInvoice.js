import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './createInvoice.css';


function CreateInvoice() {
    const { id } = useParams();
    const [medicineList, setMedicineList] = useState([]);
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState({ customerName: '', customerEmail: '', medicines: [], total: 0 });

    const [selectedMedicine, setSelectedMedicine] = useState('');
    const [quantity, setQuantity] = useState(0);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoice((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        getFetchDetails();
    }, []);

    const handleAddMedicine = () => {
        const selectedMed = medicineList.find(med => med._id === selectedMedicine);
        if (selectedMed && quantity > 0) {
            const newMedicine = {
                medicineId: selectedMed._id,
                name: selectedMed.m_name,
                quantity: quantity,
                price: selectedMed.price
            };
            setInvoice({
                ...invoice,
                medicines: [...invoice.medicines, newMedicine],
                total: invoice.total + (selectedMed.price * quantity)
            });
            setSelectedMedicine('');
            setQuantity(0);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:8060/invoices/${id}`, invoice);
            } else {
                await axios.post('http://localhost:8060/create_invoice', invoice);
            }
            alert("Invoice created successfully!");
            navigate('/invoicelist');
        } catch (err) {
            console.error("Error adding data:", err);
            alert("An error occurred while creating the invoice");
        }
    };

    return (
        <div className="create-invoice-page">
            <form onSubmit={handleSubmit} className="create-invoice-form">
                <div className="form-content">
                    <div className="form-left">
                        <div>
                            <h2>CREATE INVOICE</h2>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>Customer Name:</label>
                            <input
                                type="text"
                                id='customerName'
                                name="customerName"
                                value={invoice.customerName}
                                placeholder="Enter customer name"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Customer Email:</label>
                            <input
                                type="email"
                                id='customerEmail'
                                name="customerEmail"
                                value={invoice.customerEmail}
                                placeholder="Enter email"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group medicine-quantity-group">
                            <label>Medicines:</label>
                            <select
                                value={selectedMedicine}
                                onChange={(e) => setSelectedMedicine(e.target.value)}
                            >
                                <option value="">Select Medicine</option>
                                {medicineList.map((medicine) => (
                                    <option key={medicine._id} value={medicine._id}>
                                        {medicine.m_name}
                                    </option>
                                ))}
                            </select>
                            <label>Quantity needed:</label>
                            <input
                                type="number"
                                name="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                min="0"
                            />
                        </div>
                        <div className="form-group">
                            <button type="button" onClick={handleAddMedicine} className="add-medicine-btn">Add Medicine</button>
                        </div>
                        <ul>
                            {invoice.medicines.map((med, index) => (
                                <li key={index}>{med.name} - {med.quantity} x {med.price} = {med.quantity * med.price}</li>
                            ))}
                        </ul>
                        <p>Total Amount: {invoice.total}</p>
                        <div className="form-group">
                            <button type="submit" className="create-invoice-btn">Create Invoice</button>
                        </div>
                    </div>
                    
                </div>
            </form>
        </div>
    );
}

export default CreateInvoice;

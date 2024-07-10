import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './createInvoice.css'; // Import the new CSS file
import pharmacyImage from '../../images/medicine1.jpg'; // Correctly import the image


function CreateInvoice() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState({ customerName: '', customerEmail: '', medicines: [], total: 0 });
    const [medicines, setMedicines] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState('');
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const fetchInvoice = async () => {
            if (id) {
                const result = await axios.get(`http://localhost:8060/invoices/${id}`);
                setInvoice(result.data);
            }
        };

        const fetchMedicines = async () => {
            const result = await axios.get('http://localhost:8060/medicinelist');
            setMedicines(result.data);
        };

        fetchInvoice();
        fetchMedicines();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoice({ ...invoice, [name]: value });
    };

    const handleAddMedicine = () => {
        const selectedMed = medicines.find(med => med._id === selectedMedicine);
        const newMedicine = {
            medicineId: selectedMed._id,
            name: selectedMed.name,
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:8060/invoices/${id}`, invoice);
            } else {
                await axios.post('http://localhost:8060/create_invoice', invoice);
            }
            navigate('/invoices');
        } catch (error) {
            console.error("Error adding data:", error);
            alert("An error occurred while adding data");
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
                                name="customerEmail"
                                value={invoice.customerEmail}
                                placeholder="Enter email"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group medicine-quantity-group">
                            <label>Medicines:</label>
                            <select name="medicine" value={selectedMedicine} onChange={(e) => setSelectedMedicine(e.target.value)}>
                                <option value="">Select a medicine</option>
                                {medicines.map(med => (
                                    <option key={med._id} value={med._id}>{med.name}</option>
                                ))}
                            </select>
                            <label>Quantity needed</label>
                            <input
                                type="number"
                                name="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                        </div>
                        <div className="form-group">
                            <button type="button" onClick={handleAddMedicine} className="add-medicine-btn">Add Medicine</button>
                        </div>
                        <ul>
                            {invoice.medicines.map((med, index) => (
                                <li key={index}>{med.name} - {med.quantity} x {med.price}</li>
                            ))}
                        </ul>
                        <p>Total Amount: {invoice.total}</p>
                        <div className="form-group">
                            <button type="submit" className="create-invoice-btn">Create Invoice</button>
                        </div>
                    </div>
                    <div className="form-right">
                        <img src={pharmacyImage} alt="Medicine" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateInvoice;

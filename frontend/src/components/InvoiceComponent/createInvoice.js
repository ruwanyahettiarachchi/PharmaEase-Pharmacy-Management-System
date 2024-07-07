import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateInvoice() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState({ customerName: '', customerEmail: '', medicines: [], totalAmount: 0 });
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
            const result = await axios.get('http://localhost:8060/medicines');
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
            quantity: quantity,
            price: selectedMed.price
        };
        setInvoice({
            ...invoice,
            medicines: [...invoice.medicines, newMedicine],
            totalAmount: invoice.totalAmount + (selectedMed.price * quantity)
        });
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
        <form onSubmit={handleSubmit}>
            <div>
                <h2>CREATE INVOICE</h2>
            </div>
            <br />
            <label>
                Customer Name:
                <input
                    type="text"
                    name="customerName"
                    value={invoice.customerName}
                    placeholder="Enter customer name"
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Customer Email:
                <input
                    type="email"
                    name="customerEmail"
                    value={invoice.customerEmail}
                    placeholder="Enter email"
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Medicines:
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
                <button type="button" onClick={handleAddMedicine}>Add Medicine</button>
            </label>
            <ul>
                {invoice.medicines.map((med, index) => (
                    <li key={index}>{med.medicineId.name} - {med.quantity} x {med.price}</li>
                ))}
            </ul>
            <p>Total Amount: {invoice.totalAmount}</p>
            <button type="submit">{id ? 'Update' : 'Create'} Invoice</button>
        </form>
    );
}

export default CreateInvoice;

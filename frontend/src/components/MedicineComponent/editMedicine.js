import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditMedicine() {
    const { id } = useParams();

    const [medicineData, setMedicineData] = useState({
        m_name: "",
        description: "",
        price: "",
        stock: "",
        supplier: "",
    });

    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchMedicineData = async () => {
            try {
                const response = await axios.get(`http://localhost:8060/medicine/${id}`);
                if (response.data.success) {
                    setMedicineData(response.data.data);
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching medicine data:', error);
            }
        };

        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('http://localhost:8060/supplier');
                if (response.data.success) {
                    setSuppliers(response.data.data);
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };

        fetchMedicineData();
        fetchSuppliers();
    }, [id]);

    const handleInputChange = (e) => {
        setMedicineData({
            ...medicineData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8060/update_medicine`, {
                id: medicineData._id,
                ...medicineData,
            });

            if (response.data.success) {
                console.log('Medicine updated successfully');
                alert("Medicine data updated successfully!");
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating medicine:', error);
            alert("Error updating medicine data!");
        }
    };

    return (
        <div>
            <div className="edit-medicine-form">
                <div>
                    <h2>MEDICINE DETAILS</h2>
                </div>
                <br />

                <label>Medicine Name :</label>
                <input
                    type="text"
                    id="m_name"
                    name="m_name"
                    onChange={handleInputChange}
                    value={medicineData.m_name}
                />

                <label>Description :</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    onChange={handleInputChange}
                    value={medicineData.description}
                />

                <label>Price :</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    onChange={handleInputChange}
                    value={medicineData.price}
                />

                <label>Stock :</label>
                <input
                    type="number"
                    id="stock"
                    name="stock"
                    onChange={handleInputChange}
                    value={medicineData.stock}
                />

                <label>Supplier :</label>
                <select
                    id="supplier"
                    name="supplier"
                    value={medicineData.supplier}
                    onChange={handleInputChange}
                >
                    {suppliers.map((supplier) => (
                        <option key={supplier._id} value={supplier._id}>
                            {supplier.name}
                        </option>
                    ))}
                </select>

                <button onClick={handleUpdate} className="edit-btn"> Edit Medicine</button>
            </div>
        </div>
    );
}

export default EditMedicine;

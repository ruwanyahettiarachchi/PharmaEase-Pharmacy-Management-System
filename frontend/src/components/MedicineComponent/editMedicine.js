import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './editMedicine.css'; // Import the  CSS file

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

    const [editMode, setEditMode] = useState({
        m_name: false,
        description: false,
        price: false,
        stock: false,
        supplier: false,
    });

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
                setEditMode({
                    m_name: false,
                    description: false,
                    price: false,
                    stock: false,
                    supplier: false,
                });
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating medicine:', error);
            alert("Error updating medicine data!");
        }
    };

    const toggleEditMode = (field) => {
        setEditMode((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    return (
        <div className="edit-supplier-page">
            <div className="edit-supplier-form">
                <h2>MEDICINE DETAILS</h2>
                <br />
                <div className="form-group">
                    <label>Medicine Name:</label>
                    {editMode.m_name ? (
                        <input
                            type="text"
                            name="m_name"
                            value={medicineData.m_name}
                            onChange={handleInputChange}
                            onBlur={() => toggleEditMode('m_name')}
                            autoFocus
                        />
                    ) : (
                        <p onClick={() => toggleEditMode('m_name')} className="editable-field">{medicineData.m_name}</p>
                    )}
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    {editMode.description ? (
                        <input
                            type="text"
                            name="description"
                            value={medicineData.description}
                            onChange={handleInputChange}
                            onBlur={() => toggleEditMode('description')}
                            autoFocus
                        />
                    ) : (
                        <p onClick={() => toggleEditMode('description')} className="editable-field">{medicineData.description}</p>
                    )}
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    {editMode.price ? (
                        <input
                            type="number"
                            name="price"
                            value={medicineData.price}
                            onChange={handleInputChange}
                            onBlur={() => toggleEditMode('price')}
                            autoFocus
                        />
                    ) : (
                        <p onClick={() => toggleEditMode('price')} className="editable-field">{medicineData.price}</p>
                    )}
                </div>
                <div className="form-group">
                    <label>Stock:</label>
                    {editMode.stock ? (
                        <input
                            type="number"
                            name="stock"
                            value={medicineData.stock}
                            onChange={handleInputChange}
                            onBlur={() => toggleEditMode('stock')}
                            autoFocus
                        />
                    ) : (
                        <p onClick={() => toggleEditMode('stock')} className="editable-field">{medicineData.stock}</p>
                    )}
                </div>
                <div className="form-group">
                    <label>Supplier:</label>
                    {editMode.supplier ? (
                        <select
                            name="supplier"
                            value={medicineData.supplier}
                            onChange={handleInputChange}
                            onBlur={() => toggleEditMode('supplier')}
                            autoFocus
                        >
                            {suppliers.map((supplier) => (
                                <option key={supplier._id} value={supplier._id}>
                                    {supplier.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p onClick={() => toggleEditMode('supplier')} className="editable-field">
                            {suppliers.find((supplier) => supplier._id === medicineData.supplier)?.name || "Unknown"}
                        </p>
                    )}
                </div>
                <button onClick={handleUpdate} className="edit-btn">Update Medicine</button>
            </div>
        </div>
    );
}

export default EditMedicine;

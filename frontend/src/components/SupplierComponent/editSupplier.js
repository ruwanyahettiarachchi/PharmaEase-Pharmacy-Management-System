import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './editSupplier.css'; // Import the CSS file

function EditSupplier() {
    const { id } = useParams();

    const [supplierData, setSupplierData] = useState({
        name: "",
        email: "",
        contractInfo: "",
    });

    const [editMode, setEditMode] = useState({
        name: false,
        email: false,
        contractInfo: false,
    });

    useEffect(() => {
        const fetchSupplierData = async () => {
            try {
                const response = await fetch(`http://localhost:8060/supplier/${id}`);
                const data = await response.json();
                console.log(data);

                if (data.success) {
                    setSupplierData(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching supplier data:', error);
            }
        };

        fetchSupplierData();
    }, [id]);

    const handleInputChange = (e) => {
        setSupplierData({
            ...supplierData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8060/update_supplier/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: supplierData._id,
                    ...supplierData,
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Supplier updated successfully');
                alert("Supplier data updated successfully!");
                setEditMode({
                    name: false,
                    email: false,
                    contractInfo: false,
                });
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error updating supplier:', error);
            alert("Error updating supplier data!");
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
                <h2>SUPPLIER DETAILS</h2>
                <br />
                <div className="form-group">
                    <label>Supplier / Manufacturer Name:</label>
                    {editMode.name ? (
                        <input
                            type="text"
                            name="name"
                            value={supplierData.name}
                            onChange={handleInputChange}
                            onBlur={() => toggleEditMode('name')}
                            autoFocus
                        />
                    ) : (
                        <p onClick={() => toggleEditMode('name')} className="editable-field">{supplierData.name}</p>
                    )}
                </div>
                <div className="form-group">
                    <label>Email Address:</label>
                    {editMode.email ? (
                        <input
                            type="email"
                            name="email"
                            value={supplierData.email}
                            onChange={handleInputChange}
                            onBlur={() => toggleEditMode('email')}
                            autoFocus
                        />
                    ) : (
                        <p onClick={() => toggleEditMode('email')} className="editable-field">{supplierData.email}</p>
                    )}
                </div>
                <div className="form-group">
                    <label>Contract Information:</label>
                    {editMode.contractInfo ? (
                        <input
                            type="text"
                            name="contractInfo"
                            value={supplierData.contractInfo}
                            onChange={handleInputChange}
                            onBlur={() => toggleEditMode('contractInfo')}
                            autoFocus
                        />
                    ) : (
                        <p onClick={() => toggleEditMode('contractInfo')} className="editable-field">{supplierData.contractInfo}</p>
                    )}
                </div>
                <button onClick={handleUpdate} className="edit-btn">Update Supplier</button>
            </div>
        </div>
    );
}

export default EditSupplier;

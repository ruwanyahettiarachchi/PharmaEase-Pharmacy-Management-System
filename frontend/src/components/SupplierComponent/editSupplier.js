import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function EditSupplier() {
    const { id } = useParams();

    const [supplierData, setsupplierData] = useState({
        name: "",
        email: "",
        contractInfo: "",
    });

    useEffect(() => {
        const fetchSupplierData = async () => {
            try {
                const response = await fetch(`http://localhost:8060/supplier/${id}`);
                const data = await response.json();
                console.log(data);

                if (data.success) {
                    setsupplierData(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching supplier data:', error);
            }
        };

        fetchSupplierData();
    }, []);

    const handleInputChange = (e) => {
        setsupplierData({
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
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error updating supplier:', error);
            alert("Error updating supplier data!");
        }
    };

    return(
        <div>
            <div className="edit-supplier-form">
                
                    <div>
                        <h2>ADD NEW SUPPLIER / MANUFACTURER</h2>
                    </div>
                    <br></br>

                    <label>Supplier / Manufacturer  Name :</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter name"
                        onChange={handleInputChange} 
                        value={supplierData?.name}
                    />
                    
                    <label>Email Address :</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={handleInputChange} 
                        value={supplierData?.email}
                    />

                    <label>Contract Information :</label>
                    <input
                        type="text"
                        id="contractInfo"
                        name="contractInfo"
                        placeholder="Enter contract information"
                        onChange={handleInputChange} 
                        value={supplierData?.contractInfo}
                    />

                    <button onClick={handleUpdate} className="edit-btn"> Edit Supplier</button>

                
            </div>
        </div>
    )

}
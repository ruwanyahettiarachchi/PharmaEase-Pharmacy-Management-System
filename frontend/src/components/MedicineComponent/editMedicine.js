import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function EditMedicine() {
    const { id } = useParams();

    const [medicineData, setmedicineData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        supplier: "",
    });

    useEffect(() => {
        const fetchMedicineData = async () => {
            try {
                const response = await fetch(`http://localhost:8060/medicine/${id}`);
                const data = await response.json();
                console.log(data);

                if (data.success) {
                    setmedicineData(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching medicine data:', error);
            }
        };

        fetchMedicineData();
    }, []);

    const handleInputChange = (e) => {
        setmedicineData({
            ...medicineData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8060/update_medicine/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: medicineData._id,
                    ...medicineData,
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log('medicine updated successfully');
                alert("Medicine data updated successfully!");
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error updating medicine:', error);
            alert("Error updating medicine data!");
        }
    };

    return(
        <div>
            <div className="edit-medicine-form">
                
                    <div>
                        <h2>MEDICINE DETAILS</h2>
                    </div>
                    <br></br>

                    <label>Medicine Name :</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleInputChange} 
                        value={supplierData?.name}
                    />
                    
                    <label>Description :</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleInputChange} 
                        value={supplierData?.description}
                    />

                    <label>Price :</label>
                    <input
                        type="text"
                        id="contractInfo"
                        name="contractInfo"
                        onChange={handleInputChange} 
                        value={supplierData?.price}
                    />

                    <label>Stock :</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleInputChange} 
                        value={supplierData?.stock}
                    />

                    <label>Supplier :</label>
                    <input
                        type="text"
                        id="contractInfo"
                        name="contractInfo"
                        onChange={handleInputChange} 
                        value={supplierData?.supplier}
                    />

                    <button onClick={handleUpdate} className="edit-btn"> Edit Medicine</button>

                
            </div>
        </div>
    )

}

export default EditMedicine;
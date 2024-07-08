import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function EditInvoice() {
    const { id } = useParams();

    const [invoiceData, setinvoiceData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        supplier: "",
    });

    useEffect(() => {
        const fetchInvoiceData = async () => {
            try {
                const response = await fetch(`http://localhost:8060/invoice/${id}`);
                const data = await response.json();
                console.log(data);

                if (data.success) {
                    setinvoiceData(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching invoice data:', error);
            }
        };

        fetchInvoiceData();
    }, []);

    const handleInputChange = (e) => {
        setinvoiceData({
            ...invoiceData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8060/update_invoice/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: invoiceData._id,
                    ...invoiceData,
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log('invoice updated successfully');
                alert("Invoice data updated successfully!");
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error updating invoice:', error);
            alert("Error updating invoice data!");
        }
    };

    return(
        <div>
            <div className="edit-invoice-form">
                
                    

                    <button onClick={handleUpdate} className="edit-btn"> Edit Medicine</button>

                
            </div>
        </div>
    )

}

export default EditInvoice;
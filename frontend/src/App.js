import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';

import AddMedicine from './components/MedicineComponent/addMedicine';
import MedicineList from './components/MedicineComponent/medicineList';
import AddSupplier from './components/SupplierComponent/addSupplier';
import SupplierList from './components/SupplierComponent/supplierList';
import CreateInvoice from './components/InvoiceComponent/createInvoice';
import InvoiceList from './components/InvoiceComponent/invoiceList';
import PharmacyDashBoard from './components/DashBoardComponent/dashboard';

import NavBar from './components/NavBar';
import EditMedicine from './components/MedicineComponent/editMedicine';

function App() {
  return (

    <Router>
      <div>

        <NavBar/>

        <Routes>
        <Route path="/" element={<PharmacyDashBoard/>}></Route>
        <Route path="/addmedicine" element={<AddMedicine/>}></Route>
        <Route path="/medicinelist" element={<MedicineList/>}></Route>
        <Route path="/addsupplier" element={<AddSupplier/>}></Route>
        <Route path="/supplierlist" element={<SupplierList/>}></Route>
        <Route path="/createinvoice" element={<CreateInvoice/>}></Route>
        <Route path="/invoicelist" element={<InvoiceList/>}></Route>
        <Route path="/update_medicine/:id" element={<EditMedicine/>}></Route>

        </Routes>


      </div>

    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import './navbar.css';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

function NavBar() {
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <div>
            <div className='navbar'>
                <h3 className='topic'>Pharma Ease</h3>

                <a href='/' onClick={() => setExpandedSection(null)}>Dash Board</a>

                <div className='menu-item'>
                    <a href='#' onClick={() => toggleSection('medicines')}>
                        Medicines {expandedSection === 'medicines' ? <FaAngleUp /> : <FaAngleDown />}
                    </a>
                    {expandedSection === 'medicines' && (
                        <div className='submenu'>
                            <a href='/addmedicine'>Add Medicine</a>
                            <a href='/medicinelist'>Available Medicines</a>
                        </div>
                    )}
                </div>

                <div className='menu-item'>
                    <a href='#' onClick={() => toggleSection('suppliers')}>
                        Suppliers {expandedSection === 'suppliers' ? <FaAngleUp /> : <FaAngleDown />}
                    </a>
                    {expandedSection === 'suppliers' && (
                        <div className='submenu'>
                            <a href='/addsupplier'>Add Supplier</a>
                            <a href='/supplierlist'>Available Suppliers</a>
                        </div>
                    )}
                </div>

                <div className='menu-item'>
                    <a href='#' onClick={() => toggleSection('invoices')}>
                        Invoices {expandedSection === 'invoices' ? <FaAngleUp /> : <FaAngleDown />}
                    </a>
                    {expandedSection === 'invoices' && (
                        <div className='submenu'>
                            <a href='/createinvoice'>Create Invoice</a>
                            <a href='/invoicelist'>All Invoices</a>
                        </div>
                    )}
                </div>

                <div className='menu-item'>
                    <a href='#' onClick={() => toggleSection('reports')}>
                        Reports {expandedSection === 'reports' ? <FaAngleUp /> : <FaAngleDown />}
                    </a>
                    {expandedSection === 'reports' && (
                        <div className='submenu'>
                            <a href='/medicinereport'>Medicine Report</a>
                            <a href='/supplierreport'>Supplier Report</a>
                            <a href='/salesreport'>Sales Report</a>
                        </div>
                    )}
                </div>

                <button className='logout-btn'>Logout</button>
            </div>
        </div>
    );
}

export default NavBar;

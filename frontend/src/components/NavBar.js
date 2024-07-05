import react from 'react'

function NavBar(){
    return(
        <div>
            <div className='navbar'>
                <h3 className='topic'>Pharma Eace</h3>

                <a href='#'>Dash Board</a>
                <a href='#'>Medicines</a>
                <a href='#'>Suppliers</a>
                <a href='#'>Invoices</a>

                <button className='logout-btn'>Logout</button>
            </div>
        </div>
    )
}
export default NavBar
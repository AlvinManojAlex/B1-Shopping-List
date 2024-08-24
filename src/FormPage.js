import React, { useState } from 'react';
import { db } from './firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function FormPage() {
    const [itemName, setItemName] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!itemName){
            alert('Please fill all the details!');
            return;
            }

            try {
                const docRef = await addDoc(collection(db, 'shoppingList'), {
                    itemName,
                    purchased: "no"
                })

                console.log('Document written');

                setItemName('');
            }
            catch(error) {
                console.log('Error adding document ', error);
            }
    }

    return (
        <div className="App">

            <div className='container'>
            <h1>B1 SHOPPING LIST</h1>

            <input 
                type='text'
                placeholder='Enter item name'
                value={itemName}
                onChange={(e) => setItemName(e.target.value)} />

            <button className='submit-btn' onClick={handleSubmit} >
                Submit Item
            </button>

            <Link to='/list'>
                <button className='submit-btn'>View List</button>
            </Link>
            </div>

        </div>
  )
}

export default FormPage;
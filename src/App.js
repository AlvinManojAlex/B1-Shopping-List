import React, { useState } from 'react';
import { db } from './firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';

import './App.css';

function App() {
  const [itemName, setItemName] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [purchaseType, setPurchaseType] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!itemName || !tenantName || !purchaseType){
      alert('Please fill all the details!');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'shoppingList'), {
        itemName,
        tenantName,
        purchaseType,
        purchased: "no"
      })

      console.log('Document written');

      setItemName('');
      setTenantName('');
      setPurchaseType('');
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

        <select
          value={tenantName}
          onChange={(e) => setTenantName(e.target.value)}>
            <option value=''>Select tenant</option>
            <option value='Alvin'>Alvin</option>
            <option value='Arnav'>Arnav</option>
            <option value='Aryan'>Aryan</option>
            <option value='Ishit'>Ishit</option>
            <option value='Mohit'>Mohit</option>
        </select>

        <select
          value={purchaseType}
          onChange={(e) => setPurchaseType(e.target.value)}>
            <option value=''>Select type</option>
            <option value='personal'>Personal</option>
            <option value='common'>Common for apartment</option>
        </select>

        <button className='submit-btn' onClick={handleSubmit} >
          Submit Item
        </button>
      </div>

    </div>
  );
}

export default App;

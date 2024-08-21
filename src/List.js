import React, { useState, useEffect } from 'react';
import { db } from './firebaseconfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './App.css';

function List() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchCommonItems = async () => {
            const q = query(collection(db, 'shoppingList'), where('purchaseType', '==', 'common'));
            const querySnapshot = await getDocs(q);
            const itemList = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
            setItems(itemList);
        }

        fetchCommonItems();
    }, []);

    return(
        <div className='App'>
            <div className='container'>
                <h1>Common Shopping List</h1>
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>{item.itemName}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default List;
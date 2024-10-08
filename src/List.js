import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig_vercel';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './App.css';

function List() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchCommonItems = async () => {
            const q = query(collection(db, 'shoppingList'));
            const querySnapshot = await getDocs(q);
            const itemList = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
            setItems(itemList);
        }

        fetchCommonItems();
    }, []);

    const handleDelete = async(itemId) => {
        try {
            await deleteDoc(doc(db, 'shoppingList', itemId))

            // Updating the local state to remove the item
            setItems(items.filter(item => item.id !== itemId));
        }
        catch(error) {
            console.log('Error in deleting doc');
        }
    }

    return(
        <div className='App'>
            <div className='container'>
                <h1>Common Shopping List</h1>
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            <div className='item-container'>
                                <span>{item.itemName}</span>
                                <button className='remove-btn' onClick={() => handleDelete(item.id)}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>

                <Link to="/">
                    <button className="new-item-btn">Add a new item?</button>
                </Link>
            </div>
        </div>
    )
}

export default List;
import React, { useEffect, useState } from 'react';
import './Shopping.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ShoppingCart() {
  const [items, setItems] = useState([]);
  const URL = "http://localhost:3200/items";
  const nav=useNavigate()
  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      setItems(response.data);
        
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const additemtocart = async (id) => {
    try {
      console.log(id)
      const response = await axios.get(`${URL}/${id}`);
      const currentItem = response.data;
      const newone=currentItem.count+1
      await axios.patch(`${URL}/${id}`,{count:newone});
      fetchData();
      nav('./Cart')
    } catch (error) {
      console.error('Error updating item count:', error);
    }
  };

  return (
    <div className='main-container'>
      <h1 style={{fontSize:'50px'}}>Guru's Store of Mystery - Shopping</h1>
       <div className='main-items'>
        {items.map((data) => (
          <div className='main-each-item'>
            <img src={data.image} width='200px' height='200px' alt='' className='main-image' />
            <h2>{data.name}</h2>
            <h3>{data.price}</h3>
            <div className='button-container'> 
              <button className='main-item-button' onClick={() => additemtocart(data.id)}>Add to Cart</button>
            </div>
          </div>
        ))} 
      </div> 
    </div>
  );
}

// TO BE PLACED IN APP FILE
// SHOULD LAUNCH JSON FILE FOR FURTHER PURPOSS
//      <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<ShoppingCart/>}></Route>
//         <Route path='/Cart' element={<Shopping_Cart/>}></Route>
//       </Routes>
//       </BrowserRouter>
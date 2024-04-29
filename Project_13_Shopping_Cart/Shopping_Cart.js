import React, { useEffect, useState } from 'react';
import './Shopping.css';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom'

export default function Shopping_Cart() {
    const nav=useNavigate()
    const [items, setItems] = useState([]);
    const [totalcount,setTotalcount]=useState(0)
    const [totalamount,setTotalamount]=useState(0)
    const URL = "http://localhost:3200/items";
  
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        const temp=response.data
        var count=0,sum=0;
        temp.forEach((data) => {
          count=count+(data.count);
          sum=sum+(data.count*data.amount);
        })
        setTotalamount(sum);
        setTotalcount(count);
        setItems(temp);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
    const increment = async (id) => {
      try {
        console.log(id)
        const response = await axios.get(`${URL}/${id}`);
        const currentItem = response.data;
        const newone=currentItem.count+1
        await axios.patch(`${URL}/${id}`,{count:newone});
        fetchData();
      } catch (error) {
        console.error('Error updating item count:', error);
      }
    };
    const decrement = async (id) => {
      try {
        console.log(id)
        const response = await axios.get(`${URL}/${id}`);
        const currentItem = response.data;
        const newone=currentItem.count-1
        await axios.patch(`${URL}/${id}`,{count:newone});
        fetchData();
      } catch (error) {
        console.error('Error updating item count:', error);
      }
    };
    const checkout = async () => {
      try {
        alert("Your Purchase Finished")
        alert("Happy  Shopping!!!🎉🎉🎉")
        alert("Redirecting to your payment app")
        nav('/')
      } catch (error) {
        console.error('Error updating item count:', error);
      }
    };

  return (
    <div className='cart-container'>
      <h1 style={{fontSize:'50px'}}>Guru's Store of Mystery - Cart</h1>
      <div className='cart-items'>
        {items.map((data) => (
            data.count>0 && 
        <div className='cart-each-item'>
            <div className='cart-image-container'>
              <img src={data.image} width='100px' height='100px' alt='' className='cart-image' />
            </div>
            <div className='cart-item-details'>
              <h2>{data.name}</h2>
              <h3>${data.price}</h3>
              <div className='cart-button-container'>
                <button className='cart-item-button' onClick={()=>{increment(data.id)}}>+</button>
                <span>{data.count}</span>
                <button className='cart-item-button' onClick={()=>{decrement(data.id)}}>-</button>
              </div>
            </div>
          </div>
        
        ))}
      </div>
          <h1>Count : {totalcount}</h1> <h1>Amount : {totalamount}</h1>
        <Link to='/'><button style={{marginRight:'50px'}} className='main-item-button'>Continue Shopping</button></Link>
        <button className='main-item-button' onClick={()=>checkout()}>Check Out</button>
    </div>
  )
}

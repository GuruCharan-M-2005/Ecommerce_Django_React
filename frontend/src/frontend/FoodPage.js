import React, { useEffect, useState }  from 'react'
import axios from 'axios';
import './FoodPage.css'

export default function FoodPage() {

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [totalcount,setTotalcount]=useState(0)
    const [totalamount,setTotalamount]=useState(0)
    const URL = "http://localhost:8000/food/";

    const [showShop,setShowShop]=useState(true)
    const [showCart,setShowCart]=useState(false)
    // const [showLogin,setShowLogin]=useState(false)
    // const [showSignUp,setShowSignUp]=useState(false)

    const fetchData = async () => {
        try {
          const response = await axios.get(URL);
          const temp=response.data
          var count=0,sum=0;
          temp.forEach((data) => {
            count=count+(data.count);
            sum=sum+(data.count*data.price);
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

  const filterData = async (type) => {
    try {
      const response = await axios.get(`${URL}filter/${type}/`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
};

  const additemtocart = async (id) => {
    try {
      await axios.patch(`${URL}increment/${id}/`);
      setShowCart(true)
      setShowShop(false)
      fetchData();
    } catch (error) {
      console.error('Error updating item count:', error);
    }
  };

  const increment = async (id) => {
    try {
      axios.patch(`${URL}increment/${id}/`);
      fetchData();
    } catch (error) {
      console.error('Error updating item count:', error);
    }
  };

  const decrement = async (id) => {
    try {
      await axios.patch(`${URL}decrement/${id}/`);
      fetchData();
    } catch (error) {
      console.error('Error updating item count:', error);
    }
  };
  const removeFromCart = async (id) => {
    try {
      await axios.patch(`${URL}remove/${id}/`);
      fetchData();
    } catch (error) {
      console.error('Error updating item count:', error);
    }
  };

  const checkout = async () => {
    try {
      await axios.patch(`${URL}checkout/`);
      alert("Your Purchase Finished")
      alert("Happy  Shopping!!!🎉🎉🎉")
      alert("Redirecting to your payment app")
      setShowCart(false)
      setShowShop(true)
    } catch (error) {
      console.error('Error updating item count:', error);
    }
  };


  return (
    <div>
      {showShop ? 
      <div className='main-container'>
          <h1 style={{fontSize:'50px',marginBottom:'5.5vh'}}>Food Buzz</h1>
          <input className='search-text-box' type='text' value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search...'></input>
          <div className='filter-bar'>
            <button className='filter-button' onClick={()=>fetchData()}>All</button>
            <button className='filter-button' onClick={()=>filterData("briyani")}>Briyani</button>
            <button className='filter-button' onClick={()=>filterData("shawarma")}>Shawarma</button>
            <button className='filter-button' onClick={()=>filterData("chinese")}>Chinese</button>
            <button className='filter-button' onClick={()=>filterData("salad")}>Salad</button>
            <button className='filter-button' onClick={()=>filterData("noodles")}>Noodles</button>
            <button className='filter-button' onClick={()=>filterData("pizza")}>Pizza</button>
            <button className='filter-button' onClick={()=>filterData("dessert")}>Desserts</button>
          </div>
           <div className='main-items'>
              {items
              .filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
              .map((data) => (
                <div className='main-each-item'>
                  <img src={data.image} width='200px' height='200px' alt='' className='main-image' />
                  <h2 className='main-item-text1'>{data.name}</h2>
                  <h3 className='main-item-text2'>₹{data.price}</h3>
                  <div className='button-container'> 
                    <button className='main-item-button' onClick={() => additemtocart(data.id)}>Add to Cart</button>
                  </div>
                </div>
              ))} 
          </div> 
      </div>
        : <div></div>}
      {showCart ? 
      <div className='cart-container'>
      <h1 style={{fontSize:'50px',marginBottom:'5.5vh'}}>Your Cart</h1>
          <div className='cart-items'>
            {items.map((data) => (
              data.count>0 && 
              <div className='cart-each-item'>
                <div className='cart-image-container'>
                  <img src={data.image} width='100px' height='100px' alt='' className='cart-image' />
                </div>
                <div className='cart-item-details'>
                  <h2 className='cart-item-text'>{data.name}</h2>
                  <h3 className='cart-item-text'>₹{data.price}</h3>
                  <div className='cart-button-container'>
                    <button className='cart-item-button' onClick={()=>{increment(data.id)}}>+</button>
                    <span>{data.count}</span>
                    <button className='cart-item-button' onClick={()=>{decrement(data.id)}}>-</button>
                    <button className='cart-item-button' onClick={()=>{removeFromCart(data.id)}}>X</button>
                  </div>
                </div>
              </div>

            ))}
          </div>
          <div className='cart-footer-text'><h1>Count : {totalcount}</h1> <h1>Amount : ₹{totalamount}</h1></div>
        <div className='cart-footer-button'><button style={{marginRight:'50px'}} className='main-item-button' onClick={()=>{setShowCart(false);setShowShop(true);}}>Continue Shopping</button>
        <button className='main-item-button' onClick={()=>checkout()}>Check Out</button></div>
      </div>
      : <div></div>}
  </div>
  )
}

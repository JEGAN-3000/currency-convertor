
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [amount,setAmount]=useState(1);
  const [fromCurrency,setFromCurrency]=useState("USD");
  const [toCurrency,setToCurrency]=useState("INR");  
  const [convertedAmount,setConvertedAmount]=useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(()=>{
    const getExchangeRate=async () =>{
      try{
        let url=`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        const response=await axios.get(url)
        setExchangeRate(response.data.rates[toCurrency])
      }
      catch(error) 
      {
        console.error(error)
      }
    }
    getExchangeRate();
    
  },[fromCurrency,toCurrency])
  const handleAmountChange=e=>{
    const value=parseFloat(e.target.value);
    setAmount(isNaN(value)? 0 : value);
  }
  useEffect(()=>{
    if(exchangeRate !==null)
    {
      setConvertedAmount((amount * exchangeRate).toFixed(2))
    }
  },[amount,exchangeRate])
  return (
    <>
    <div className="currency_Container">
      <div className="box" data-aos="zoom-out-up" data-aos-duration="1000"></div>
      <div className="data" >
        <h1 data-aos="zoom-out-up" data-aos-duration="1000" >Currency Convertor</h1>
        <div className="input_Container" data-aos="fade-right" data-aos-duration="1000">
          <label htmlFor="amount">Amount: </label>
          <input type="number" id="amount" name="amount" value={amount} onChange={handleAmountChange}/>
        </div>
        <div className="input_Container" data-aos="fade-left" data-aos-duration="1000">
          <label htmlFor="fromCurrency">From Currency :</label>
          <select name="fromCurrency" id="fromCurrency" value={fromCurrency} onChange={e=>setFromCurrency(e.target.value)}>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>          
          </select>
        </div>
        <div className="input_Container" data-aos="fade-right" data-aos-duration="1000">
          <label htmlFor="toCurrency">To Currency :</label>
          <select name="toCurrency" id="toCurrency" value={toCurrency} onChange={e=>setToCurrency(e.target.value)}>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>          
          </select>
        </div>
        <div className="result" data-aos="zoom-in" data-aos-duration="1000">
          <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
        </div>
      </div>
      <p className='copyright' data-aos="fade-up"
     data-aos-duration="1000">
          Designed by <span>Jegan</span>
        </p>
    </div>
      
    </>
  )
}

export default App

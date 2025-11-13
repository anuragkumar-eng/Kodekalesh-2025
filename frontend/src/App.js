import React, { useState } from 'react';
import './App.css';

function App() {

  // --- OUR STATE VARIABLES ---
  const [selectedMood, setSelectedMood] = useState(null);
  const [address, setAddress] = useState(null); // NEW: This will store the user's wallet address

  // --- NEW WALLET FUNCTION ---
  const connectWallet = async () => {
    // Check if the Petra wallet extension is installed
    if ('aptos' in window) {
      try {
        // Ask the wallet to connect to our app
        const response = await window.aptos.connect();
        
        // 'response' will be an object with the address and publicKey
        setAddress(response.address);
        
      } catch (error) {
        // This will happen if the user clicks "Reject" in their wallet
        console.error(error);
      }
    } else {
      // If the wallet isn't installed, open a new tab to its website
      window.open('https://petra.app/', '_blank');
    }
  };

  // --- YOUR EXISTING FORM FUNCTIONS ---
  const handleMoodChange = (event) => {
    setSelectedMood(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    
    if (!address) {
      alert("Please connect your wallet first.");
      return;
    }
    
    if (selectedMood) {
      alert(`Wallet: ${address} \nSelected mood: ${selectedMood} \n(Next, we will send this to AWS and mint your token)`);
    } else {
      alert("Please select a mood before submitting.");
    }
  };

  return (
    <div className="App">
      
      {/* 1. THIS IS YOUR NAVBAR (NOW UPDATED) */}
      <nav className="navbar">
        <span className="navbar-brand">AuraChain</span>
        
        {/*
          This is a conditional button.
          - If 'address' is null (not connected), it shows "Connect Wallet".
          - If 'address' is set, it shows a shortened version of the user's address.
        */}
        {address ? (
          <button className="login-button" style={{cursor: 'default'}}>
            {/* Show first 6 and last 4 chars of the address */}
            {`${address.slice(0, 6)}...${address.slice(-4)}`}
          </button>
        ) : (
          <button className="login-button" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </nav>

      <main className="main-content">
        
        {/* 2. This is your Check-in Form */}
        <div className="check-in-form">
          <h2>Daily Wellness Check-in</h2>
          
          <form onSubmit={handleSubmit}>
            <label>How are you feeling today? (1=Stressed, 5=Great)</label>
            
            <div className="mood-radios">
              <label><input type="radio" name="mood" value="1" onChange={handleMoodChange} /> 1</label>
              <label><input type="radio" name="mood" value="2" onChange={handleMoodChange} /> 2</label>
              <label><input type="radio" name="mood" value="3" onChange={handleMoodChange} /> 3</label>
              <label><input type="radio" name="mood" value="4" onChange={handleMoodChange} /> 4</label>
              <label><input type="radio" name="mood" value="5" onChange={handleMoodChange} /> 5</label>
            </div>
            
            <button type="submit" className="submit-button">
              Submit & Earn WELL Token
            </button>
          </form>
        </div>

        {/* 3. This will be your data dashboard later */}
        <div className="dashboard">
          <h3>My Wellness Dashboard</h3>
          <p>My WELL Token Balance: 0</p>
          <p>My Average Mood: (Coming Soon)</p>
        </div>

      </main>
    </div>
  );
}

export default App;
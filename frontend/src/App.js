// AT THE TOP: We import 'useState' from React
import React, { useState } from 'react';
import './App.css'; // This line imports the CSS file you just made

function App() {

  // --- NEW FEATURE 1: 'STATE' ---
  // We create a "state variable" to remember the user's choice.
  // 'selectedMood' will store the number (1-5).
  // 'setSelectedMood' is the function we use to update it.
  const [selectedMood, setSelectedMood] = useState(null); // Default is null (nothing selected)

  // --- NEW FEATURE 2: 'EVENT HANDLERS' ---
  
  // This function runs every time the user clicks a different radio button
  const handleMoodChange = (event) => {
    setSelectedMood(event.target.value); // Sets 'selectedMood' to the value (e.g., "3")
  };

  // This function runs when the user clicks the "Submit" button
  const handleSubmit = (event) => {
    event.preventDefault(); // Stops the webpage from reloading (default form behavior)
    
    if (selectedMood) {
      alert(`You selected mood: ${selectedMood}! \n(Next, we will send this to AWS and mint your token)`);
    } else {
      alert("Please select a mood before submitting.");
    }
  };

  return (
    <div className="App">
      
      {/* 1. This is your Navbar */}
      <nav className="navbar">
        <span className="navbar-brand">AuraChain</span>
        <button className="login-button">Login</button>
      </nav>

      <main className="main-content">
        
        {/* 2. This is your Check-in Form */}
        <div className="check-in-form">
          <h2>Daily Wellness Check-in</h2>
          
          {/* We hook our 'handleSubmit' function to the form's 'onSubmit' event */}
          <form onSubmit={handleSubmit}>
            <label>How are you feeling today? (1=Stressed, 5=Great)</label>
            
            {/* We hook our 'handleMoodChange' function to the radio buttons */}
            <div className="mood-radios">
              <label>
                <input type="radio" name="mood" value="1" onChange={handleMoodChange} /> 1
              </label>
              <label>
                <input type="radio" name="mood" value="2" onChange={handleMoodChange} /> 2
              </label>
              <label>
                <input type="radio" name="mood" value="3" onChange={handleMoodChange} /> 3
              </label>
              <label>
                <input type="radio" name="mood" value="4" onChange={handleMoodChange} /> 4
              </label>
              <label>
                <input type="radio" name="mood" value="5" onChange={handleMoodChange} /> 5
              </label>
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
import './App.css'; // This line imports the CSS file you just made

function App() {
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
          <form>
            <label>How are you feeling today? (1=Stressed, 5=Great)</label>
            <div className="mood-radios">
              <label><input type="radio" name="mood" value="1" /> 1</label>
              <label><input type="radio" name="mood" value="2" /> 2</label>
              <label><input type="radio" name="mood" value="3" /> 3</label>
              <label><input type="radio" name="mood" value="4" /> 4</label>
              <label><input type="radio" name="mood" value="5" /> 5</label>
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
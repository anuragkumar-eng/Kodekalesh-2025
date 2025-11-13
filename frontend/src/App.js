import './App.css';

function App() {
  return (
    <div className="App">
      {/* 1. This is your Navbar */}
      <nav style={{ 
        width: '100%', 
        padding: '1rem', 
        backgroundColor: '#282c34', 
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <h3>AuraChain</h3>
        <button style={{ padding: '0.5rem 1rem' }}>Login</button>
      </nav>

      <main style={{ padding: '2rem' }}>
        <h2>Daily Wellness Check-in</h2>
        
        {/* 2. This is your Check-in Form */}
        <form>
          <label>How are you feeling today? (1=Stressed, 5=Great)</label>
          <div style={{ margin: '1rem 0' }}>
            <input type="radio" name="mood" value="1" /> 1
            <input type="radio" name="mood" value="2" /> 2
            <input type="radio" name="mood" value="3" /> 3
            <input type="radio" name="mood" value="4" /> 4
            <input type="radio" name="mood" value="5" /> 5
          </div>
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>
            Submit & Earn WELL Token
          </button>
        </form>

        {/* 3. This will be your data dashboard later */}
        <div style={{ marginTop: '3rem' }}>
          <h3>My Wellness Dashboard</h3>
          <p>My WELL Token Balance: 0</p>
          <p>My Average Mood: (Coming Soon)</p>
        </div>
      </main>
    </div>
  );
}

export default App;
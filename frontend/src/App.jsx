function App() {
  return (
    <div className="app">
      <header className="navbar">
        <div className="logo" onClick={() => window.location.reload()}>MELOUD</div>
        <nav className="nav-links">
          <span>ACCOUNT</span>
          <span>WILL</span>
          <span>MEMORIAL</span>
          <span>Profile</span>
        </nav>
      </header>
      <main className="hero">
        <div className="image-placeholder"></div>
        <h1>Become a <span className="highlight">star</span><br />in the <span className="highlight">MELOUD</span> sky.</h1>
        <p>Write your will, share your love, and let your story live on beyond time.</p>
        <button onClick={() => alert('Login page (준비 중)')}>Shine On with Meloud →</button>
      </main>
    </div>
  )
}

export default App

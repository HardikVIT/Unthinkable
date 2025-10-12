import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Header from './pages/header/header'; 

function App() {
  return (
    <Router>
      <div className="app">
        <Header /> 
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
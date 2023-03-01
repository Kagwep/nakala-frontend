
import './App.css';
import UsersPage from './pages/HomePage';
import UserDetails from './pages/UserDetails';
import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route  path="/" element={<UsersPage />} exact />
          <Route path="/user/:id" element={< UserDetails/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;

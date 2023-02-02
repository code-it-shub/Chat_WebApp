import Register from "./pages/Register";
import "./App.scss";
import Login from "./pages/Login";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { currUser } = useContext(AuthContext);
  const ProtectRoute = ({ children }) => {
    if (!currUser) {
      return <Navigate to='/login'/>
    }
    return children;
  };
  return (
    <Router>
      <Routes>
        <Route path="/" />
        <Route index element={<ProtectRoute><Home /></ProtectRoute>}/>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

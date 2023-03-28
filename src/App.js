import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import axios from "axios";
import Auth from "./components/Auth";
import ChatMain from "./components/ChatMain";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/galactchat/login"
            element={<Auth isRegister={false} />}
          />
          <Route
            path="/galactchat/register"
            element={<Auth isRegister={true} />}
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ChatMain />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

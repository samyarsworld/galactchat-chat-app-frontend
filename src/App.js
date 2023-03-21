import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./components/Login";
import Register from "./components/Register";
import ChatMain from "./components/ChatMain";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/galactchat/login" element={<Login />} />
          <Route path="/galactchat/register" element={<Register />} />
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

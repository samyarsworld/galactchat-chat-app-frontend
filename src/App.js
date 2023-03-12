import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
          <Route path="/" element={<ChatMain />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

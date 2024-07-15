import './App.css';
import Auth from "./components/Auth";
import ChatMain from "./components/ChatMain";

import { useSelector } from "react-redux";

function App() {
  const { authenticate } = useSelector((state) => state.auth);
  if (!authenticate) {
    return <Auth />;
  }
  return <ChatMain />;
}

export default App;

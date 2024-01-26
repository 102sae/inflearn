import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
      </Routes>
      <div>
        <Link to="/">Home</Link>
        <Link to="/edit">Edit</Link>
        <Link to="/new">New</Link>
        <Link to="/diary">Diary</Link>
      </div>
    </div>
  );
}

export default App;

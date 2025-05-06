import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:chatId" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/login/:mode" element={<Login />} />
        </Routes>
        <Toaster position="bottom-right" />
        <Footer />
      </div>
    </>
  );
}

export default App;

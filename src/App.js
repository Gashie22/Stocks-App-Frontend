import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Productspage from "./pages/Productspage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Productspage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

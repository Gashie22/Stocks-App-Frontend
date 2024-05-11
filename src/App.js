import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/HomePage";
import Productspage from "./pages/ProductsPage";
// import UserLogin from "./pages/UserLogin";
// import UserLogin from "./pages/UserLogin";
import UserLogin from "./pages/UserLogin1";
import UserRegister from "./pages/UserRegister";
import CartPage from "./pages/CartPage";
import ClientsBill from "./pages/ClientsBill";
import CustomerPage from "./pages/CustomerPage";
// import { ProtectedRoute } from "./pages/ProtectRoutes";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <ProtectedRoute> */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />

          {/* </ProtectedRoute> */}
          <Route path="/products" element={<Productspage />} />
          <Route path="/sales" element={<CartPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/bills" element={<ClientsBill />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/register" element={<UserRegister />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  if (localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

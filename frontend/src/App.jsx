import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedAdminRoute from "./pages/admin/ProtectedAdminRoute";
import AddFruit from "./pages/admin/AddFruit";
import ManageFruits from "./pages/admin/ManageFruits";
import EditFruit from "./pages/admin/EditFruit";
import ManageOrders from "./pages/admin/ManageOrders";

import { CartProvider } from "./context/CartContext";
import TrackOrder from "./pages/TrackOrder";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>

          {/* Customer Website */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/track-order" element={<TrackOrder />} />
          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Pages */}
          <Route element={<ProtectedAdminRoute />}>
            <Route
              path="/admin/dashboard"
              element={<AdminDashboard />}
            />

            <Route
              path="/admin/add-fruit"
              element={<AddFruit />}
            />

            <Route
              path="/admin/manage-fruits"
              element={<ManageFruits />}
            />

            <Route
              path="/admin/edit-fruit/:id"
              element={<EditFruit />}
            />

            <Route
              path="/admin/manage-orders"
              element={<ManageOrders />}
            />

          </Route>



        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
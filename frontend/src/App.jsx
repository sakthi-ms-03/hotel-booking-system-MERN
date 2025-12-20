import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AdminRoute from "./admin/AdminRoute";
import Dashboard from "./admin/pages/dashboard/Dashboard";
import AddHotel from "./admin/pages/addHotel/AddHotel";
import Hotels from "./admin/pages/hotels/Hotels";
import Users from "./admin/pages/users/Users";
import axios from "axios";
import AddRoom from "./admin/pages/addRoom/AddRoom";
import EditHotel from "./admin/pages/editHotel/EditHotel";
import Rooms from "./admin/pages/rooms/Rooms";
import History from "./pages/history/History";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/admin/add-hotel" element={<AdminRoute><AddHotel /></AdminRoute>} />
        <Route path="/admin/hotels" element={<AdminRoute><Hotels /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
        <Route path="/admin/add-room" element={<AdminRoute><AddRoom /></AdminRoute>}/>
        <Route path="/admin/edit-hotel" element={<AdminRoute><EditHotel /></AdminRoute>}/>
        <Route path="/admin/rooms" element={<Rooms />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

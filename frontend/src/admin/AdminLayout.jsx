import { Link } from "react-router-dom";
import "./adminLayout.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="adminLayout">
      {/* SIDEBAR */}
      <aside className="adminSidebar">
        <h2 className="adminLogo">Heaven Admin</h2>

        <ul className="adminMenu">
          <li>
            <Link to="/admin">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/users">View Users</Link>
          </li>
          <li>
            <Link to="/admin/hotels">View Hotels</Link>
          </li>
          <li>
            <Link to="/admin/add-hotel">Add Hotel</Link>
          </li>
          <li>
            <Link to="/admin/edit-hotel">Edit Hotel</Link>
          </li>
          <li>
            <Link to="/admin/add-room">Add Room</Link>
          </li>
          <li>
            <Link to="/admin/rooms">Rooms & Reservations</Link>
          </li>
        </ul>
      </aside>

      {/* MAIN AREA */}
      <main className="adminMain">
        <header className="adminHeader">
          <h3>Admin Panel</h3>
        </header>

        <section className="adminContent">{children}</section>
      </main>
    </div>
  );
};

export default AdminLayout;

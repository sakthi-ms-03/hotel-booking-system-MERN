import AdminLayout from "../../AdminLayout";
import { Link } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="dashboard">
        <h1 className="dashboardTitle">Admin Dashboard</h1>
        <p className="dashboardSub">
          Welcome! You have full control over the system.
        </p>

        <div className="dashboardGrid">
          <Link to="/admin/users" className="dashboardCard">
            View Users
          </Link>

          <Link to="/admin/hotels" className="dashboardCard">
            View Hotels
          </Link>

          <Link to="/admin/add-hotel" className="dashboardCard">
            Add Hotel
          </Link>

          <Link to="/admin/edit-hotel" className="dashboardCard">
            Edit Hotel
          </Link>

          <Link to="/admin/add-room" className="dashboardCard">
            Add Room
          </Link>

          <Link to="/admin/rooms" className="dashboardCard">
            Rooms & Reservations
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;

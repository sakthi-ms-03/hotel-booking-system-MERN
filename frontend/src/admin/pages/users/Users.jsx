import useFetch from "../../../hooks/useFetch";
import axios from "axios";
import AdminLayout from "../../AdminLayout";
import { useState } from "react";
import "./users.css";

const Users = () => {
  const { data: users, reFetch } = useFetch("/backend/users");
  const [reservations, setReservations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await axios.delete(`/backend/users/${id}`, { withCredentials: true });
    reFetch();
  };

  const viewReservations = async (userId) => {
    const res = await axios.get(
      `/backend/reservations/user/${userId}`,
      { withCredentials: true }
    );
    setReservations(res.data);
    setSelectedUser(userId);
  };

  return (
    <AdminLayout>
      <div className="usersPage">
        <h2 className="usersTitle">Users</h2>

        <div className="usersList">
          {users?.map((user) => (
            <div key={user._id} className="userCard">
              <div className="userInfo">
                <h4>{user.username}</h4>
                <p>{user.email}</p>
              </div>

              <div className="userActions">
                <button
                  className="viewBtn"
                  onClick={() => viewReservations(user._id)}
                >
                  View Reservations
                </button>

                <button
                  className="deleteUserBtn"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedUser && (
          <div className="reservationSection">
            <h3>User Reservation History</h3>

            {reservations.length === 0 ? (
              <p>No reservations found</p>
            ) : (
              reservations.map((r) => (
                <div key={r._id} className="reservationCard">
                  <p><b>Hotel:</b> {r.hotelId.name}</p>
                  <p><b>City:</b> {r.hotelId.city}</p>
                  <p><b>Room:</b> {r.roomId.title}</p>
                  <p><b>Room No:</b> {r.roomNumber}</p>
                  <p>
                    <b>Dates:</b>{" "}
                    {new Date(r.startDate).toDateString()} -{" "}
                    {new Date(r.endDate).toDateString()}
                  </p>
                  <p><b>People:</b> {r.people}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Users;

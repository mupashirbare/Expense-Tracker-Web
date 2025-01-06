import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProfileForm from "./EditProfileForm";

const Profile = ({ isCollapsed }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch("http://localhost:5000/api/users/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setShowEditForm(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>No user data available</p>;
  }

  return (
    <div className={`transition-all duration-300  bg-gray-150 min-h-screen p-6 ${isCollapsed ? "md:pl-20 pl-16" : "md:pl-72 pl-64"}`}>
      <div className="bg-white p-6 rounded-lg shadow-md border border-blue-700 max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Profile</h2>
        <div className="mb-6">
          <p className="text-xl font-semibold text-gray-700">Name: {user.name}</p>
          <p className="text-xl font-semibold text-gray-700">Email: {user.email}</p>

        </div>

        <button
          onClick={handleEditClick}
          className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-gray-700 transition-all"
        >
          Edit Profile
        </button>
      </div>

      {showEditForm && <EditProfileForm user={user} setShowEditForm={setShowEditForm} />}
    </div>
  );
};

export default Profile;

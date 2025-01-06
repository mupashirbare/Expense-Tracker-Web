import React, { useState } from "react";

const EditProfileForm = ({ user, setShowEditForm }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setShowEditForm(false);
        alert("Profile updated successfully");
      } else {
        alert("Error updating profile");
      }
    } catch (error) {
      alert("Error updating profile");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">Edit Profile</h3>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            Save Changes
          </button>
        </form>
        <button
          onClick={() => setShowEditForm(false)}
          className="mt-4 w-full px-6 py-2 bg-gray-300 text-black rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfileForm;

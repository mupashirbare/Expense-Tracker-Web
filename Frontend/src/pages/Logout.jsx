import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(true); // Open dialog when this component is rendered
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session data
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");

    // Redirect to login page
    navigate("/login"); // Adjust the path to your actual login page path
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <div>
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h3 className="text-lg font-semibold">Are you sure you want to log out?</h3>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={()=>toggleDialog("/dashboard")}
                
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;

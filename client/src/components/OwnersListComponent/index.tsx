import React, { useContext, useEffect, useState } from "react";
import { getAllUsersFetch, removeUserFetch, postUpdateUserStatus } from "@/app/lib/server/fetchAdmin";
import { concertOne } from "@/app/lib/server/fonts";
import { IUser } from "@/interfaces/interfaces";
import Swal from "sweetalert2";
import { UserContext } from "../../context/user"; 
import Image from "next/image";
// Importar iconos de FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const OwnersListComponent: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { user } = useContext(UserContext);

  const role = user && user.role; 

  if (!role || role !== "admin") {
    Swal.fire({
      icon: "error",
      title: "Permission Denied",
      text: "You do not have permission to edit the status.",
    });
    return null;  
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getAllUsersFetch();
      if (usersData) {
        setUsers(usersData);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (removeUserId: string) => {
    try {
      const result = await removeUserFetch(removeUserId);

      if (!result.success) {
        throw new Error(result.message || "There was an issue deleting the owner.");
      }

      setUsers(users.filter((user) => user.id !== removeUserId));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The owner has been successfully deleted.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while trying to delete the user.",
      });
    }
  };

  const handleEditStatus = async (updateUserStatusId: string) => {
    if (!role) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Role information is not available.",
      });
      return;
    }

    const { value: newStatus } = await Swal.fire({
      title: "Edit Status",
      input: "text",
      inputPlaceholder: "Enter new status",
      showCancelButton: true,
    });

    if (newStatus) {
      try {
        const updateUserInput = { status: newStatus };
        const result = await postUpdateUserStatus(updateUserStatusId, updateUserInput);

        if (result.success) { 
          setUsers(users.map(user => user.id === updateUserStatusId ? { ...user, status: newStatus } : user));
          Swal.fire("Updated!", "User status has been updated.", "success");
        } else {
          Swal.fire("Error", result.message || "Failed to update user status.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to update user status.", "error");
      }
    }
  };

  return (
    <div>
      <section className="mb-12">
        <h2 className={`${concertOne.className} text-2xl font-semibold mb-6 text-[#B17457]`}>Owners</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center">
                <Image
                  src={user.userImg || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                  alt={`${user.firstname} ${user.lastname}`}
                  className="w-16 h-16 rounded-full mr-4 border-2 border-gray-300"
                  width={30}
                  height={30}
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#B17457]">
                    {user.firstname} {user.lastname}
                  </h3>
                  <p className="text-gray-600">Email: {user.credentials?.email}</p> 
                  <p className="text-gray-600">Address: {user.address}</p>
                  <p className="text-gray-600">Status: {user.status}</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button onClick={() => handleDelete(user.id)} className="text-red-500 text-2xl">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button onClick={() => handleEditStatus(user.id)} className="text-blue-500 text-2xl">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OwnersListComponent;

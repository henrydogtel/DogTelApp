import React, { useContext, useEffect, useState } from "react";
import { removeUserFetch, updateSitterStatus, fetchAllSitters } from "@/app/lib/server/fetchAdmin";
import { concertOne } from "@/app/lib/server/fonts";
import { ISitter } from "@/interfaces/interfaces";
import Swal from "sweetalert2";
import { UserContext } from "../../context/user"; 
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const SittersListComponent: React.FC = () => {
  const [sitters, setSitters] = useState<ISitter[]>([]);
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
    const fetchSitters = async () => {
      const sittersData = await fetchAllSitters();
      if (sittersData) {
        setSitters(sittersData);
      }
    };

    fetchSitters();
  }, []);

  const handleDelete = async (sitterId: string) => {
    try {
      const result = await removeUserFetch(sitterId);

      if (!result.success) {
        throw new Error(result.message || "There was an issue deleting the sitter.");
      }

      setSitters(sitters.filter((sitter) => sitter.id !== sitterId));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The sitter has been successfully deleted.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while trying to delete the sitter.",
      });
    }
  };

  const handleEditStatus = async (sitterId: string) => {
    const { value: newStatus } = await Swal.fire({
      title: "Edit Status",
      input: "text",
      inputPlaceholder: "Enter new status",
      showCancelButton: true,
    });
  
    if (newStatus) {
      try {
        // Aquí enviamos solo el valor de 'newStatus' como un string, no como un objeto
        const result = await updateSitterStatus(sitterId, newStatus); // Cambié aquí
  
        if (result.success) { 
          setSitters(sitters.map(sitter => sitter.id === sitterId ? { ...sitter, status: newStatus } : sitter));
          Swal.fire("Updated!", "Sitter status has been updated.", "success");
        } else {
          Swal.fire("Error", result.message || "Failed to update sitter status.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to update sitter status.", "error");
      }
    }
  };
  

  return (
    <div>
      <section className="mb-12">
        <h2 className={`${concertOne.className} text-2xl font-semibold mb-6 text-[#B17457]`}>Sitters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sitters.map((sitter, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center">
                <Image
                  src={sitter.userImg || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                  alt={`${sitter.firstname} ${sitter.lastname}`}
                  className="w-16 h-16 rounded-full mr-4 border-2 border-gray-300"
                  width={30}
                  height={30}
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#B17457]">
                    {sitter.firstname} {sitter.lastname}
                  </h3>
                  <p className="text-gray-600">Address: {sitter.address}</p>
                  <p className="text-gray-600">Status: {sitter.status}</p>
                  <p className="text-gray-600">Fee: ${sitter.fee}</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button onClick={() => handleDelete(sitter.id)} className="text-red-500 text-2xl">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button onClick={() => handleEditStatus(sitter.id)} className="text-blue-500 text-2xl">
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

export default SittersListComponent;

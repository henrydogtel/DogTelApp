import React, { useContext, useEffect, useState, useRef } from "react";
import LoadingModal from "../LoadingComponent";
import { UserContext } from "@/context/user";

// Definimos la interfaz para la información del usuario
interface User {
  firstname: string;
  lastname: string;
  address: string;
}

interface UserData {
  user: User;
  accessToken: string;
  email: string;
  role: "user" | "sitter";
}

const UserDataComponent: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
  });

  const { logOut } = useContext(UserContext);

  // Crear referencia para el modal
  const modalRef = useRef<HTMLDivElement | null>(null);

  const logOutUser = () => {
    logOut();
  };

  useEffect(() => {
    // Obtén el objeto user completo desde localStorage
    const storedData = localStorage.getItem("user");
    if (storedData) {
      const parsedData = JSON.parse(storedData) as UserData;
      setUserInfo(parsedData);
      setFormData({
        firstname: parsedData.user.firstname,
        lastname: parsedData.user.lastname,
        email: parsedData.email,
        address: parsedData.user.address,
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = () => {
    // Actualizar la información en localStorage
    const updatedUser = {
      ...userInfo,
      user: { ...userInfo?.user, ...formData },
      email: formData.email,
    } as UserData;
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUserInfo(updatedUser);
    setIsModalOpen(false);
  };

  // Manejar clic fuera del modal
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.classList.add("overflow-hidden"); // Agregar clase para deshabilitar scroll
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("overflow-hidden"); // Quitar clase para habilitar scroll
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("overflow-hidden"); // Asegurarse de quitar la clase al desmontar
    };
  }, [isModalOpen]);

  if (!userInfo) return <LoadingModal />;

  return (
    <div>
      {/* Información del usuario */}
      <section className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-[#B17457] mb-6">
          {userInfo.role === "user" ? "User Profile" : "Sitter Profile"}
        </h2>
        <div className="inline-block bg-white p-6 shadow-lg rounded-lg">
          <p className="text-lg font-semibold text-[#B17457]">
            Name: {userInfo.user.firstname} {userInfo.user.lastname}
          </p>
          <p className="text-lg text-gray-600">Email: {userInfo.email}</p>
          <p className="text-gray-600">Address: {userInfo.user.address}</p>
        </div>
      </section>
      <section className="flex justify-center gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#B17457] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#9b5e47] transition-colors"
        >
          Edit Profile
        </button>
        <button
          onClick={logOutUser}
          className="bg-[#B17457] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#9b5e47] transition-colors"
        >
          Log Out
        </button>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
          >
            <h3 className="text-2xl font-semibold text-center mb-4">
              Edit Profile
            </h3>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                placeholder="First Name"
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="border border-gray-300 p-2 rounded"
              />
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="bg-[#B17457] text-white px-4 py-2 rounded hover:bg-[#9b5e47] transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDataComponent;

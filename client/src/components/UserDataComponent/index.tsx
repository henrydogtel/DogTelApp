import React, { useContext, useEffect, useState, useRef } from "react";
import LoadingModal from "../LoadingComponent";
import { UserContext } from "@/context/user";
import React, { useEffect, useState } from "react";
import { 
  uploadUserImage, 
  updateUserImage, 
  updateUserProfile, 
  fetchUserProfileByEmail, 
  fetchSitterProfileByEmail, 
  updateSitterProfile, 
  updateSitterImage
} from '../../app/lib/server/fetchUsers';

interface User {
  id: string;
  firstname: string;
  lastname: string;
  address: string;
  userImg?: string; 
}

interface UserData {
  user: User;
  accessToken: string;
  email: string;
  role: "user" | "sitter";
  id: string;
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
  const [imageUrl, setImageUrl] = useState<string | null>(null); 
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    const fetchUserData = async () => {
      const storedData = localStorage.getItem("user");
      if (storedData) {
        const parsedData = JSON.parse(storedData) as UserData;
  
        try {
          let userDataFromDb = null;
          if (parsedData.role === "user") {
            userDataFromDb = await fetchUserProfileByEmail(parsedData.email);
          } else if (parsedData.role === "sitter") {
            userDataFromDb = await fetchSitterProfileByEmail(parsedData.email);
          }
  
          console.log("Fetching user data by email:", parsedData.email);
  
          if (userDataFromDb) {
            const updatedUserInfo: UserData = {
              user: userDataFromDb, 
              accessToken: parsedData.accessToken,
              email: parsedData.email, 
              role: parsedData.role, 
              id: parsedData.id 
            };
  
            setUserInfo(updatedUserInfo);
            setImageUrl(userDataFromDb.userImg || null); 
            localStorage.setItem("user", JSON.stringify(updatedUserInfo));
  
            setUserData({
              firstname: userDataFromDb.firstname,
              lastname: userDataFromDb.lastname,
              address: userDataFromDb.address,
            });
          } else {
            console.error("No user data found for the email:", parsedData.email);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
  
    fetchUserData();
  }, []);
  
  // Para editar perfil
  const handleChangeUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    try {
        if (!userInfo?.user.id) throw new Error("User ID no disponible");

        const updatedFields = {
            firstname: userData.firstname || userInfo.user.firstname, 
            lastname: userData.lastname || userInfo.user.lastname,
            address: userData.address || userInfo.user.address,
        };

        // Si el rol es "sitter", actualiza usando la mutación updateSitterProfile
        if (userInfo.role === "sitter") {
            await updateSitterProfile(
                userInfo.user.id,          
                updatedFields.firstname,    
                updatedFields.lastname,     // Apellido
                updatedFields.address,      // Dirección
               
            );
        } else {
            // Si el rol es "user", actualiza usando la mutación updateUserProfile
            await updateUserProfile(
                userInfo.user.id,          
                updatedFields.firstname,    
                updatedFields.lastname,     
                updatedFields.address,      

            );
        }

        console.log("Perfil actualizado:", updatedFields);
        setUserInfo((prev) => prev && { 
            ...prev, 
            user: { 
                ...prev.user, 
                ...updatedFields 
            } 
        });
        setIsEditing(false);
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
    }
};



  // Subida de imágenes
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !userInfo) return;
    const file = event.target.files[0];
    console.log('User Info:', userInfo);
    console.log('user id:', userInfo.user.id);
    
    try {
      const uploadedUrl = await uploadUserImage(file); // Subir la imagen
      console.log('User ID antes de la actualización de la imagen:', userInfo.user.id);
      
      // Determinar la mutación a usar según el rol del usuario
      if (userInfo.role === "sitter") {
        await updateSitterImage(userInfo.user.id, uploadedUrl);
      } else {
        await updateUserImage(userInfo.user.id, uploadedUrl);
      }

      // Actualizar el estado con la nueva imagen
      setUserInfo((prev) => prev && { 
        ...prev, 
        user: { 
          ...prev.user, 
          userImg: uploadedUrl 
        } 
      });
      setImageUrl(uploadedUrl); 
      alert("Profile image updated successfully!");
    } catch (error) {
      console.error("Error updating profile image:", error);
      alert("Failed to update profile image.");
    }
  };

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
    <div className="flex flex-col items-center">
      <section className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-[#B17457] mb-6">
          {userInfo.role === "user" ? "User Profile" : "Sitter Profile"}
        </h2>

        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Profile"
              className="mb-4 mt-4 w-48 h-48 object-cover rounded-full border-2 border-[#B17457] mx-auto" 
            />
          )}
        </label>

        <div className="inline-block bg-white p-6 shadow-lg rounded-lg">
          {isEditing ? (
            <>
              <input
                type="text"
                name="firstname"
                placeholder="Firstname"
                value={userData.firstname}
                onChange={handleChangeUserData}
                className="text-lg font-semibold text-[#B17457] mb-2 p-2 border"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Lastname"
                value={userData.lastname}
                onChange={handleChangeUserData}
                className="text-lg font-semibold text-[#B17457] mb-2 p-2 border"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={userData.address}
                onChange={handleChangeUserData}
                className="text-lg font-semibold text-[#B17457] mb-2 p-2 border"
              />
            </>
          ) : (
            <>
              <p className="text-lg font-semibold text-[#B17457]">
                Name: {userInfo.user.firstname} {userInfo.user.lastname}
              </p>
              <p className="text-gray-600">Address: {userInfo.user.address}</p>
            </>
          )}
          <p className="text-lg text-gray-600">Email: {userInfo.email}</p>
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
      <section className="text-center flex gap-4">
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="bg-[#B17457] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#9b5e47] transition-colors"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
        {isEditing && (
          <button
            onClick={handleUpdateUser}
            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors"
          >
            Save Changes
          </button>
        )}
        <button className="bg-[#B17457] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#9b5e47] transition-colors">
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

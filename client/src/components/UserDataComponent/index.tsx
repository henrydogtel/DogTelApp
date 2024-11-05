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

  if (!userInfo) return <p className="text-center">Loading...</p>;

  return (
    <div className="flex flex-col items-center">
      <section className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-[#dc803f] mb-6">
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
                className="text-lg font-semibold text-[#dc803f] mb-2 p-2 border"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Lastname"
                value={userData.lastname}
                onChange={handleChangeUserData}
                className="text-lg font-semibold text-[#dc803f] mb-2 p-2 border"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={userData.address}
                onChange={handleChangeUserData}
                className="text-lg font-semibold text-[#dc803f] mb-2 p-2 border"
              />
            </>
          ) : (
            <>
              <p className="text-lg font-semibold text-[#dc803f]">
                Name: {userInfo.user.firstname} {userInfo.user.lastname}
              </p>
              <p className="text-gray-600">Address: {userInfo.user.address}</p>
            </>
          )}
          <p className="text-lg text-gray-600">Email: {userInfo.email}</p>
        </div>
      </section>
      <section className="text-center flex gap-4">
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="bg-[#e99953] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#f8b275] transition-colors"
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
        <button className="bg-[#e99953] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#f8b275] transition-colors">
          Log Out
        </button>
      </section>
    </div>
  );
};

export default UserDataComponent;
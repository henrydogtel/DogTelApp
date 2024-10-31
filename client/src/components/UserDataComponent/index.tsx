import React, { useEffect, useState } from "react";
import { uploadUserImage, updateUserImage } from '../../app/lib/server/fetchUsers';

interface User {
  id:string,
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
  
  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      const parsedData = JSON.parse(storedData) as UserData;
      setUserInfo(parsedData);
      console.log('User ID desde localStorage:', parsedData.id);
   
      if (parsedData.user.userImg) {
        setImageUrl(parsedData.user.userImg);
      }
      
    }
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !userInfo) return;
    const file = event.target.files[0];
    console.log('User Info:', userInfo)
    console.log('user id:',userInfo.user.id)
    try {
      const uploadedUrl = await uploadUserImage(file);
      console.log('User ID antes de la actualización de la imagen:', userInfo.user.id)
      await updateUserImage(userInfo.user.id, uploadedUrl);

    
      setUserInfo((prev) => prev && { ...prev, user: { ...prev.user, userImg: uploadedUrl } });
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
          <p className="text-lg font-semibold text-[#B17457]">
            Name: {userInfo.user.firstname} {userInfo.user.lastname}
          </p>
          <p className="text-lg text-gray-600">Email: {userInfo.email}</p>
          <p className="text-gray-600">Address: {userInfo.user.address}</p>
        </div>
      </section>
      <section className="text-center">
        <button className="bg-[#B17457] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#9b5e47] transition-colors">
          Log Out
        </button>
      </section>
    </div>

  );
};

export default UserDataComponent;

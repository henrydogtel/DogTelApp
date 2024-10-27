import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    // Obtén el objeto user completo desde localStorage
    const storedData = localStorage.getItem("user");
    if (storedData) {
      const parsedData = JSON.parse(storedData) as UserData;
      setUserInfo(parsedData);
    }
  }, []);

  if (!userInfo) return <p className="text-center">Loading...</p>;

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
      <section className="text-center">
        <button className="bg-[#B17457] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#9b5e47] transition-colors">
          Log Out
        </button>
      </section>
    </div>
  );
};

export default UserDataComponent;

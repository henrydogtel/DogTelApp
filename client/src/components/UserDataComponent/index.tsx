import React from 'react'

const UserDataComponent = () => {

      const userInfo = {
        name: "User Name",
        email: "user@example.com",
        address: "123 Main St, City, Country",
      };

  return (
    <div>
      {/* Información del usuario */}
      <section className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-[#B17457] mb-6">
          Profile
        </h2>
        <div className="inline-block bg-white p-6 shadow-lg rounded-lg">
          <p className="text-lg font-semibold text-[#B17457]">
            Name: {userInfo.name}
          </p>
          <p className="text-lg text-gray-600">Email: {userInfo.email}</p>
          <p className="text-gray-600">Address: {userInfo.address}</p>
        </div>
      </section>
      <section className="text-center">
        <button className="bg-[#B17457] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#9b5e47] transition-colors">
          Log Out
        </button>
      </section>
    </div>
  );
}

export default UserDataComponent

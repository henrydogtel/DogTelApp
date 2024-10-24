import Image from 'next/image';
import React, { useState } from 'react'

const SittersListComponent = () => {
  // Array de sitters
  const [sitters, setSitters] = useState([
    {
      id: 1,
      name: "Sitter 1",
      stars: 4.5,
      profilePic:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    {
      id: 2,
      name: "Sitter 2",
      stars: 3.8,
      profilePic:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    {
      id: 3,
      name: "Sitter 3",
      stars: 3.8,
      profilePic:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    {
      id: 4,
      name: "Sitter 4",
      stars: 3.8,
      profilePic:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    {
      id: 5,
      name: "Sitter 5",
      stars: 3.8,
      profilePic:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    {
      id: 6,
      name: "Sitter 6",
      stars: 3.8,
      profilePic:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  ]);

    const handleDeleteSitter = () => {
      const updatedSitters = sitters.filter((sitter) => sitter.id !== 1);
      setSitters(updatedSitters);
      // Aquí puedes agregar lógica para eliminar del backend también
    };


  return (
    <div>
      {/* Lista de Sitters */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-[#B17457]">Sitters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sitters.map((sitter) => (
            <div
              key={sitter.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative"
            >
              <div className="flex items-center">
                <Image
                  src={sitter.profilePic}
                  alt={sitter.name}
                  className="w-16 h-16 rounded-full mr-4 border-2 border-gray-300"
                  width={30}
                  height={30}
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#B17457]">
                    {sitter.name}
                  </h3>
                  <p className="text-gray-500">Stars: {sitter.stars}</p>
                </div>
              </div>
              <button className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
              onClick={handleDeleteSitter}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SittersListComponent

import Image from 'next/image';
import React from 'react'

const OwnersListComponent = () => {

     const owners = [
       {
         id: 1,
         name: "Owner 1",
         purchases: 10,
         profilePic:
           "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
       },
       {
         id: 2,
         name: "Owner 2",
         purchases: 5,
         profilePic:
           "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
       },
       {
         id: 3,
         name: "Owner 3",
         purchases: 5,
         profilePic:
           "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
       },
       {
         id: 4,
         name: "Owner 4",
         purchases: 5,
         profilePic:
           "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
       },
       {
         id: 5,
         name: "Owner 5",
         purchases: 5,
         profilePic:
           "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
       },
       {
         id: 6,
         name: "Owner 6",
         purchases: 5,
         profilePic:
           "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
       },
     ];


  return (
    <div>
      {/* Lista de Owners */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-[#ddf0ff]">Owners</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {owners.map((owner) => (
            <div
              key={owner.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center">
                <Image
                  src={owner.profilePic}
                  alt={owner.name}
                  className="w-16 h-16 rounded-full mr-4 border-2 border-gray-300"
                  width={30}
                  height={30}
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#B17457]">
                    {owner.name}
                  </h3>
                  <p className="text-gray-500">Purchases: {owner.purchases}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default OwnersListComponent

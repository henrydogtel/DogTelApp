import Image from 'next/image';
import React, { useState } from 'react'
import DogForm from '../DogForm';

const MyPetsComponent = () => {

      const [isModalOpen, setIsModalOpen] = useState(false);

      const pets = [
        {
          id: 1,
          name: "Fluffy",
          type: "Dog",
          image:
            "https://www.shutterstock.com/image-vector/wild-animal-veterinary-clinic-animals-260nw-2471930359.jpg",
        },
        {
          id: 2,
          name: "Buddy",
          type: "Dog",
          image:
            "https://www.shutterstock.com/image-vector/wild-animal-veterinary-clinic-animals-260nw-2471930359.jpg",
        },
      ];

      const handleAddPet = () => {
        setIsModalOpen(true);
      };

      const closeModal = () => {
        setIsModalOpen(false);
      };

      const handleOutsideClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
      ) => {
        if ((e.target as HTMLElement).id === "modalOverlay") {
          closeModal();
        }
      };

  return (
    <div>
      {/* Mascotas */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-[#B17457]">My Pets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.length > 0 ? (
            pets.map((pet) => (
              <div key={pet.id} className="bg-white p-6 rounded-xl shadow-lg">
                <Image
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-40 object-cover rounded-t-lg mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="text-xl font-semibold text-[#B17457]">
                  {pet.name}
                </h3>
                <p className="text-gray-500">Type: {pet.type}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No pets found.</p>
          )}
          <div className="flex items-center ">
            <button
              className="bg-[#B17457] text-white py-2 px-4 rounded-lg hover:bg-[#a0644f]"
              onClick={handleAddPet}
            >
              Add Pet +
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="modalOverlay"
          className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center"
          onClick={handleOutsideClick}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md overflow-y-auto max-h-[80vh]">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mb-4"
              onClick={closeModal}
            >
              X
            </button>
            <DogForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPetsComponent

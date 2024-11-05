import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import DogForm from '../DogForm';
import { UserContext } from '@/context/user';

const MyPetsComponent = () => {

      const [isModalOpen, setIsModalOpen] = useState(false);
      const {dogs, getDogs} = useContext(UserContext)
      const [idUser, setIdUser] = useState(localStorage.getItem('idUser'))

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

      useEffect(() => {
        
        if(idUser) {
          
          const data = getDogs(idUser)
        }
      },[dogs])

  return (
    <div>
      {/* Mascotas */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-[#dc803f]">My Pets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dogs && dogs.length > 0 ? (
            dogs.map((pet:any) => (
              <div key={pet.id} className="bg-white p-6 rounded-xl shadow-lg">
                <Image
                  src='https://media.istockphoto.com/id/1387833234/es/vector/silueta-de-perro-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=H1XjkMuI6ZXi9sSgFfQH16zxRxblm3Z5LDk1ee7v-0M='
                  alt={pet.name}
                  className="w-full h-40 object-cover rounded-t-lg mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="text-xl font-semibold text-[#dc803f]">
                  {pet.name}
                </h3>
                <p className="text-gray-500">Race: {pet.race}</p>
                <p className="text-gray-500">Size: {pet.size}</p>

              </div>
            ))
          ) : (
            <p className="text-gray-600">No pets found.</p>
          )}
          <div className="flex items-center ">
            <button
              className="bg-[#dc803f] text-white py-2 px-4 rounded-lg hover:bg-[#ad6c32]"
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

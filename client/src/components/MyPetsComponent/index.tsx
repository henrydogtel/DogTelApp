'use client'

import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import DogForm from '../DogForm';
import { UserContext } from '@/context/user';
import { updateDogImage } from '@/app/lib/server/fetchDog';

const MyPetsComponent:React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dogs, getDogs, removeDog } = useContext(UserContext);
  const [idUser] = useState(localStorage.getItem('idUser'));
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleAddPet = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLElement).id === "modalOverlay") {
      closeModal();
    }
  };
  const handleDeleteDog = async (dogId:string) => {
    window.confirm('Are you sure?')
    removeDog(dogId);
};

  useEffect(() => {
    if (idUser) {
      getDogs(idUser);
    }
  }, [idUser, getDogs]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>, dogId: string) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const response = await fetch(`https://api.cloudinary.com/v1_1/ddawjnvdg/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      
      if (data.secure_url) {
        await updateDogImage(dogId, data.secure_url);
      }
    }
  };

  return (
    <div>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-[#dc803f]">My Pets</h2>
  
        <div className="flex flex-col items-start">
          <div className="flex items-start space-x-4 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
              {dogs && dogs.length > 0 ? (
                dogs.map((pet: any) => (
                  <div key={pet.id} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm h-96 relative">
                    <label htmlFor={`file-upload-${pet.id}`} className="cursor-pointer">
                      <Image
                        src={pet.images[0] || 'https://media.istockphoto.com/id/1387833234/es/vector/silueta-de-perro-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=H1XjkMuI6ZXi9sSgFfQH16zxRxblm3Z5LDk1ee7v-0M='}
                        alt={pet.name}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                        width={500}
                        height={500}
                      />
                    </label>
                    <h3 className="text-xl font-semibold text-[#B17457]">{pet.name}</h3>
                    <p className="text-gray-500">Race: {pet.race}</p>
                    <p className="text-gray-500">Size: {pet.size}</p>
                    <button
                      className="bg-[#e46644] text-white py-2 px-4 rounded-lg hover:bg-[#ed6955] absolute bottom-4 right-4"
                      onClick={() => handleDeleteDog(pet.id)}
                    >
                      Delete
                    </button>
                    <input
                      id={`file-upload-${pet.id}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, pet.id)}
                      className="hidden"
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No pets found.</p>
              )}
            </div>
  
            <div className="flex-shrink-0">
              <button
                className="bg-[#f89956] text-white py-2 px-4 rounded-lg hover:bg-[#df8c51]"
                onClick={handleAddPet}
              >
                Add Pet +
              </button>
            </div>
          </div>
        </div>
      </section>
  
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

export default MyPetsComponent;

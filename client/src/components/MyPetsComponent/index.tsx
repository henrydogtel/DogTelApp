'use client'
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import DogForm from '../DogForm';
import { updateDogImage, } from '@/app/lib/server/fetchDog'; 
import Swal from 'sweetalert2';
import { UserContext } from '@/context/user';

const MyPetsComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dogs, getDogs, removeDog } = useContext(UserContext);
  const [idUser] = useState(localStorage.getItem('idUser'));
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null); 
  const [deletedDogId, setDeletedDogId] = useState<string | null>(null); 
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

  useEffect(() => {
    if (idUser) {
      getDogs(idUser);
    }
  }, [idUser,getDogs,dogs]);

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

  const handleRemoveDog = async (dogId: string) => {
    const data = await removeDog(dogId);
    if (data && data.data && data.data.removeDog && data.data.removeDog.success) {
      Swal.fire({
        icon: "success",
        title: "Dog removed successfully!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      
      const updatedDogs = (dogs || []).filter((dog: any) => dog.id !== dogId);

      getDogs(idUser!); 
    } else {
      console.error("Failed to delete dog");
      Swal.fire({
        icon: "error",
        title: "Failed to delete dog",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div>
      {/* Mensaje de confirmación */}
      {deleteMessage && (
        <div className="bg-green-500 text-white p-2 rounded mb-4 text-center">
          {deleteMessage}
        </div>
      )}

      {/* Mascotas */}
      <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-[#dc803f]">My Pets</h2>

                <div style={{margin:'1rem'}} className="flex items-center">
            <button
              className="bg-[#dc803f] text-white py-2 px-4 rounded-lg hover:bg-[#ad6c32]"
              onClick={handleAddPet}
            >
              Add Pet +
            </button>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {dogs && dogs.length > 0 ? (
            dogs
              .filter((pet: any) => pet.id !== deletedDogId) // Filtra el perro eliminado
              .map((pet: any) => (
                <div key={pet.id} className="bg-white p-6 rounded-xl shadow-lg w-96 h-96 relative">
                  <label htmlFor={`file-upload-${pet.id}`} className="cursor-pointer">
                    <Image
                      src={pet.images[0] || 'https://static.vecteezy.com/system/resources/previews/007/790/632/non_2x/silhouette-of-dog-on-white-background-free-vector.jpg'}
                      alt={pet.name}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                      width={500}
                      height={500}
                    />
                  </label>

                  <h3 className="text-xl font-semibold text-[#B17457]">{pet.name}</h3>
                  <p className="text-gray-500">Race: {pet.race}</p>
                  <p className="text-gray-500">Size: {pet.size}</p>

                  <input
                    id={`file-upload-${pet.id}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, pet.id)}
                    className="hidden"
                  />

                  {/* Botón de eliminación */}
                  <button
                    onClick={() => handleRemoveDog(pet.id)}
                    className="absolute bottom-4 right-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                  >
                    Remove Pet
                  </button>
                </div>
              ))
          ) : (
            <p className="text-gray-600">No pets found.</p>
          )}
         
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="modalOverlay"
          className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center"
          onClick={handleOutsideClick}
          style={{zIndex:1000}}
        >
          <div style={{height:'fit-content'}} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md overflow-y-auto">
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
};

export default MyPetsComponent;

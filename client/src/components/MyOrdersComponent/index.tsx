import { UserContext } from '@/context/user';
import { IAppointment } from '@/interfaces/interfaces';
import React, { useContext, useEffect, useState } from 'react';
import { FaStripe } from 'react-icons/fa'; // Importar el ícono de Stripe
import LoadingModal from '../LoadingComponent';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const url = process.env.NEXTAUTH_URL as string

const MyOrdersComponent = () => {
  const { userAppointments, getUserAppointmentsById, user } = useContext(UserContext);
  const [orders, setOrders] = useState<IAppointment[]>([]);
  const [loader,setLoader] = useState(false)

  useEffect(() => {
    // Función para obtener las citas del usuario
    async function getAppoinments() {
      if (user && user.user) {
        await getUserAppointmentsById(user?.user?.id as string);
      }
    }
    getAppoinments();
  }, [user]);

  const handlePayAppointment = async (orderId: string, totalAmount: number, sitterName: string, dogNames: string[]) => {
    // Lógica para redirigir a Stripe
    setLoader(true)
    try {
      // URL de éxito y cancelación
      const successUrl = `${url}/success`;
      const cancelUrl = `${url}/cancel`;
      
      // Llamada a la API para crear la sesión de pago en Stripe
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentId: orderId,
          totalAmount,
          sitterName,
          dogNames,
          successUrl,
          cancelUrl,
        }),
      });

      const data = await response.json();

      // Si la API devuelve una URL, redirigir al usuario a Stripe
      if (data.url) {
        setLoader(false)
        window.location.href = data.url;
      } else {
        setLoader(false)
        console.error('Error creating Stripe session:', data.error);
      }
    } catch (error) {
      setLoader(false)
      console.error('Error during payment process:', error);
    }
  };

  useEffect(() => {
    // Actualizar el estado cuando cambian las citas
    console.log(userAppointments);
    setOrders(userAppointments as IAppointment[]);
  }, [userAppointments]);

  return (
    <div>
      {/* Sección de órdenes */}
      <section className="mb-12">
        {loader && <LoadingModal />}
        <h2 className="text-2xl font-semibold mb-6 text-[#dc803f]">My Orders</h2>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          {orders.length > 0 ? (
            <ul>
              {orders.map((order) => (
                <li key={order.id} className="mb-4">
                  <div className="flex justify-between items-center bg-[#fff7dd] p-4 rounded-lg">
                    <div>
                      <h3 className="text-lg font-semibold text-[#fc955e]">
                        Order #{order.id}
                      </h3>
                      <p className="text-gray-500">Date: {order.timeIn}</p>
                      <p className="text-gray-500">Status: {order.status}</p>
                      <p className="text-gray-500">Payment: {order.payment ? 'Paid' : 'Not paid'}</p>
                      <p className="text-gray-500">Total: ${order.total}</p>
                      <p className="text-gray-500">Notes: {order.note}</p>
                      
                      {/* Botón de pagar (solo habilitado si el estado es "APPROVED") */}
                      <button
                        className={`${
                          order.status === 'APPROVED' ? 'bg-green-500' : 'bg-gray-300 cursor-not-allowed'
                        } text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-600 transition`}
                        onClick={() =>
                          handlePayAppointment(
                            order.id,
                            order.total,
                            `${order.sitter.firstname} ${order.sitter.lastname}`,
                            order.detail.map((dog) => dog.dog.name)
                          )
                        }
                        disabled={!(order.status === 'APPROVED' && !order.payment)}

                      >
                        <FaStripe className="text-xl" /> Pay with Stripe
                      </button>
                    </div>
                    
                    {/* Información del cuidador (sitter) */}
                    <div className="ml-6">
                      <h4 className="text-lg font-semibold text-[#fc955e]">Caregiver Details</h4>
                      <p className="text-gray-500">
                        <strong>Name:</strong> {order.sitter.firstname} {order.sitter.lastname}
                      </p>
                      <p className="text-gray-500">
                        <strong>Fee:</strong> ${order.sitter.fee} per hour
                      </p>
                      <p className="text-gray-500">
                        <strong>Address:</strong> {order.sitter.address}
                      </p>
                     
                      {/* Mostrar imagen del cuidador */}
                      {order.sitter.userImg &&  <img 
                    
                    src={order.sitter.userImg}
                    alt={`${order.sitter.firstname} ${order.sitter.lastname}`}
                    className="w-16 h-16 rounded-full mt-2"
                  />}
                     
                    </div>
                    
                  </div>

                  {/* Información de la(s) mascota(s) */}
                  <div className="mt-4 bg-[#f1f1f1] p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-[#fc955e]">Pet Details</h4>
                    {order && order.detail && order.detail.length > 0 ? (
                      order.detail.map((dog, index) => (
                        <div key={index} className="mb-4">
                          <p className="text-gray-500">
                            <strong>Pet Name:</strong> {dog.dog.name}
                          </p>
                          <p className="text-gray-500">
                            <strong>Race:</strong> {dog.dog.race}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">No pets found for this order.</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No orders found.</p>
          )}
        </div>
        
      </section>
    </div>
  );
};

export default MyOrdersComponent;

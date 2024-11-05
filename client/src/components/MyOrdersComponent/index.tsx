import React from 'react'

const MyOrdersComponent = () => {

      const orders = [
        { id: 1, date: "2024-09-10", status: "Completed" },
        { id: 2, date: "2024-09-15", status: "Pending" },
        { id: 3, date: "2024-09-15", status: "Pending" },
        { id: 4, date: "2024-09-15", status: "Pending" },
        { id: 5, date: "2024-09-15", status: "Pending" },
      ];

      
  return (
    <div>
      {/* Órdenes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-[#dc803f]">
          My Orders
        </h2>
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
                      <p className="text-gray-500">Date: {order.date}</p>
                      <p className="text-gray-500">Status: {order.status}</p>
                    </div>
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
}

export default MyOrdersComponent

"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCheck,
  faClock,
  faDog,
  faUserAstronaut,
  faReorder,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import PendingAppointments from "../PendingAppointmentsComponent";
import CompletedAppointmentsComponent from "../CompletedAppointmentsComponent";
import UserDataComponent from "../UserDataComponent";
import MyOrdersComponent from "../MyOrdersComponent";
import MyPetsComponent from "../MyPetsComponent";
import OwnersListComponent from "../OwnersListComponent";
import SittersListComponent from "../SittersListComponent/Index";
import HelpComponent from "../HelpComponent";
import { concertOne, neucha } from "@/app/lib/server/fonts";

const SideBarComponent = () => {
  const [activeComponent, setActiveComponent] = useState("Profile");
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Obtener el rol del usuario desde localStorage
    const storedData = localStorage.getItem("user");
    console.log(storedData);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      
      setUserRole(parsedData.role);
    }
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Pending Appointments":
        return <PendingAppointments />;
      case "Completed Appointments":
        return <CompletedAppointmentsComponent />;
      case "Profile":
        return <UserDataComponent />;
      case "My Orders":
        return <MyOrdersComponent />;
      case "My Pets":
        return <MyPetsComponent />;
      case "Owners":
        return <OwnersListComponent />;
      case "Sitters":
        return <SittersListComponent />;
      case "Help":
        return <HelpComponent/>
      default:
        return <UserDataComponent />;
    }
  };

  // Define las opciones de menú según el rol
  const menuItems =
    userRole === "sitter"
      ? [
          { name: "Profile", icon: faUser },
          { name: "Pending Appointments", icon: faClock },
          { name: "Completed Appointments", icon: faCheck },
          { name: "Help", icon: faQuestion },
        ]
      : [
          { name: "Profile", icon: faUser },
          { name: "My Orders", icon: faReorder },
          { name: "My Pets", icon: faDog },
          { name: "Help", icon: faQuestion },
        ];

          const menuItemsAdmin =
            userRole === "admin"
              ? [
                  { name: "Profile", icon: faUser },
                  { name: "Pending Appointments", icon: faClock },
                  { name: "Completed Appointments", icon: faCheck },
                  { name: "Help", icon: faQuestion },
                  { name: "My Pets", icon: faDog },
                  { name: "Owners", icon: faUser },
                  { name: "Sitters", icon: faUserAstronaut },
                  { name: "My Orders", icon: faReorder },
                ]
              : [
              
                ];

                return (
                  <div className="flex bg-[#faf4f0] min-h-screen">
                   
                    <nav className="mt-10 ml-10 mb-10 bg-[#f8d4a1] rounded-2xl shadow-lg p-6 flex flex-col">
                      <h2 className={`${concertOne.className} text-3xl font-bold text-[#dc803f] mb-8`}>
                        Dashboard
                      </h2>
                      <ul className="space-y-4">
                        {menuItems.map(({ name, icon }) => (
                          <li key={name}>
                            <button
                              className={`w-full text-left py-3 px-5 rounded-lg transition duration-300 flex items-center justify-start text-[#fffffffd]
                                ${
                                  activeComponent === name
                                    ? `{${neucha.className} bg-[#c47a39] text-white shadow-xl}`
                                    : "text-[#3b7fb7b4] hover:bg-[#e89052] "
                                }
                              `}
                              onClick={() => setActiveComponent(name)}
                            >
                              <span className="mr-3">
                                <FontAwesomeIcon icon={icon} />
                              </span>
                              <span className={`text-lg ${concertOne.className}`}>{name}</span> 
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                
                  
                    <div className="w-full p-10">
                      <div className={concertOne.className}>
                        {renderComponent()}
                      </div>
                    </div>
                  </div>
                );
                
};

export default SideBarComponent;
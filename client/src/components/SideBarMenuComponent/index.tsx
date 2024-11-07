"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faUser, faCheck, faClock, faDog, faUserAstronaut, faReorder, faQuestion } from "@fortawesome/free-solid-svg-icons";
import PendingAppointments from "../PendingAppointmentsComponent";
import CompletedAppointmentsComponent from "../CompletedAppointmentsComponent";
import UserDataComponent from "../UserDataComponent";
import MyOrdersComponent from "../MyOrdersComponent";
import MyPetsComponent from "../MyPetsComponent";
import OwnersListComponent from "../OwnersListComponent";
import SittersListComponent from "../SittersListComponent/Index";
import HelpComponent from "../HelpComponent";
import { Sidebar } from "primereact/sidebar"; // Importamos Sidebar de PrimeReact
import { Button } from "primereact/button"; // Importamos Button para el ejemplo

import { getAllUsersFetch, getAllSittersFetch } from "../../app/lib/server/fetchAdmin"; // Asegúrate de tener las funciones correctas de api
import { ISitter, IUser } from "@/interfaces/interfaces";

type MenuItem = {
  name: string;
  icon: IconDefinition;
};

const SideBarComponent = () => {
  const [activeComponent, setActiveComponent] = useState("Profile");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [allUsers, setAllUsers] = useState<IUser[] | null>(null); // Estado para todos los usuarios
  const [allSitters, setAllSitters] = useState<ISitter[] | null>(null); // Estado para todos los sitters

  useEffect(() => {
    // Obtener el rol del usuario desde localStorage
    const storedData = localStorage.getItem("user");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserRole(parsedData.role);

      // Configura el menú según el rol del usuario
      if (parsedData.role === "sitter") {
        setMenuItems([
          { name: "Profile", icon: faUser },
          { name: "Pending Appointments", icon: faClock },
          { name: "Completed Appointments", icon: faCheck },
          { name: "Help", icon: faQuestion },
        ]);
      } else if (parsedData.role === "admin") {
        setMenuItems([
          { name: "Owners", icon: faUser },
          { name: "Sitters", icon: faUserAstronaut },
        ]);

        // Obtener todos los usuarios y sitters si es un admin
        fetchUsersAndSitters();
      } else {
        setMenuItems([
          { name: "Profile", icon: faUser },
          { name: "My Orders", icon: faReorder },
          { name: "My Pets", icon: faDog },
          { name: "Help", icon: faQuestion },
        ]);
      }
    }
  }, []);

  const fetchUsersAndSitters = async () => {
    try {
      // Obtiene todos los usuarios y sitters
      const usersData = await getAllUsersFetch();
      const sittersData = await getAllSittersFetch();

      if (usersData) {
        setAllUsers(usersData);
      }
      if (sittersData) {
        setAllSitters(sittersData);
      }
    } catch (error) {
      console.error("Error fetching users or sitters:", error);
    }
  };

  const renderComponent = () => {
    if ( userRole === "admin") {
      switch (activeComponent) {
        case "Owners":
          return <OwnersListComponent />;
        case "Sitters":
          return <SittersListComponent />;
        
        default:
          return <OwnersListComponent />;
      }
    } else {
      // Comportamiento para otros roles
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
        case "Help":
          return <HelpComponent />;
        default:
          return <UserDataComponent />;
      }
    }
  };

  // Mostrar el Sidebar solo si el usuario tiene el rol "admin"
  const sidebarContent = userRole === "admin" && (
    <Sidebar visible={false} onHide={() => {}}>
      <h3>Admin Dashboard</h3>
      <ul>
        {menuItems.map(({ name, icon }) => (
          <li key={name}>
            <Button
              label={name}
              icon={<FontAwesomeIcon icon={icon} />}
              onClick={() => setActiveComponent(name)}
              className="p-button-text"
            />
          </li>
        ))}
      </ul>
    </Sidebar>
  );

  return (
    <div className="flex bg-[#FAF7F0] min-h-screen">
      {/* Barra lateral flotante */}
      <nav className="mt-10 ml-10 mb-10 bg-[#FFEEAD] rounded-2xl shadow-lg p-6 flex flex-col">
        <h2 className="text-3xl font-bold text-[#B17457] mb-8">Dashboard</h2>

        {/* Aquí se renderiza el Sidebar solo para admin */}
        {sidebarContent}

        <ul className="space-y-4">
          {menuItems.map(({ name, icon }) => (
            <li key={name}>
              <button
                className={`w-full text-left py-3 px-5 rounded-lg transition duration-300 flex items-center justify-start
                  ${
                    activeComponent === name
                      ? "bg-[#FA7070] text-white shadow-xl"
                      : "text-[#B17457] hover:bg-[#FA7070] hover:text-white"
                  }
                `}
                onClick={() => setActiveComponent(name)}
              >
                <span className="mr-3">
                  <FontAwesomeIcon icon={icon} />
                </span>
                <span className="text-lg">{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Contenido principal */}
      <div className="w-full p-10">{renderComponent()}</div>
    </div>
  );
};

export default SideBarComponent;

"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCheck,
  faClock,
  faDog,
  faUserAstronaut,
  faReorder,
} from "@fortawesome/free-solid-svg-icons";
import PendingAppointments from "../PendingAppointmentsComponent";
import CompletedAppointmentsComponent from "../CompletedAppointmentsComponent";
import UserDataComponent from "../UserDataComponent";
import MyOrdersComponent from "../MyOrdersComponent";
import MyPetsComponent from "../MyPetsComponent";
import OwnersListComponent from "../OwnersListComponent";
import SittersListComponent from "../SittersListComponent/Index";

const SideBarComponent = () => {
  const [activeComponent, setActiveComponent] = useState("Profile");

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
      default:
        return <UserDataComponent />;
    }
  };

  return (
    <div className="flex bg-[#FAF7F0] min-h-screen">
      {/* Barra lateral flotante */}
      <nav className="mt-10 ml-10 mb-10 bg-[#FFEEAD] rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-[#B17457] mb-8">Dashboard</h2>
        <ul className="space-y-4">
          {[
            { name: "Profile", icon: faUser },
            { name: "Pending Appointments", icon: faClock },
            { name: "Completed Appointments", icon: faCheck },

            { name: "My Orders", icon: faReorder },
            { name: "My Pets", icon: faDog },
            { name: "Owners", icon: faUser },
            { name: "Sitters", icon: faUserAstronaut },
          ].map(({ name, icon }) => (
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

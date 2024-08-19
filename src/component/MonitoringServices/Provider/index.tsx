import React, { createContext, useState, useContext } from "react";

export const MonitoringServiceContext = createContext();

export const MonitoringServiceProvider = ({ children }) => {
  const [monitoringServices, setMonitoringServices] = useState([
    {
      id: 1,
      serviceName: "Monitoring",
    },
    {
      id: 2,
      serviceName: "Monthly Tika",
    },
    {
      id: 3,
      serviceName: "Weekly Tika",
    },
    // Add more monitoring services as needed
  ]);

  const addMonitoringService = (newService) => {
    const maxId = Math.max(...monitoringServices.map((service) => service.id), 0);
    const newServiceWithId = { ...newService, id: maxId + 1 };
    setMonitoringServices([...monitoringServices, newServiceWithId]);
  };

  const editMonitoringService = (id, updatedService) => {
    setMonitoringServices((prevServices) =>
      prevServices.map((service) => (service.id === id ? { ...service, ...updatedService } : service))
    );
  };

  const deleteMonitoringService = (id) => {
    const updatedServices = monitoringServices.filter((service) => service.id !== id);
    setMonitoringServices(updatedServices);
  };

  const getServiceById = (id) => {
    // Find and return the service with the given ID
    return monitoringServices.find((service) => service.id === id);
  };

  const value = {
    monitoringServices,
    addMonitoringService,
    editMonitoringService,
    deleteMonitoringService,
    getServiceById,
  };

  return (
    <MonitoringServiceContext.Provider value={value}>
      {children}
    </MonitoringServiceContext.Provider>
  );
};

export const useMonitoringService = () => {
  const context = useContext(MonitoringServiceContext);
  if (!context) {
    throw new Error("useMonitoringService must be used within a MonitoringServiceProvider");
  }
  return context;
};

import React, { createContext, useState, useContext,useEffect } from 'react';
import { toast } from 'react-toastify';

export const VaccineMonitorContext = createContext<any>(null);


interface VaccineMonitor {
  id: number;
  date: string;
  StallNo: string;
  CowNumber: 'string';
  note: string;
  reportedBy: string;
  ServiceName: string;
  Remarks: string;
  GivenTime: string;
}

export const VaccineMonitorProvider = ({ children }) => {
  const [vaccineMonitors, setVaccineMonitors] = useState<VaccineMonitor[]>([]);


  useEffect(() => {
    const fetchVaccineMonitor = async () => {
      try {
        const response = await fetch('http://localhost:3000/Vaccinemonitors');
        if (!response.ok) {
          throw new Error('Failed to fetch vaccine Monitors data');
        }
        const data = await response.json();
        setVaccineMonitors(data);
      } catch (error) {
        console.error('Error fetching vaccine Monitors data:', error.message);
      }
    };

    fetchVaccineMonitor();
  }, []);


  const addVaccineMonitor = async (newVaccineMonitor: Omit<VaccineMonitor, 'id'>) => {
    try {
      const id = vaccineMonitors.length + 1;
      const VaccineMonitorWithId: VaccineMonitor = { id, ...newVaccineMonitor };

      const response = await fetch('http://localhost:3000/VaccineMonitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(VaccineMonitorWithId),
      });

      if (!response.ok) {
        throw new Error('Failed to add routine Monitor');
      }

      setVaccineMonitors([...vaccineMonitors, VaccineMonitorWithId]);
      toast.success('Routine Monitor added successfully');
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Failed to add Routine Monitor');
    }
  };

  const editVaccineMonitor = async (id: number, updatedVaccineMonitor: Partial<VaccineMonitor>) => {
    try {
      const response = await fetch(`http://localhost:3000/VaccineMonitors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVaccineMonitor),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update vaccine monitor');
      }
  
      const updatedVaccineMonitors = vaccineMonitors.map(item =>
        item.id === id ? { ...item, ...updatedVaccineMonitor } : item
      );
      setVaccineMonitors(updatedVaccineMonitors);
      toast.success('Vaccine monitor updated successfully');
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Failed to update vaccine monitor');
    }
  };
  
  const deleteVaccineMonitor = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/VaccineMonitors/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete vaccine monitor');
      }
  
      const updatedVaccineMonitors = vaccineMonitors.filter(vaccineMonitor => vaccineMonitor.id !== id);
      setVaccineMonitors(updatedVaccineMonitors);
      toast.success('Vaccine monitor deleted successfully');
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Failed to delete vaccine monitor');
    }
  };
  

  const getVaccineMonitorById = (id) => {
    // Find and return the vaccine monitor with the given ID
    return vaccineMonitors.find((vaccineMonitor) => vaccineMonitor.id === id);
  };

  const value = {
    vaccineMonitors,
    addVaccineMonitor,
    editVaccineMonitor,
    deleteVaccineMonitor,
    getVaccineMonitorById,
  };

  return <VaccineMonitorContext.Provider value={value}>{children}</VaccineMonitorContext.Provider>;
};

export const useVaccineMonitor = () => {
  const context = useContext(VaccineMonitorContext);
  if (!context) {
    throw new Error('useVaccineMonitor must be used within a VaccineMonitorProvider');
  }
  return context;
}

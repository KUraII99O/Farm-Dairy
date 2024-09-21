import { v4 as uuidv4 } from 'uuid';

// Define the Monitoring interface
export type Monitoring = {
    id?:string,
    serviceName: string,
    userId?: string,
};

// MonitoringService object
const MonitoringService = {
    fetchMonitorings,
    addMonitoring,
    editMonitoring,
    deleteMonitoring,
};

// Fetch Monitorings function
async function fetchMonitorings(): Promise<Monitoring[]> {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        throw new Error("User not logged in");
    }

    const user = JSON.parse(loggedInUser);
    if (!user || !user.id) {
        throw new Error("User ID not found");
    }

    try {
        const response = await fetch(`https://auth-api-woad.vercel.app/api/monitorings?userId=${user.id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch Monitoring data');
        }
        const monitoringsData: Monitoring[] = await response.json();
        return monitoringsData;
    } catch (error) {
        console.error('Error fetching Monitoring data:', error);
        return [];
    }
}

// Add Monitoring function
async function addMonitoring(newMonitoring: Omit<Monitoring, 'id' | 'userId'>): Promise<Monitoring> {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        throw new Error('User not logged in or user data not found');
    }

    const user = JSON.parse(loggedInUser);
    if (!user || !user.id) {
        throw new Error('User ID not found in user data');
    }

    try {
        const monitoringWithId: Monitoring = { id: uuidv4(), userId: user.id, ...newMonitoring };
        const response = await fetch('https://auth-api-woad.vercel.app/api/monitorings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(monitoringWithId),
        });

        if (!response.ok) {
            throw new Error('Failed to add monitoring');
        }

        return monitoringWithId;
    } catch (error) {
        console.error('Error adding monitoring:', error);
        throw error;
    }
}

// Edit Monitoring function
async function editMonitoring(id: string, updatedMonitoring: Omit<Monitoring, 'id' | 'userId'>): Promise<void> {
    try {
        const response = await fetch(`https://auth-api-woad.vercel.app/api/monitorings/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMonitoring),
        });
        if (!response.ok) {
            throw new Error('Failed to update monitoring');
        }
    } catch (error) {
        console.error('Error updating monitoring:', error);
        throw error;
    }
}

// Delete Monitoring function
async function deleteMonitoring(id: string): Promise<void> {
    try {
        const response = await fetch(`https://auth-api-woad.vercel.app/api/monitorings/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete monitoring');
        }
    } catch (error) {
        console.error('Error deleting monitoring:', error);
        throw error;
    }
}

export { MonitoringService };

import { v4 as uuidv4 } from "uuid";

// Use export type instead of export interface
export type VaccineMonitor = {
  informations: {
    VaccineName: string;
    Dose: string;
    Repeat: string;
    Remarks: string;
    GivenTime: string;
  }[];
  stallNo: string;
  animalID: string;
  date: string;
  note: string;
  reportedby: string;
  id: string;
  userId: string;
};

const VaccineService = {
  fetchVaccineRecords,
  addVaccineRecord,
  editVaccineRecord,
  deleteVaccineRecord,
};

async function fetchVaccineRecords(): Promise<VaccineMonitor[]> {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(
      "https://auth-api-woad.vercel.app/api/vaccines-monitor?userId=" + user.id
    );
    if (!response.ok) {
      throw new Error("Failed to fetch vaccine records data");
    }
    const vaccineRecordsData: VaccineMonitor[] = await response.json();
    return vaccineRecordsData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching vaccine records data:", error.message);
    } else {
      console.error("Unknown error fetching vaccine records data");
    }
    return [];
  }
}

async function addVaccineRecord(
  newVaccineRecord: Omit<VaccineMonitor, "id" | "userId">
): Promise<VaccineMonitor> {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    throw new Error("User not logged in or user data not found");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found in user data");
  }

  try {
    const vaccineRecordWithId: VaccineMonitor = {
      id: uuidv4(),
      userId: user.id,
      ...newVaccineRecord,
    };

    const response = await fetch("https://auth-api-woad.vercel.app/api/vaccines-monitor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vaccineRecordWithId),
    });

    if (!response.ok) {
      throw new Error("Failed to add vaccine record");
    }

    return vaccineRecordWithId;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error adding vaccine record:", error.message);
    } else {
      console.error("Unknown error adding vaccine record");
    }
    throw error;
  }
}

async function editVaccineRecord(
  id: string,
  updatedVaccineRecord: Omit<VaccineMonitor, "id">
): Promise<void> {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(
      `https://auth-api-woad.vercel.app/api/vaccines-monitor/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVaccineRecord),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update vaccine record");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating vaccine record:", error.message);
    } else {
      console.error("Unknown error updating vaccine record");
    }
    throw error;
  }
}

async function deleteVaccineRecord(id: string): Promise<void> {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(
      `https://auth-api-woad.vercel.app/api/vaccines-monitor/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete vaccine record");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting vaccine record:", error.message);
    } else {
      console.error("Unknown error deleting vaccine record");
    }
    throw error;
  }
}

export { VaccineService };

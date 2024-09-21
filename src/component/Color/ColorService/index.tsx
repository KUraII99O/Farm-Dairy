import { v4 as uuidv4 } from 'uuid';

export type  Color ={
  id: string;
  userId: string;
  name: string;
}

const ColorService = {
  fetchColors,
  addColor,
  editColor,
  deleteColor
};

async function fetchColors(): Promise<Color[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch('https://auth-api-woad.vercel.app/api/colors?userId=' + user.id);
    if (!response.ok) {
      throw new Error('Failed to fetch color data');
    }
    const colorData: Color[] = await response.json();
    return colorData;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching color data:', error.message);
    } else {
      console.error('An unknown error occurred while fetching color data.');
    }
    return [];
  }
}

async function addColor(newColor: Omit<Color, 'id' | 'userId'>): Promise<Color> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in or user data not found");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found in user data");
  }

  try {
    const colorWithId: Color = { id: uuidv4(), userId: user.id, ...newColor };

    const response = await fetch('https://auth-api-woad.vercel.app/api/colors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(colorWithId),
    });

    if (!response.ok) {
      throw new Error('Failed to add color');
    }

    return colorWithId;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error adding color:', error.message);
    } else {
      console.error('An unknown error occurred while adding color.');
    }
    throw error;
  }
}

async function editColor(id: string, updatedColor: Omit<Color, 'id' | 'userId'>): Promise<void> {
  try {
    const response = await fetch(`https://auth-api-woad.vercel.app/api/colors/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedColor),
    });
    if (!response.ok) {
      throw new Error('Failed to update color');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating color:', error.message);
    } else {
      console.error('An unknown error occurred while updating color.');
    }
    throw error;
  }
}

async function deleteColor(id: string): Promise<void> {
  try {
    const response = await fetch(`https://auth-api-woad.vercel.app/api/colors/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete color");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting color:", error.message);
    } else {
      console.error("An unknown error occurred while deleting color.");
    }
    throw error;
  }
}

export { ColorService };

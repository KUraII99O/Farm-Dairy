const ManageStallService = {
    addStall,
    fetchStalls,
    editStall,
    toggleStallStatus,
    deleteStall
};

function addStall(newStall: Omit<Stall, 'id'>) {
    try {
        const id = stalls.length + 1;
        const stallWithId: Stall = { id, ...newStall };

        fetch('http://localhost:3000/stalls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(stallWithId),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to add routine Monitor');
            }
            setStalls([...stalls, stallWithId]);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function fetchStalls() {
    try {
        fetch('http://localhost:3000/stalls')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch Stall data');
                }
                return response.json();
            })
            .then(data => setStalls(data))
            .catch(error => console.error('Error fetching Stall data:', error.message));
    } catch (error) {
        console.error('Error fetching Stall data:', error.message);
    }
}

function editStall(id: number, updatedStall: Omit<Stall, "id">) {
    try {
        fetch(`http://localhost:3000/stalls/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedStall),
        }).then(response => {
            if (!response.ok) {
                throw new Error("Failed to update Stall record");
            }
            setStalls((prevStalls) =>
                prevStalls.map((Stall) =>
                    Stall.id === id ? { ...Stall, ...updatedStall } : Stall
                )
            );
        });
    } catch (error) {
        console.error("Error:", error.message);
    }
}

function toggleStallStatus(id: number) {
    try {
        fetch(`http://localhost:3000/stalls/${id}/toggle-status`, {
            method: "PUT",
        }).then(response => {
            if (!response.ok) {
                throw new Error("Failed to toggle stall status");
            }
            response.json().then(data => {
                setStalls((prevstall) =>
                    prevstall.map((stall) =>
                        stall.id === id ? { ...stall, status: !stall.status } : stall
                    )
                );
            });
        });
    } catch (error) {
        console.error("Error:", error.message);
    }
}

function deleteStall(id: number) {
    try {
        fetch(`http://localhost:3000/stalls/${id}`, {
            method: "DELETE",
        }).then(response => {
            if (!response.ok) {
                throw new Error("Failed to delete milk record");
            }
            setStalls((prevstalls) =>
                prevstalls.filter((stall) => stall.id !== id)
            );
        });
    } catch (error) {
        console.error("Error:", error.message);
    }
}

export { ManageStallService };

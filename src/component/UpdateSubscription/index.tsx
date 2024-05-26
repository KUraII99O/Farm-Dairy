import React, { useState } from 'react';

const UpdateSubscription: React.FC = () => {

    const [userId, setUserId] = useState('');
    const [newPlan, setNewPlan] = useState('');

    const updateSubscription = async () => {
        try {
            const response = await fetch('http://localhost:3001/update-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, newPlan })
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <input
                type="text"
                placeholder="User ID"
                className="mb-4 p-2 border border-gray-400"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <input
                type="text"
                placeholder="New Subscription Plan"
                className="mb-4 p-2 border border-gray-400"
                value={newPlan}
                onChange={(e) => setNewPlan(e.target.value)}
            />
            <button
                className="p-2 bg-green-500 text-white"
                onClick={updateSubscription}
            >
                Update Subscription
            </button>
        </div>
    );
};

export default UpdateSubscription;

import React, { useState, useEffect } from 'react';

interface SubscriptionPlan {
    id: string;
    name: string;
    price: string;
    features: string;
}

const Admin: React.FC = () => {
    const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [features, setFeatures] = useState('');

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const response = await fetch('http://localhost:3001/admin/plans');
            const data = await response.json();
            setPlans(data);
        } catch (error) {
            console.error(error);
        }
    };

    const createPlan = async () => {
        try {
            const response = await fetch('http://localhost:3001/admin/plans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, price, features })
            });
            const data = await response.json();
            setPlans([...plans, data]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Admin Interface</h2>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Create New Plan</h3>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-2 p-2 border border-gray-400" />
                <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="mb-2 p-2 border border-gray-400" />
                <input type="text" placeholder="Features" value={features} onChange={(e) => setFeatures(e.target.value)} className="mb-2 p-2 border border-gray-400" />
                <button onClick={createPlan} className="bg-blue-500 text-white p-2 rounded">Create Plan</button>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">Subscription Plans</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {plans.map((plan: SubscriptionPlan) => (
                        <div key={plan.id} className="p-4 border border-gray-400 rounded">
                            <p className="font-semibold">{plan.name}</p>
                            <p>Price: {plan.price}</p>
                            <p>Features: {plan.features}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;

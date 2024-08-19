import React, { useState } from 'react';
import { FaUnlock } from "react-icons/fa"; // Import FaUnlock icon

const PasswordSection: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password === confirmPassword) {
            // Passwords match, proceed with form submission or other actions
            console.log('Passwords match');
        } else {
            // Passwords don't match, handle error or provide feedback to the user
            console.error('Passwords do not match');
        }
    };

    return (
        <div className="container mx-auto mt-4 mb-16 bg-white p-8 ">
            <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <FaUnlock className="mr-2" /> 
                <span>Password :</span>
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-center"> {/* Center form */}
                <div className="form-group mb-4 flex items-center w-full"> {/* Flex container for each label-input pair */}
                    <label htmlFor="password" className="block font-bold mb-2 w-20">Password</label>
                    <div className="flex items-center w-full justify-center"> {/* Flex container for centering input */}
                        <input
                            type="password"
                            id="password"
                            className="border rounded-md px-4 py-2 w-60"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-group mb-4 flex items-center w-full"> {/* Flex container for each label-input pair */}
                    <label htmlFor="confirmPassword" className="block font-bold mb-2 w-20">Confirm Password</label>
                    <div className="flex items-center w-full justify-center"> {/* Flex container for centering input */}
                        <input
                            type="password"
                            id="confirmPassword"
                            className="border rounded-md px-4 py-2 w-60"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="bg-secondary hover:bg-primary text-white px-4 py-2 rounded-md">Submit</button>
            </form>
        </div>
    );
};

export default PasswordSection;

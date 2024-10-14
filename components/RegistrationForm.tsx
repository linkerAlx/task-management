"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useStateContext } from '@/context/stateContext';

type LoginFormData = {
    username: string;
    password: string;
};

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const { user } = useStateContext();
    const { push } = useRouter();

    if (user) {
        push("/");
    };

    const onSubmit = async (data: LoginFormData) => {
        try {
            setError('');
            setLoading(true);
            const response = await axios.post("/api/user/registration", data);
            if (response.data.error) {
                setError(response.data.error);
                setLoading(false);
                return;
            }
            window.location.replace("/login");
        } catch (error) {
            setLoading(false);
            setError("Something went wrong while registering");
            console.error(error);
        }
    };

    return (
        <>
            <p className='bg-green-700/15 px-10 py-3 text-green-700 text-center mx-2 rounded-md'>You will have to log in after registration. Remember your password!</p>
            <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-item">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input
                            id="username"
                            type="text"
                            className={`border-2 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('username', { required: 'Username is required' })}
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                    </div>

                    <div className="form-item">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            className={`border-2 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('password', { required: 'Password is required' })}
                        />
                    </div>
                    {error && <p className="bg-red-700/15 text-red-700 p-2">{error}</p>}
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-indigo-500 text-white p-3 rounded-md hover:bg-indigo-600 transition duration-300"
                    >
                        {loading ? "we are creating your account..." : "Register Now"}
                    </button>
                </form>
            </div>
        </>
    );
}

"use client";

import { useStateContext } from '@/context/stateContext';
import axios from 'axios';
// import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { BiX } from 'react-icons/bi';

type CreateFormData = {
    title: string;
    description: string;
    username: string;
};

const CreateTaskForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>();
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const { setAddTask } = useStateContext();
    // const router = useRouter();

    const onSubmit = async (data: CreateFormData) => {
        try {
            setError('');
            setLoading(true);
            const response = await axios.post("/api/task", data);
            if (response.data.error) {
                setError(response.data.error);
                setLoading(false);
                return;
            }
            setLoading(false);
            window.location.reload();
            // router.refresh();
            // setAddTask(false);
        } catch (error) {
            setLoading(false);
            setError("Something went wrong while login");
            console.error(error);
        }
    };

    return (
        <div className='bg-black/15 absolute top-0 bottom-0 right-0 left-0 flex items-start justify-end'>
            <button className="absolute font-bold text-4xl top-2 right-2" onClick={() => setAddTask(false)}><BiX /></button>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full md:w-[500px] h-screen overflow-y-auto bg-white px-4 pt-10">
                <h1 className='font-bold p-2'>Create you task</h1>
                <div className="form-item">
                    <label htmlFor="title" className="block text-gray-700">Title</label>
                    <input
                        id="title"
                        type="text"
                        className={`border-2 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('title')}
                    />
                </div>

                <div className="form-item">
                    <label htmlFor="description" className="block text-gray-700">Description</label>
                    <input
                        id="description"
                        type="text"
                        className={`border-2 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('description')}
                    />
                </div>

                <div className="form-item">
                    <label htmlFor="username" className="block text-gray-700">Username</label>
                    <input
                        id="username"
                        type="text"
                        className={`border-2 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('username')}
                    />
                </div>

                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-indigo-500 text-white p-3 rounded-md hover:bg-indigo-600 transition duration-300"
                >
                    {loading ? "Creating..." : "Create"}
                </button>
            </form>
        </div>
    )
}

export default CreateTaskForm

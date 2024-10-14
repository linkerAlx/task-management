// "use client";

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { useStateContext } from '@/context/stateContext';

// type TaskFormData = {
//     Title: string;
//     Content: string;
// };

// export default function TaskForm() {
//     const { register, handleSubmit, formState: { errors } } = useForm<TaskFormData>();
//     const [error, setError] = React.useState<string | null>(null);
//     const [loading, setLoading] = React.useState(false);

//     const { user } = useStateContext();
//     const { push } = useRouter();

   
   

//     // Form submission handler
//     const onSubmit = async (data: TaskFormData) => {
//         try {
//             setError('');
//             setLoading(true);
//             // Update this to your task creation API endpoint
            
//             console.log('data');
//             window.location.replace("/tasks"); // Redirect after successful task creation
//         } catch (error) {
//             setLoading(false);
//             setError("Something went wrong while submitting the task");
//             console.error(error);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
//             <h2 className="text-2xl font-bold mb-6 text-center">Create a Task</h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 <div className="form-item">
//                     <label htmlFor="title" className="block text-gray-700">Title</label>
//                     <input
//                         id="title"
//                         type="text"
//                         className={`border-2 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.Title ? 'border-red-500' : 'border-gray-300'}`}
//                         {...register('Title', { required: 'Title is required' })}
//                     />
//                     {errors.Title && <p className="text-red-500 text-sm mt-1">{errors.Title.message}</p>}
//                 </div>

//                 <div className="form-item">
//                     <label htmlFor="content" className="block text-gray-700">Content</label>
//                     <textarea
//                         id="content"
//                         className={`border-2 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.Content ? 'border-red-500' : 'border-gray-300'}`}
//                         {...register('Content', { required: 'Content is required' })}
//                     />
//                     {errors.Content && <p className="text-red-500 text-sm mt-1">{errors.Content.message}</p>}
//                 </div>

//                 {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

//                 <button
//                     disabled={loading}
//                     type="submit"
//                     className="w-full bg-indigo-500 text-white p-3 rounded-md hover:bg-indigo-600 transition duration-300"
//                 >
//                     {loading ? "Submitting Task..." : "Submit Task"}
//                 </button>
//             </form>
//         </div>
//     );
// }

"use client";

import { useStateContext } from "@/context/stateContext";
import { useRouter } from "next/navigation";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
// import { tasks } from "@/constant";
import TaskComponent from "@/components/taskComponent";
import CreateTaskForm from "@/components/createTaskForm";

export default function HomeComponent({ tasks }: { tasks: any }) {
    const [showActionButton, setShowActionButton] = useState(false);
    const [index, setIndex] = useState(0);
    const { user, addTask, setAddTask } = useStateContext();
    const { push } = useRouter();


    if (!user) {
        push("/login");
    }

    return (
        <div className="">
            <p className="text-xl text-center font-medium lowercase">TASK MANAGEMENT APP</p>
            <div>
                <button onClick={() => setAddTask(true)} className="flex items-center gap-2 bg-black ml-auto px-4 py-2 text-white rounded-lg cursor-pointer mr-20">
                    <CiCirclePlus /> Add task
                </button>
                {addTask && <CreateTaskForm />}
                <div className="flex item-center justify-center p-2 md:p-10 gap-[30px] flex-wrap">

                    {tasks.map((task: any, idx: any) => {
                        console.log(task)
                        return (
                            <TaskComponent
                                taskId={task._id}
                                key={task._id}
                                id={idx}
                                index={index}
                                setIndex={setIndex}
                                title={task.title}
                                description={task.description}
                                assignee={task.username}
                                timeAgo={task.createdAt}
                                setShowActionButton={setShowActionButton}
                                showActionButton={showActionButton}
                            />
                        )
                    })}

                </div>
            </div>
        </div>
    );
}

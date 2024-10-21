"use client"
import { useStateContext } from '@/context/stateContext';
import { deleteTask } from '@/lib/action/task';
// import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { CiEdit } from 'react-icons/ci'
import { IoMdMore } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'

interface TaskProps {
  id: number;
  taskId: string;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  title: string;
  description: string;
  assignee: string;
  timeAgo: string;
  setShowActionButton: Dispatch<SetStateAction<boolean>>;
  showActionButton: boolean;
}

const TaskComponent = ({
  taskId,
  id,
  title,
  setIndex,
  description,
  assignee,
  timeAgo,
  setShowActionButton,

}: TaskProps) => {
  const [loading, setLoading] = useState(false);
  const { expandedOrderId, setExpandedOrderId } = useStateContext();
  setIndex(id);
  const isExpanded = expandedOrderId === id;

  // const router = useRouter();
  return (
    <div key={id} className="w-full md:w-[400px] p-5 shadow-sm shadow-blue-400 space-y-3">
      <div>
        <div className="w-full flex items-center justify-between mb-5">
          <p className="font-bold capitalize">{title}</p>
          <button onClick={() => {
            setShowActionButton((prev) => !prev)
            setExpandedOrderId(isExpanded ? undefined : id)
          }}>
            <IoMdMore />
          </button>
        </div>
        <p className="text-sm text-gray-400">Description: {description}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[20px]">
          <div className="w-[50px] h-[50px] rounded-full">
            <p className='bg-blue-600 text-white rounded-full h-full w-full font-bold text-xl flex items-center justify-center'>{assignee.charAt(0).toLocaleUpperCase()}</p>
          </div>
          <div>
            <p className="font-bold text-sm capitalize">{assignee}</p>
            <p className="text-[9px] text-gray-400">{timeAgo}</p>
          </div>
        </div>
        {isExpanded && (
          <div className="flex items-center gap-4">
            <button><CiEdit /></button>
            <button disabled={loading} onClick={() => {
              try {
                setLoading(true);
                deleteTask(taskId);
                window.location.reload();
              } catch (error) {
                setLoading(false);
                console.log(error);
              }
            }}><MdDelete /></button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskComponent;

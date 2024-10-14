import HomeComponent from '@/components/homeComponent'
import { getAllTasks } from '@/lib/action/task'
import React from 'react'


const Home = async () => {
  const tasks = JSON.parse(JSON.stringify(await getAllTasks()));
  return (
    <>
      <HomeComponent tasks={tasks} />
    </>
  )
}

export default Home

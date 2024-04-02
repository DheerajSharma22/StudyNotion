import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-5rem)] w-screen">

        <Sidebar />

      <div className="lg:ml-[250px] sm:px-5 lg:px-20 sm:w-full w-[95%] mx-auto py-10 sm:pb-20 pb-32">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
import React from "react"
import { getInitials } from "../../utils/helper"
import { MdLogout } from "react-icons/md"

const ProfileInfo = ({ onLogout, userInfo }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-white text-sm font-bold shadow-md">
        {getInitials(userInfo?.username)}
      </div>

      <div className="hidden md:block">
        <p className="text-sm font-semibold text-gray-700 leading-tight">
          {userInfo?.username}
        </p>
        <p className="text-[11px] text-gray-400">Welcome back!</p>
      </div>

      <button
        className="ml-1 flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 hover:bg-red-50 hover:text-red-500 px-3 py-2 rounded-lg transition-all duration-200"
        onClick={onLogout}
      >
        <MdLogout className="text-sm" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  )
}

export default ProfileInfo
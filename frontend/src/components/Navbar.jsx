import React, { useState } from "react"
import SearchBar from "./SearchBar/SearchBar"
import ProfileInfo from "./Cards/ProfileInfo"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
  signInSuccess,
  signoutFailure,
  signoutStart,
} from "../redux/user/userSlice"
import axios from "axios"

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery)
    }
  }

  const onClearSearch = () => {
    setSearchQuery("")
    handleClearSearch()
  }

  const onLogout = async () => {
    try {
      dispatch(signoutStart())

      const res = await axios.get("http://localhost:3000/api/auth/signout", {
        withCredentials: true,
      })

      if (res.data.success === false) {
        dispatch(signoutFailure(res.data.message))
        toast.error(res.data.message)
        return
      }

      toast.success(res.data.message)
      dispatch(signInSuccess())
      navigate("/login")
    } catch (error) {
      toast.error(error.message)
      dispatch(signoutFailure(error.message))
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-soft">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to={"/"} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
            <span className="text-white font-bold text-sm">JN</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            <span className="text-gray-400">Just</span>
            <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              Notes
            </span>
          </h2>
        </Link>

        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />

        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </nav>
  )
}

export default Navbar
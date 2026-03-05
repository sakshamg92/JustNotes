import React, { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  return (
    <div className="flex items-center bg-white/70 border border-gray-200 px-4 rounded-xl mb-3 transition-all duration-200 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 focus-within:bg-white">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded-xl outline-none placeholder:text-gray-400"
      />

      {isShowPassword ? (
        <FaRegEye
          size={18}
          className="text-brand-500 cursor-pointer flex-shrink-0"
          onClick={() => toggleShowPassword()}
        />
      ) : (
        <FaRegEyeSlash
          size={18}
          className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors flex-shrink-0"
          onClick={() => toggleShowPassword()}
        />
      )}
    </div>
  )
}

export default PasswordInput
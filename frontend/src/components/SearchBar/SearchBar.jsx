// import React from "react"
// import { FaMagnifyingGlass } from "react-icons/fa6"
// import { IoMdClose } from "react-icons/io"

// const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
//   return (
//     <div className="w-40 sm:w-60 md:w-80 flex  items-center px-4 bg-slate-100 rounded-md">
//       <input
//         type="text"
//         placeholder="Search Notes..."
//         className="w-full text-xs bg-transparent py-[11px] outline-none"
//         value={value}
//         onChange={onChange}
//       />

//       {value && (
//         <IoMdClose
//           className="text-slate-500 text-xl cursor-pointer hover:text-black mr-3"
//           onClick={onClearSearch}
//         />
//       )}

//       <FaMagnifyingGlass
//         className="text-slate-500 text-xl cursor-pointer hover:text-black mr-3"
//         onClick={handleSearch}
//       />
//     </div>
//   )
// }

// export default SearchBar

import React from "react"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="hidden sm:flex w-60 md:w-80 items-center gap-2 px-4 py-2.5 bg-gray-100/80 border border-gray-200/50 rounded-full transition-all duration-300 focus-within:bg-white focus-within:border-brand-300 focus-within:shadow-glow focus-within:ring-2 focus-within:ring-brand-100">
      <FaMagnifyingGlass
        className="text-gray-400 text-sm flex-shrink-0 cursor-pointer hover:text-brand-500 transition-colors"
        onClick={handleSearch}
      />

      <input
        type="text"
        placeholder="Search notes..."
        className="w-full text-sm bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      {value && (
        <IoMdClose
          className="text-gray-400 text-lg cursor-pointer hover:text-red-400 transition-colors flex-shrink-0"
          onClick={onClearSearch}
        />
      )}
    </div>
  )
}

export default SearchBar
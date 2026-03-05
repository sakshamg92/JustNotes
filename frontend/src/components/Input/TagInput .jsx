import React, { useState } from "react"
import { MdAdd, MdClose } from "react-icons/md"

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("")

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()])
      setInputValue("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag()
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1.5 text-xs font-medium text-brand-700 bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-full transition-all hover:bg-brand-100"
            >
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-red-500 transition-colors"
              >
                <MdClose className="text-sm" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 mt-3">
        <input
          type="text"
          value={inputValue}
          className="text-sm bg-white/70 border border-gray-200 px-3 py-2 rounded-xl outline-none transition-all focus:border-brand-400 focus:ring-2 focus:ring-brand-100 placeholder:text-gray-400"
          placeholder="Add tags..."
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-brand-50 border border-brand-200 hover:bg-brand-500 group transition-all duration-200"
          onClick={() => addNewTag()}
        >
          <MdAdd className="text-xl text-brand-500 group-hover:text-white transition-colors" />
        </button>
      </div>
    </div>
  )
}

export default TagInput
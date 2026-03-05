import React from "react"
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md"
import moment from "moment"

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onPinNote,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="group glass-card rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h6 className="text-sm font-semibold text-gray-800 truncate">
            {title}
          </h6>
          <span className="text-[11px] font-medium text-brand-500">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>

        <button
          className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${
            isPinned
              ? "bg-brand-100 text-brand-600"
              : "text-gray-300 hover:bg-gray-100 hover:text-brand-500"
          }`}
          onClick={onPinNote}
        >
          <MdOutlinePushPin className="text-lg" />
        </button>
      </div>

      {/* Content Preview */}
      <p className="text-xs text-gray-500 mt-3 leading-relaxed line-clamp-2">
        {content?.slice(0, 80)}
        {content?.length > 80 && "..."}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5 flex-wrap">
          {tags.slice(0, 3).map((item, index) => (
            <span
              key={index}
              className="text-[10px] font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full"
            >
              #{item}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-[10px] text-gray-400">
              +{tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-green-50 text-gray-400 hover:text-green-500 transition-all"
            onClick={onEdit}
          >
            <MdCreate className="text-sm" />
          </button>

          <button
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"
            onClick={onDelete}
          >
            <MdDelete className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteCard
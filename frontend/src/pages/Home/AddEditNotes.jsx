const API_URL = import.meta.env.VITE_API_URL;
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import TagInput from "../../components/Input/TagInput ";
import axios from "axios";
import { toast } from "react-toastify";

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  //   Edit Note
  const editNote = async () => {
    const noteId = noteData._id;

    try {
      const res = await axios.post(
        `${API_URL}/api/note/edit/${noteId}`,
        { title, content, tags },
        { withCredentials: true },
      );

      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  //   Add Note
  const addNewNote = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/note/add`,
        { title, content, tags },
        { withCredentials: true },
      );

      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      {/* Close Button */}
      <button
        className="absolute -top-2 -right-2 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 text-gray-400 transition-all duration-200"
        onClick={onClose}
      >
        <MdClose className="text-lg" />
      </button>

      {/* Header */}
      <div className="mb-6">
        <span className="text-[11px] font-semibold tracking-wider text-brand-500 uppercase">
          {type === "edit" ? "Edit Note" : "New Note"}
        </span>
      </div>

      {/* Title */}
      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-xl font-semibold text-gray-800 outline-none bg-transparent border-b-2 border-gray-100 pb-2 focus:border-brand-400 transition-colors placeholder:text-gray-300 placeholder:font-normal"
          placeholder="Give your note a title..."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 mt-5">
        <label className="input-label">Content</label>
        <textarea
          className="text-sm text-gray-700 outline-none bg-gray-50/80 border border-gray-200 p-4 rounded-2xl resize-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-gray-400"
          placeholder="Write your note content here..."
          rows={8}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      {/* Tags */}
      <div className="mt-5">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-red-500 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2 mt-4">
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* Submit Button */}
      <button className="btn-primary mt-6" onClick={handleAddNote}>
        {type === "edit" ? "Update Note" : "Create Note"}
      </button>
    </div>
  );
};

export default AddEditNotes;

const API_URL = import.meta.env.VITE_API_URL;
import React, { useEffect, useState } from "react";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import { signoutSuccess } from "../../redux/user/userSlice";

const Home = () => {
  const { currentUser, loading, errorDispatch } = useSelector(
    (state) => state.user,
  );

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  // Helper: if any API call returns 401, force logout
  const handleUnauthorized = () => {
    dispatch(signoutSuccess());
    navigate("/login");
    toast.error("Session expired. Please login again.");
  };

  useEffect(() => {
    if (currentUser === null || !currentUser) {
      navigate("/login");
    } else {
      setUserInfo(currentUser?.rest);
      getAllNotes();
    }
  }, []);

  // get all notes
  const getAllNotes = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/note/all`, {
        withCredentials: true,
      });

      if (res.data.success === false) {
        console.log(res.data);
        return;
      }

      setAllNotes(res.data.notes);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        handleUnauthorized();
      }
    }
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const res = await axios.delete(`${API_URL}/api/note/delete/${noteId}`, {
        withCredentials: true,
      });

      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
    } catch (error) {
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        toast(error.message);
      }
    }
  };

  const onSearchNote = async (query) => {
    try {
      const res = await axios.get(`${API_URL}/api/note/search`, {
        params: { query },
        withCredentials: true,
      });

      if (res.data.success === false) {
        console.log(res.data.message);
        toast.error(res.data.message);
        return;
      }

      setIsSearch(true);
      setAllNotes(res.data.notes);
    } catch (error) {
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

    try {
      const res = await axios.put(
        `${API_URL}/api/note/update-note-pinned/${noteId}`,
        { isPinned: !noteData.isPinned },
        { withCredentials: true },
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        console.log(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
    } catch (error) {
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Section Header */}
        {allNotes.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                {isSearch ? "Search Results" : "Your Notes"}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {allNotes.length} note{allNotes.length !== 1 && "s"}{" "}
                {isSearch && "found"}
              </p>
            </div>
            {isSearch && (
              <button
                onClick={handleClearSearch}
                className="text-xs font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {allNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createdAt}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => deleteNote(note)}
                onPinNote={() => updateIsPinned(note)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            message={
              isSearch
                ? "Oops! No notes found matching your search. Try a different keyword."
                : "Ready to capture your ideas? Click the '+' button to start noting down your thoughts, inspiration, and reminders. Let's get started!"
            }
          />
        )}
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed right-8 bottom-8 w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-lg hover:shadow-glow active:scale-95 transition-all duration-200 z-40"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[28px] text-white" />
      </button>

      {/* Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(4px)",
            zIndex: 50,
          },
        }}
        contentLabel=""
        className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] max-h-[85vh] bg-white rounded-3xl mx-auto mt-16 p-6 sm:p-8 overflow-auto shadow-2xl outline-none"
      >
        <AddEditNotes
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </div>
  );
};

export default Home;

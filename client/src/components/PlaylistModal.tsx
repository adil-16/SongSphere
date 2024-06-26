// src/components/CreatePlaylistModal.tsx

import React, { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const auth = getAuth();

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleCreate = async () => {
    onCreate(title, description);

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User is signed in:", user.uid);
        try {
          const response = await axios.post(
            "http://localhost:4000/api/playlist/create",
            {
              userId: user.uid,
              title: title,
              description: description,
            }
          );
          console.log("Playlist created successfully:", response.data);
          toast.success("Playlist created successfully");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } catch (error) {
          const axiosError = error as AxiosError;
          console.error("Error creating playlist:", axiosError);

          if (!axiosError.response) {
            toast.error(
              "Cannot connect to the server. Please ensure the server is running."
            );
          } else {
            toast.error("Error: " + (error || axiosError.message));
          }
        }
      } else {
        console.log("No user is signed in.");
      }
    });

    setTitle("");
    setDescription("");
    onClose();
  };

  if (!isOpen && !showToast) {
    return null;
  }

  return (
    <>
      {showToast && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-2 px-4 rounded-xl z-50">
          Playlist created successfully!
        </div>
      )}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-40">
          <div className="relative bg-white p-6 rounded-lg w-full max-w-2xl mx-4">
            <button
              className="absolute top-0 right-0 text-3xl font-bold text-black rounded-full bg-transparent hover:bg-gray-200 p-2 m-2"
              onClick={onClose}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-black text-center mb-4">
              Create Playlist
            </h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Playlist Title"
              className="p-2 w-full border rounded mb-4 text-black"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="p-2 w-full border rounded mb-4 h-20 text-black"
            ></textarea>
            <div className="flex justify-center">
              <button
                className="bg-red-600 text-white hover:bg-red-800 hover:text-white font-bold py-2 px-4 rounded"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePlaylistModal;

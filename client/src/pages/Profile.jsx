import React, { useState, useEffect } from "react";
import { createAvatar } from "@dicebear/core";
import * as bigSmile from "@dicebear/big-smile";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatarSeed } from "@/redux/thunks/authThunks";

const Profile = () => {
  const { firstName, lastName, email, avatarSeed } = useSelector(
    (state) => state.auth?.user
  );
  const [seed, setSeed] = useState(firstName + lastName || "defaultSeed");
  const [preview, setPreview] = useState(seed);
  const [avatarUri, setAvatarUri] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [editing, setEditing] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const generateAvatar = async () => {
      const avatar = createAvatar(bigSmile, {
        seed: preview,
        backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
      });
      const uri = await avatar.toDataUri();
      setAvatarUri(uri);
    };

    generateAvatar();
  }, [preview]);
  useEffect(() => {
    if (avatarSeed) {
      setSeed(avatarSeed);
      setPreview(avatarSeed);
    }
  }, [avatarSeed]);

  const handleRandomize = () => {
    const newSeed = Math.random().toString(36).substring(2, 10);
    setPreview(newSeed);
  };

  const handleSave = () => {
    setSeed(preview);
    if (!isAuthenticated) return;
    dispatch(updateAvatarSeed({ avatarSeed: preview }));
    setEditing(false);
    // Backend should return updated avatarSeed in response
  };

  return (
    <div className="h-full w-full overflow-hidden flex items-center justify-center p-4 bg-[#EFEFEF]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">My Profile</h2>

        <div className="flex flex-col items-center">
          {avatarUri && (
            <img
              src={avatarUri}
              alt="avatar"
              className="w-24 h-24 rounded-full border border-gray-300"
            />
          )}

          {editing ? (
            <>
              <button
                onClick={handleRandomize}
                className="mt-2 text-blue-500 text-sm"
              >
                Randomize Avatar
              </button>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setPreview(seed);
                    setEditing(false);
                  }}
                  className="px-3 py-1 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="mt-2 text-sm text-blue-500"
            >
              Change Avatar
            </button>
          )}
        </div>

        <div className="space-y-2">
          <div>
            <label className="block text-sm text-gray-600">FirstName</label>
            <input
              value={firstName}
              disabled
              className="w-full border bg-gray-100 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">LastName</label>
            <input
              value={lastName}
              disabled
              className="w-full border bg-gray-100 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input
              value={email}
              disabled
              className="w-full border bg-gray-100 p-2 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

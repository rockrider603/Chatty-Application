import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="flex flex-col gap-8 w-full max-w-2xl space-y-4">
        {/* First Div - Profile Header, Image, Full Name, Email */}
        <div className="flex flex-col gap-4 bg-base-200 rounded-lg p-10 space-y-8">
          {/* Header section */}
          <div className="text-center m-2">
            <p className="text-2xl text-base-content mb-3">Profile</p>
            <p className="text-lg text-base-content/70">Your profile information</p>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative mb-5">
              <img
                src={selectedImg || authUser?.profilePic || "../pfp.jpg"}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-primary"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-primary p-3 rounded-full cursor-pointer hover:bg-primary-focus transition"
              >
                <Camera className="w-6 h-6 text-white" />
              </label>
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </div>
            <p className="text-sm text-base-content/60 text-center">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Full Name Section */}
          <div className="flex flex-col pb-6 border-b border-base-300">
            <div className="flex items-center gap-4 mb-3">
              <User className="w-6 h-6 text-primary" />
              <h3 className="text-sm font-semibold text-base-content/70">Full Name</h3>
            </div>
            <p className="text-l  text-base-content ml-10">
              {authUser?.fullName || "fullname of the user"}
            </p>
          </div>

          {/* Email Address Section */}
          <div className="flex flex-col ">
            <div className="flex items-center gap-4 mb-3">
              <Mail className="w-6 h-6 text-primary" />
              <h3 className="text-sm font-semibold text-base-content/70">Email Address</h3>
            </div>
            <p className="text-l  text-base-content ml-10 break-all">
              {authUser?.email || "user@example.com"}
            </p>
          </div>
        </div>

        {/* Second Div - Account Information */}
        <div className="flex flex-col gap-3 bg-base-200 rounded-lg p-15 space-y-8">
          <p className="text-xl  text-base-content">Account Information</p>

          <div className="space-y-8 ">
            {/* Member Since */}
            <div className="flex justify-between text-center pb-6 border-b border-base-300">
              <span className="text-base-content/70 font-medium text-lg m-2">Member Since</span>
              <span className="text-l font-bold text-base-content">
                {authUser?.createdAt?.split("T")[0] }
              </span>
            </div>

            {/* Account Status */}
            <div className="flex justify-between items-center">
              <span className="text-base-content/70 font-medium text-lg">Account Status</span>
              <span className="text-l font-bold text-success">Active</span>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default ProfilePage;

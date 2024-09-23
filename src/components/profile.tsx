import React from "react";

interface ProfileProps {
  userProfile: {
    display_name: string;
    email: string;
    images: { url: string }[];
  } | null;
}

const Profile: React.FC<ProfileProps> = ({ userProfile }) => {
  return (
    <div className="flex items-center my-4">
      {userProfile?.images[0]?.url ? (
        <img
          src={userProfile.images[0].url}
          alt="Profile"
          className="w-12 h-12 rounded-full mr-4"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-400 mr-4" />
      )}
      <div>
        <h2 className="text-lg font-bold">{userProfile?.display_name || "User"}</h2>
        <p className="text-sm text-gray-300">{userProfile?.email || "No email provided"}</p>
      </div>
    </div>
  );
};

export default Profile;

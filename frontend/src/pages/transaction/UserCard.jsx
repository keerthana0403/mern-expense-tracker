import React from "react";

const UserCard = ({ firstName, lastName, email }) => {
  return (
    <div className="bg-base-100 shadow-md rounded-xl p-4 flex items-center space-x-4 max-w-md mx-auto">
      <div>
        <img
          src={
            "https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?cs=srgb&dl=pexels-bertellifotografia-3792581.jpg&fm=jpg"
          }
          alt="User Avatar"
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>
      <div className="text-gray-700">
        <p className="text-lg font-semibold">
          {firstName} {lastName}
        </p>
        <p className="text-sm">{email}</p>
      </div>
    </div>
  );
};

export default UserCard;

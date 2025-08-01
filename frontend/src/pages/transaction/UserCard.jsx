import React from "react";

const UserCard = ({ firstName, lastName, email, date }) => {
  return (
    <div className="p-4 flex flex-col justify-center items-center text-center space-x-4 max-w-md mx-auto">
      <div>
        <img
          src={
            "https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?cs=srgb&dl=pexels-bertellifotografia-3792581.jpg&fm=jpg"
          }
          alt="User Avatar"
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>
      <div className="text-gray-300">
        <p className="text-lg font-semibold">
          {firstName} {lastName}
        </p>
        <p className="text-md">{email}</p>
        {date && (
          <p className="text-sm">
            Member since {new Date(date).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCard;

import React from "react";

interface NotificationPropsI {
  notification: string;
}

export default function Notification({ notification }: NotificationPropsI) {
  return (
    <div className="absolute top-4 left-4 text-red-800  border-2 border-red-800 rounded-lg overflow-hidden">
      <span className="bg-white/80 px-4 py-1 ">{notification}</span>
    </div>
  );
}

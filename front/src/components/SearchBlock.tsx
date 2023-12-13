import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import Notification from "./Notification";
import Loading from "./Loading";

export default function SearchBlock() {
  const [notification, setNotification] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (notification.length === 0) return;
    setTimeout(() => {
      setNotification("");
    }, 4000);
  }, [notification]);
  return (
    <div className="m-auto relative w-3/5 h-3/5 backdrop-blur-lg rounded-md bg-white/40 ">
      <SearchForm setNotification={setNotification} setLoading={setLoading} />

      {notification.length !== 0 && (
        <Notification notification={notification} />
      )}
      {loading && <Loading />}
    </div>
  );
}

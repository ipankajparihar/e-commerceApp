import React from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

const UserDetail = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  return <div>{user ? <div>SignedIn as {user.email}</div> : null}</div>;
};

export default UserDetail;

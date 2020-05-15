import React, { createContext, useState, useEffect } from "react";
import { auth, generateUserDocument } from "../firebase";

export const UserContext = createContext({ user: null });
const UserProvider = props => {

  const [user, setUser]  = useState(null);

  useEffect(() => {
    console.log("user: ", user)
    auth.onAuthStateChanged(userAuth => {
      generateUserDocument(userAuth).then(userData => {
        setUser(userData);
      })
    });
  }, []);

    return (
      <UserContext.Provider value={user}>
        {props.children}
      </UserContext.Provider>
    );
}
export default UserProvider;
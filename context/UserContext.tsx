"use client";

import React, { createContext, useReducer, useContext, useEffect } from "react";
import { User, UserState, UserAction } from "@/types/User";

const initialState: UserState = {
  user: null,
  loading: true,
};

const UserContext = createContext<{
  user: UserState;
  userDispatch: React.Dispatch<UserAction>;
}>({
  user: initialState,
  userDispatch: () => null,
});

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "SET_USER":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload, loading: false };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { ...state, user: null, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, userDispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      userDispatch({ type: "SET_USER", payload: JSON.parse(storedUser) });
    } else {
      userDispatch({ type: "LOGOUT" });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

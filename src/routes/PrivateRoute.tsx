import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../app/hooks";

export function PrivateRoute({ children }: any) {
  const auth = useAuth();
  const location = useLocation();
  const url = new URLSearchParams();
  url.set("redirect", location.pathname + location.search);

  return auth.token ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/",
        search: url.toString(),
      }}
    />
  );
}

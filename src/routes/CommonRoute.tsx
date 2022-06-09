import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../app/hooks";

export function CommonRoute({ children, ...rest }: any) {
  const auth = useAuth();
  const location = useLocation();
  const url = new URLSearchParams(location.search.slice(1));

  return auth.token ? <Navigate to={url.get("redirect") || "/news"} /> : children;
}

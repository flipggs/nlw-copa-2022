import { useContext } from "react";

import { AuthContext, AuthContextDataProps } from "../context/AuthContexts";

export function useAuth(): AuthContextDataProps {
  const context = useContext(AuthContext);

  return context;
}

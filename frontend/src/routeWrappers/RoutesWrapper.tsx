import React, { Suspense, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import LoadingFallback from "../components/LoadingFallback";
import Footer from "../components/Footer";

interface RoutesWrapperProps {
  children: React.ReactElement;
}

export default function RoutesWrapper({ children }: RoutesWrapperProps) {
  const { getUser, loginUser, logoutUser, user } = useContext(UserContext);

  const authenticate = () => {
    getUser().then(({ user, token }) => {
      if (token) {
        loginUser(token, user);
      } else {
        logoutUser();
      }
    });
  };

  useEffect(authenticate, [user?.updated_at]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      {children}
      <Footer />
    </Suspense>
  );
}

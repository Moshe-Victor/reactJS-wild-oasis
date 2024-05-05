import { useUser } from "../features/authentication/useUser.js";
import Spinner from "./Spinner.jsx";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-items: center;
`;

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  const { user, isLoading, isAuthenticated } = useUser();

  // 2. If there is no authenticated user, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading]);

  // 3. while loading, show spinner
  if (isLoading) return <Spinner />;

  // 4. If there is a user render the application
  if (isAuthenticated) return children;
};

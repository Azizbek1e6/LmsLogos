import React from "react";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Redirect is handled inside the form
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <ForgotPasswordForm onSuccess={handleSuccess} />
    </div>
  );
};

export default ForgotPassword;

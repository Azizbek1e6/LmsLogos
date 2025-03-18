import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { isUsingMockData } from "@/lib/supabase";

export function DemoModeBanner() {
  if (!isUsingMockData) return null;

  return (
    <Alert
      variant="warning"
      className="mb-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
    >
      <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      <AlertTitle className="text-yellow-600 dark:text-yellow-400">
        Demo Mode Active
      </AlertTitle>
      <AlertDescription className="text-yellow-600 dark:text-yellow-400">
        This application is running in demo mode with mock data. To enable full
        functionality, please set up your Supabase credentials in the
        environment variables.
      </AlertDescription>
    </Alert>
  );
}

import { Suspense } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import AppRoutes from "./routes";

function App() {
  // Only render tempo routes when VITE_TEMPO is true
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <AppRoutes />
      {tempoRoutes}
    </Suspense>
  );
}

export default App;

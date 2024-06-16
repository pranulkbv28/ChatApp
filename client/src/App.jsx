import { Navigate, Route, Routes } from "react-router-dom";
import { Home, Login, Signup } from "./pages/!pagesExports";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Preview from "./pages/Preview/Preview";

function App() {
  const { authUser, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <div className={`p-4 flex h-screen items-center justify-center`}>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </div>
  );
}

export default App;

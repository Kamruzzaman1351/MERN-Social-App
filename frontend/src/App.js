import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UserFeedPage from "./pages/UserFeedPage";
import UserProfilePage from "./pages/UserProfilePage";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>      
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/feeds" element={<UserFeedPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

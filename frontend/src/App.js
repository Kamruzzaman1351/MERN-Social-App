import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UserFeedPage from "./pages/UserFeedPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserLists from "./pages/UserLists";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserPrivatRoute from "./components/UserPrivatRoute";
import { useSelector } from "react-redux"
function App() {
  const {user} = useSelector(state => state.user)
  return (
    <>      
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            {user ? 
              <Route path="/" element={<UserFeedPage />} /> : 
              <Route path="/" element={<SignInPage />} />
            }
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/feeds" element={<UserPrivatRoute />}>
              <Route path="/feeds" element={<UserFeedPage />} />
            </Route>
            <Route path="/alluser" element={<UserPrivatRoute />}>
              <Route path="/alluser" element={<UserLists />} />
            </Route>
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

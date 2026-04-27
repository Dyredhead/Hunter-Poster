// import { useEffect, useState } from "react";
// import { getHealth } from "./api/health";
// import { userGetById } from "./api/users";
import { Routes, Route } from "react-router-dom";
import { GreeterPage, LoginPage, RegisterPage, ForYouPage, FollowingPage, ProfilePage, PostCreationPage, NotificationPage } from "./pages"
import { NavBar } from "./components/NavBar";

export default function App() {
    // const [healthMessage, setHealthMessage] = useState<string>("");
    // const [userEmail, setUserEmail] = useState<string>("");

    // useEffect(() => {
    //     void getHealth().then((data) => {
    //         setHealthMessage(data.message);
    //     });

    //     void userGetById({ id: 1 }).then((data) => {
    //         setUserEmail(data.user.email);
    //     });
    // }, []);

    return (
      <Routes>
        <Route path="/" element={<GreeterPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        
        <Route element={<NavBar/>}>
          <Route path="/home">
            <Route path="for-you" element={<ForYouPage />} />
            <Route path="following" element={<FollowingPage />} />
          </Route>


          <Route path="/profile">
            <Route path=":username" element={<ProfilePage />} />
          </Route>

          
          <Route path="/notifications" element={<NotificationPage />} />

          <Route path="/post">
            <Route path="create" element={<PostCreationPage />} />
          </Route>
        </Route>

      </Routes>
    
  );
};


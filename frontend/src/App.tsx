// import { useEffect, useState } from "react";
// import { getHealth } from "./api/health";
// import { userGetById } from "./api/users";
import { Routes, Route } from 'react-router-dom';
import * as pages from './pages';
import { NavBar } from './components/NavBar';

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
      <Route path="/" element={<pages.GreeterPage />} />
      <Route path="/auth/login" element={<pages.LoginPage />} />
      <Route path="/auth/register" element={<pages.RegisterPage />} />

      <Route element={<NavBar />}>
        <Route path="/home">
          <Route path="for-you" element={<pages.ForYouPage />} />
          <Route path="following" element={<pages.FollowingPage />} />
        </Route>

        <Route path="/profile">
          <Route path=":username" element={<pages.ProfilePage />} />
        </Route>

        <Route path="/notifications" element={<pages.NotificationPage />} />

        <Route path="/post">
          <Route path="create" element={<pages.PostCreationPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

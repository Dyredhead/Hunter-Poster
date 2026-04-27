// import { useEffect, useState } from "react";
// import { getHealth } from "./api/health";
// import { userGetById } from "./api/users";
import { Routes, Route } from 'react-router-dom';
import * as pages from './pages';

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
    </Routes>
  );
}

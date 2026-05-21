// import { useEffect, useState } from "react";
// import { getHealth } from "./api/health";
// import { userGetById } from "./api/users";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import NotFoundPage from "./NotFound";
import * as pages from "./pages";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
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

            <Route element={<ProtectedRoute />}>
                <Route path="/auth/logout" element={<pages.LogoutPage />} />
                <Route element={<NavBar />}>
                    <Route path="/home" element={<pages.HomeLayout />}>
                        <Route path="for-you" element={<pages.ForYouPage />} />
                        <Route
                            path="following"
                            element={<pages.FollowingPage />}
                        />
                    </Route>

                    <Route path="/profile">
                        <Route index element={<pages.ProfilePage />}></Route>
                        <Route
                            path=":id"
                            element={<pages.ProfilePage />}
                        ></Route>
                    </Route>

                    <Route path="/settings" element={<pages.SettingsPage />} />

                    <Route
                        path="/notifications"
                        element={<pages.NotificationPage />}
                    />

                    <Route path="/post">
                        <Route
                            path="create"
                            element={<pages.PostCreationPage />}
                        />
                    </Route>
                </Route>
            </Route>
            {/* catch-all & named 404 page*/}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

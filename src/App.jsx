import React, { useState } from "react";
import Header from "./components/header";
import MoviesList from "./components/MoviesList.jsx";
import Movie from "./components/movie.jsx";
import AddReview from "./components/addReview";
import Login from "./components/login";
import { Routes, Route } from "react-router-dom";
function App() {
    const [user, setUser] = useState(null);
    const [id, setId] = useState("");
    return (
        <>
            <Header user={user} setUser={setUser}  />

            <Routes>
                <Route path="/" element={<MoviesList />}></Route>
                <Route
                    path="/movies/:id/review"
                    element={<AddReview user={user} id={id} />}
                ></Route>
                <Route
                    path="/movies/:id/"
                    element={<Movie user={user} id={id} />}
                ></Route>
                <Route
                    path="/login"
                    element={
                        <Login
                            user={user}
                            setUser={setUser}
                            id={id}
                            setId={setId}
                        />
                    }
                ></Route>
            </Routes>
        </>
    );
}

export default App;

import React, { useState, useEffect } from "react";
import MovieDataService from "../services/MovieDataService";
import { Link } from "react-router-dom";
import { Form, Button, Card, Col, Row, Container } from "react-bootstrap";

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchRating, setSearchRating] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"]);

    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] = useState("");
    useEffect(() => {
        setCurrentPage(0);
    }, [currentSearchMode]);
    useEffect(() => {
        // retrieveMovies();
        retrieveNextPage();
    }, [currentPage]);
    useEffect(() => {
        // setTimeout(() => {
        retrieveMovies();
        retrieveRatings();
        // }, 300);
    }, []);
    const retrieveMovies = async () => {
        setCurrentSearchMode("");
        MovieDataService.getAll(currentPage)
            .then((res) => {
                setMovies(res.data.movies);
                setCurrentPage(res.data.page);
                setEntriesPerPage(res.data.entries_per_page);
                console.log(res.data.page);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const retrieveRatings = () => {
        MovieDataService.getRatings()
            .then((response) => {
                //start with 'All ratings' if user doesn't specify any ratings
                setRatings(["All Ratings"].concat(response.data));
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const retrieveNextPage = () => {
        if (currentSearchMode === "findByTitle") findByTitle();
        else if (setCurrentSearchMode === "findByRating") findByRating();
        else retrieveMovies();
    };

    const find = (query, by) => {
        MovieDataService.find(query, by, currentPage)
            .then((response) => {
                setMovies(response.data.movies);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        setCurrentSearchMode("findByTitle");
        find(searchTitle, "title");
    };

    const findByRating = () => {
        setCurrentSearchMode("findByRating");
        if (searchRating === "All Ratings") {
            retrieveMovies();
        } else {
            find(searchRating, "rated");
        }
    };
    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const onChangeSearchRating = (e) => {
        const searchRating = e.target.value;
        setSearchRating(searchRating);
    };
    return (
        <Container>
            <Form>
                <Row style={{ marginTop: "20px" }}>
                    <Col>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Search by title"
                                value={searchTitle}
                                onChange={onChangeSearchTitle}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </Button>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control
                                as="select"
                                onChange={onChangeSearchRating}
                            >
                                {ratings.length &&
                                    ratings.map((rating, index) => {
                                        return (
                                            <option value={rating} key={index}>
                                                {rating}
                                            </option>
                                        );
                                    })}
                            </Form.Control>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="button"
                            onClick={findByRating}
                        >
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Row style={{ paddingTop: "12px" }}>
                {movies.length > 0 ? (
                    movies.map((movie, index) => {
                        return (
                            <Col style={{ paddingTop: "20px" }}>
                                <Card key={index} style={{ width: "20rem" }}>
                                    <Card.Img
                                        src={movie.poster + "/100px180"}
                                    />
                                    <Card.Body>
                                        <Card.Title>{movie.title}</Card.Title>
                                        <Card.Text>
                                            Rating: {movie.rated}
                                        </Card.Text>
                                        <Card.Text>{movie.plot}</Card.Text>
                                        <Link to={"/movies/" + movie._id}>
                                            View Reviews
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })
                ) : (
                    <></>
                )}
            </Row>
            <br />
            Showing page: {currentPage}.
            <Button
                variant="link"
                onClick={() => {
                    setCurrentPage(currentPage + 1);
                }}
            >
                Get next {entriesPerPage} results
            </Button>
        </Container>
    );
};

export default MoviesList;

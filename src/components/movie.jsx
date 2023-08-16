import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import MovieDataService from "../services/MovieDataService";
import { Col, Image, Card, Container, Row, Button } from "react-bootstrap";

const Movie = (props) => {
    const { id } = useParams();
    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: [],
    });
    const getMovie = (id) => {
        MovieDataService.get(id)
            .then((response) => {
                setMovie(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    useEffect(() => {
        getMovie(id);
    }, []);
    const deleteReview = (reviewId, index) => {
        MovieDataService.deleteReview(reviewId, props.id)
            .then((response) => {
                setMovie((prevState) => {
                    prevState.reviews.splice(index, 1);
                    return { ...prevState };
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };
    return (
        <>
            <Container>
                <Row style={{ marginTop: "20px" }}>
                    <Col>
                        <Image src={movie.poster + "/100px250"} fluid />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>{movie.plot}</Card.Text>
                                {props.user && (
                                    <Link to={"/movies/" + id + "/review"}>
                                        Add Review
                                    </Link>
                                )}
                            </Card.Body>
                        </Card>
                        <br />
                        <h2>Reviews</h2>
                        {movie.reviews.map((review, index) => {
                            return (
                                <Card key={index}>
                                    <Card.Body>
                                        <h5>
                                            {review.name + " reviewd on "}
                                            {moment(review.date).format(
                                                "Do MMMM YYYY"
                                            )}
                                        </h5>
                                        <p>{review.review}</p>
                                        {props.user &&
                                            props.id === review.user_id && (
                                                <Row>
                                                    <Col>
                                                        <Link
                                                            // to={{
                                                            //     pathname:
                                                            //         "/movies/" +
                                                            //         +id +
                                                            //         "/review",
                                                            //     state: {
                                                            //         currentReview:
                                                            //             "review",
                                                            //     },
                                                            // }}
                                                            to={
                                                                "/movies/" +
                                                                id +
                                                                "/review"
                                                            }
                                                            state={{
                                                                currentReview:
                                                                    review._id,
                                                            }}
                                                        >
                                                            Edit
                                                        </Link>
                                                    </Col>
                                                    <Col>
                                                        <Button
                                                            variant="link"
                                                            onClick={() =>
                                                                deleteReview(
                                                                    review._id,
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            )}
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Movie;

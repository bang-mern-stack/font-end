import React, { useState } from "react";
import MovieDataService from "../services/MovieDataService";
import { Link, useParams, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const AddReview = (props) => {
    let editing = false;
    let initialReviewState = "";
    const propLocation = useLocation();
    const { id } = useParams();
    const [review, setReview] = useState(initialReviewState);
    // keeps track if review is submitted
    const [submitted, setSubmitted] = useState(false);
    const onChangeReview = (e) => {
        const review = e.target.value;
        setReview(review);
    };
    if (propLocation.state && propLocation.state.currentReview) {
        // data.review_id = propLocation.state.currentReview;
        editing = true;
        initialReviewState = propLocation.state.currentReview.review;
    }
    const saveReview = () => {
        var data = {
            review: review,
            name: props.user,
            user_id: props.id,
            movie_id: id, // get movie id derect from url
        };
        // MovieDataService.createReview(data)
        //     .then((response) => {
        //         setSubmitted(true);
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     });

        if (editing) {
            // get existing review id
            data.review_id = propLocation.state.currentReview;
            MovieDataService.updateReview(data)
                .then((response) => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            MovieDataService.createReview(data)
                .then((response) => {
                    setSubmitted(true);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };
    return (
        <div>
            {submitted ? (
                <div>
                    <h4>Review submitted successfully</h4>
                    <Link to={"/movies/" + id}>Back to Movie</Link>
                </div>
            ) : (
                <Form style={{ padding: "30px" }}>
                    <Form.Group>
                        <Form.Label>
                            {editing ? "Edit" : "Create"}
                            Review
                        </Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={review}
                            onChange={onChangeReview}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={saveReview}>
                        Submit
                    </Button>
                </Form>
            )}
        </div>
    );
};

export default AddReview;

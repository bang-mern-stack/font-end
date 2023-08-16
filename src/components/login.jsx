import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
const Login = (props) => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const navigate = useNavigate();
    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };
    const onChangeId = (e) => {
        const id = e.target.value;
        setId(id);
    };
    const login = () => {
        props.setUser(name);
        props.setId(id);
        navigate("/");
        // props.login({ name: name, id: id });
        // props.history.push("/");
    };
    // console.log(props.user)
    return (
        <div>
            <Form style={{ padding: "30px", paddingTop: " 20px" }}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={name}
                        onChange={onChangeName}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter id"
                        value={id}
                        onChange={onChangeId}
                    />
                </Form.Group>
                <Button variant="primary" onClick={login}>
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Login;

import {Col} from "react-bootstrap";
import React from "react";

export default function Message({ message }) {
    return (
        <Col className="align-self-center">
            <p className="text-center small-box text-danger" >{message}</p>
        </Col>
    )
}
import React, { useState, useEffect, useRef } from 'react';
import Card from "react-bootstrap/esm/Card";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import InputGroup from "react-bootstrap/esm/InputGroup";
import axios from "axios";

function ControlPanel({storefront, setStorefront}) {
    if (storefront) {
        var { user_id, purchasing, preparing, price } = storefront;
    }
    const [userIDState, setUserID] = useState(user_id);
    const [purchasingState, setPurchasing] = useState(purchasing);
    const [preparingState, setPreparing] = useState(preparing);
    const [priceState, setPrice] = useState(price);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const prevStorefront = usePrevious(storefront);

    function turnRequestPayload (){ 
        return {
            user_id: userIDState,
            purchasing: purchasingState,
            preparing: preparingState,
            price: priceState
        }
    }

    function dashboardRequestPayload() {
        return {
            user_id: userIDState
        }
    }

    function numberValue(e) {
        let v = parseInt(e.target.value);
        return isNaN(v) ? 0 : v
    }

    useEffect(() => {
        if (storefront === null) {
            async function fetchData() {
                const result = await axios.post("/api/dashboard", dashboardRequestPayload());
                setStorefront(result.data);
            }
            fetchData();
        } 
    });
    
    useEffect(() => {
        if (storefront && (JSON.stringify(storefront) != JSON.stringify(prevStorefront))) {
            setUserID(storefront.user_id);
            setPurchasing(storefront.purchasing);
            setPreparing(storefront.preparing);
            setPrice(storefront.price);
        }
    });

    function handleTakeTurn() {
        async function fetchData() {
            const result = await axios.post("/api/turn", turnRequestPayload());
            setStorefront(result.data);
        }
        fetchData();
    }

    function handleRefresh() {
        async function fetchData() {
            const result = await axios.post("/api/dashboard", dashboardRequestPayload());
            setStorefront(result.data);
        }
        fetchData();
    }

    return (
        <Card>
            <Card.Header><Card.Title>Control Panel</Card.Title></Card.Header>
            <Card.Body>
                <Form>

                    <Form.Group controlId="turnForm.Player">
                        <Form.Label>Player</Form.Label>

                        <InputGroup className="mb-3">
                            <Form.Control
                                type="text" value={userIDState} 
                                onChange={(e) => setUserID(e.target.value) } />
                            <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={() => handleRefresh()}>Load</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="turnForm.Purchase">
                        <Form.Label>Purchase</Form.Label>
                        <Form.Control 
                            type="text" value={purchasingState} 
                            onChange={(e) => setPurchasing(numberValue(e))} />
                    </Form.Group>
                    <Form.Group controlId="turnForm.Prepare">
                        <Form.Label>Prepare</Form.Label>
                        <Form.Control 
                            type="text" value={preparingState} 
                            onChange={(e) => setPreparing(numberValue(e))} />
                    </Form.Group>
                    <Form.Group controlId="turnForm.Price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                            type="text" value={priceState}
                            onChange={(e) => setPrice(numberValue(e))} />
                    </Form.Group>
                    <Button onClick={() => handleTakeTurn()}>Take Turn</Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default ControlPanel
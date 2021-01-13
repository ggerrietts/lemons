
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Weather from './Weather';
import Inventory from './Activity';
import Status from './Status';
import TitleBar from './TitleBar';
import ControlPanel from './ControlPanel';
import { useState } from 'react';


function Dashboard() {
    const [storefront, setStorefront] = useState(null);
    return (
        <Container>
            <Row>
                <TitleBar storefront={storefront}/>
            </Row>
            <Row>
                <Col>
                    <Weather storefront={storefront}/>
                </Col>
                <Col>
                    <Inventory storefront={storefront}/>
                </Col>
                <Col>
                    <Status storefront={storefront}/>
                </Col>
                <Col>
                    <ControlPanel storefront={storefront} setStorefront={setStorefront} />
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard
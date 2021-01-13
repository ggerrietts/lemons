import Card from "react-bootstrap/esm/Card";
import Table from "react-bootstrap/esm/Table";

function Activity({storefront}) {
    if (storefront) {
        var { purchased, prepared, sales, price, waste, demand } = storefront;
    }
    return (
        <Card>
            <Card.Header><Card.Title>Activity</Card.Title></Card.Header>
            <Card.Body>
                <Table borderless>
                    <tbody>
                        <tr>
                            <th>Purchased:</th>
                            <td>{ purchased }</td>
                        </tr>
                        <tr>
                            <th>Prepared:</th>
                            <td>{ prepared }</td>
                        </tr>
                        <tr>
                            <th>Sales:</th>
                            <td>{ sales } @ { price / 100 } = { sales * price / 100 }</td>
                        </tr>
                        <tr>
                            <th>Waste:</th>
                            <td>{ waste }</td>
                        </tr>
                        <tr>
                            <th>Demand:</th>
                            <td>{ demand }</td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default Activity
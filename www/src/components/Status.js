import Card from "react-bootstrap/esm/Card";
import Table from "react-bootstrap/esm/Table"

function currencyFormat(n) {
    return '$' + n.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function Status({storefront}) {
    if (storefront) {
        var { turn, backstock, cash } = storefront;
        cash = currencyFormat(cash / 100.0)
    }
    
    return (
        <Card>
            <Card.Header><Card.Title>Store Status</Card.Title></Card.Header>
            <Card.Body>
                <Table borderless>
                    <tbody>
                        <tr>
                            <th>Turn:</th>
                            <td>{ turn }</td>
                        </tr>
                        <tr>
                            <th>Backstock:</th>
                            <td>{ backstock }</td>
                        </tr>
                        <tr>
                            <th>Cash:</th>
                            <td>{ cash }</td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default Status
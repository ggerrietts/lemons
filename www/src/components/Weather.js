import Card from "react-bootstrap/esm/Card";
import Table from "react-bootstrap/esm/Table";

function Weather({storefront}) {
    if (storefront) {
        var { cur_prec, cur_temp, for_prec, for_temp } = storefront;
    }
    return (
        <Card>
            <Card.Header><Card.Title>Weather</Card.Title></Card.Header>
            <Card.Body>
                <Table borderless>
                    <tbody>
                        <tr>
                            <th>Current Precipitation:</th>
                            <td>{ cur_prec }</td>
                        </tr>
                        <tr>
                            <th>Current Temperature:</th>
                            <td>{ cur_temp }</td>
                        </tr>
                        <tr>
                            <th>Forecast Precipitation:</th>
                            <td>{ for_prec }</td>
                        </tr>
                        <tr>
                            <th>Forecast Temperature:</th>
                            <td>{ for_temp }</td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}

export default Weather
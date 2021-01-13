
function TitleBar({storefront}) {
    let userID = storefront?.user_id
    if (userID) {
        return (
            <h1>{userID}'s lemonade stand</h1>
        );
    }
    return (
        <h1>lemonade stand</h1>
    );
}

export default TitleBar
import requests
import json

post_data = {
    "id": 1,
    "email": "geoff@gerrietts.net",
    "password": "abcdef",
    "name": "Geoff Gerrietts"
}


def try_post():
    return requests.post("http://localhost:4242/user",
                         data=json.dumps(post_data),
                         headers={"content-type": "application/json"})

def try_get():
    resp = do_login()
    return requests.get("http://localhost:4242/user/2", cookies={"jwt_token": resp.cookies["jwt_token"]})

def do_login():
    return requests.post("http://localhost:4242/login",
                         data=json.dumps({"email": "geoff@gerrietts.net", "password": "abcdef"}),
                         headers={"content-type": "application/json"})

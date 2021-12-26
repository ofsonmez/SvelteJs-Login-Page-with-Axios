const jsonServer = require("json-server");
const app = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router("./mock-data.json");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(middlewares);
module.exports = app.use((req, res, next) => {
    if (req.method === "GET") {
        console.log(req);
        next();
    } else {
        if (req.path === "/login") {
            getToken(req, res);
        } else {
            console.log("I am in error");
            res.sendStatus(404);
        }
    }
});

function getToken(req, res) {
    if (req.body.username === mock.login.username) {
        if (req.body.password === mock.login.password) {
            res.json({
                token: mock.token,
                user: mock.user,
            });
        } else {
            res.json({
                error: "Invalid Password",
            });
        }
    } else {
        res.sendStatus(404);
    }
}

let mock = {
    login: {
        username: "johndoe123",
        password: "123456",
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    user: {
        id: 1,
        username: "johndoe123",
        password: "123456",
        firstName: "john",
        lastName: "doe",
        role: "test",
    },
};

app.use(router);
app.listen(3000, () => {
    console.log("JSON Server is running on 3000");
});

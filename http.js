const http = require("http");
const server = http.createServer();

const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gamil.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabien Predovic",
    email: "Conne1129@gmail.com",
    password: "password",
  },
];

const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
];

const httpRequestListener = function (request, response) {
  const { url, method } = request;

  if (method === "GET") {
    //GET 요청이 들어왔고
    if (url === "/ping") {
      //요청이 보내지는 target 이 /ping 이라는 endpoint 라면
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "pong" }));
    } else if (method === "POST") {
      //만약 POST method 이고
      if (url === "/users") {
        //target이 /users/signup 이라면

        let body = "";
        request.on("data", (data) => {
          //Request 객체의 on이라는 method를 이용해 "data" event를 등록
          body += data; //(data)부터는 콜백함수
        }); //여러가지 데이터를 해당 로직에서 사용하려면 하나로 합쳐야한다. += data 가 그런 뜻

        request.on("end", () => {
          // 콜백함수
          const user = JSON.parse(body); // body 데이터를 JSON.parse 함수로 돌려 JSON함수를 JS의 오브젝트로

          users.push({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
          });

          response.end(JSON.stringify({ message : "Ok" });
        });
      }
    }
  }
};

server.on("request", httpRequestListener);

const IP = "127.0.0.1";
const PORT = 8000;

server.listen(PORT, IP, function () {
  console.log(`Listening to request on ip ${IP} & port ${PORT}`);
});

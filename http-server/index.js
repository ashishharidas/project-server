const http = require("http");
const fs = require("fs");

// Read only the necessary HTML files
const homeContent = fs.readFileSync("home.html", "utf-8");
const projectContent = fs.readFileSync("project.html", "utf-8");

http
  .createServer((request, response) => {
    const url = request.url;
    response.writeHead(200, { "Content-Type": "text/html" });

    switch (url) {
      case "/":
        response.end(homeContent);
        break;
      case "/project":
        response.end(projectContent);
        break;
      default:
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end("<h1>404 - Page Not Found</h1>");
    }
  })
  .listen(3001, () => {
    console.log("Server running at http://localhost:3001");
  });

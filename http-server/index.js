const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

// Parse command line args
const args = minimist(process.argv.slice(2));
const PORT = args.port || 3001;

// Load HTML files
const homeContent = fs.readFileSync("home.html", "utf-8");
const projectContent = fs.readFileSync("project.html", "utf-8");
const registrationContent = fs.readFileSync("registration.html", "utf-8");

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
      case "/registration":
        response.end(registrationContent);
        break;
      default:
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end("<h1>404 - Page Not Found</h1>");
    }
  })
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

// Parse command line args
const args = minimist(process.argv.slice(2));
const PORT = args.port || 3000;

// Load HTML files with error handling
let homeContent, projectContent, registrationContent;

try {
  homeContent = fs.readFileSync("home.html", "utf-8");
} catch (err) {
  console.error("Error reading home.html:", err.message);
  homeContent = "<h1>Error: home.html not found</h1>";
}

try {
  projectContent = fs.readFileSync("project.html", "utf-8");
} catch (err) {
  console.error("Error reading project.html:", err.message);
  projectContent = "<h1>Error: project.html not found</h1>";
}

try {
  registrationContent = fs.readFileSync("registration.html", "utf-8");
} catch (err) {
  console.error("Error reading registration.html:", err.message);
  registrationContent = "<h1>Error: registration.html not found</h1>";
}

http
  .createServer((request, response) => {
    const url = request.url;

    switch (url) {
      case "/":
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(homeContent);
        break;
      case "/project":
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(projectContent);
        break;
      case "/registration":
        response.writeHead(200, { "Content-Type": "text/html" });
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

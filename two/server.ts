import { IncomingMessage, ServerResponse, createServer } from "node:http";
import { dispatch } from "./backend";
import fs from "node:fs/promises";

async function startServer(host: string, port: number) {
  const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    if (!req.url || req.url === "/") {
      res.statusCode = 200;
      res.appendHeader("Content-Type", "text/html");
      const html = await fs.readFile('./index.html');
      res.end(html);
    } else if (req.url == "/frontend.js") {
      res.statusCode = 200;
      res.appendHeader("Content-Type", "application/javascript");
      const html = await fs.readFile('./frontend.js');
      res.end(html);
    } else {
      try {
        const body = JSON.parse(await getBody(req));
        const response = await dispatch({ path: req.url || "", body });
        res.statusCode = 200;
        res.end(JSON.stringify(response));
      } catch (e) {
        res.statusCode = 400;
        res.end(JSON.stringify(e));
      }
    }
  });

  server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
  });
}

async function getBody(request: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const bodyParts: Uint8Array[] = [];

    request.on('error', (error) => {
      console.log(error);
      reject(error);
    })

    request.on('data', (chunk) => {
      bodyParts.push(chunk);
    })

    request.on('end', () => {
      const body = Buffer.concat(bodyParts).toString();
      resolve(body);
    });
  });
}

(async () => {
  await startServer("127.0.0.1", 3000);
})();

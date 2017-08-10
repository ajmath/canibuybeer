import {APIGatewayEvent, Context, ProxyCallback} from "aws-lambda";
import hapiServerSupplier from "./server";
import * as fs from "fs";
import config from "./config";

function fatalErrorResponse(message: string, error: Error) {
  return {
    statusCode: 500,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ message, error }),
  }
}

export async function httpHandler(event: APIGatewayEvent, context: Context, callback: ProxyCallback) {
  context.callbackWaitsForEmptyEventLoop = false;

  for (const dir of [".", config.hapi.server.connections.routes.files.relativeTo]) {
    console.log(`Listing contents of '${dir}'`);
    fs.readdirSync(dir).forEach((f) => console.log(f));
    console.log();
  }

  let request = {
    method: event.httpMethod,
    url: event.path,
    headers: event.headers,
    payload: event.body,
  };

  try {
    const server = await hapiServerSupplier();
    const response = await server.inject(request);
    const apigResponse = {
      statusCode: response.statusCode,
      headers: response.headers,
      body: response.rawPayload.toString("utf8"),
    };
    console.log("Returning from lambda response", apigResponse);
    callback(null, apigResponse);
  } catch (error) {
    console.error("Fatal exception in http handler", error);
    callback(null, fatalErrorResponse("Internal server error", error))
  }
}

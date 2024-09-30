import { NextRequest } from "next/server";
import { NatsService } from "../../../pubsub/nats";
import { createAppJwt } from "../../../pubsub/userJwt";

let service: NatsService | null = null;


export async function GET(req: NextRequest) {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  if (!service) {
    console.log("Initializing NATS service");
    const natsUrl = "europe-west3-gcp-dl-testnet-brokernode-frankfurt01.synternet.com:4222";
    const subject = "synternet.price.all";
    const accessToken = process.env.ACCESS_TOKEN;
    if (!accessToken) return;

    service = new NatsService({
      url: natsUrl,
      natsCredsFile: createAppJwt(accessToken),
    });

    console.log("Connecting to NATS server...");
    await service.waitForConnection();
    console.log("Connected to NATS server.");

    service.addHandler(subject, async (data: Uint8Array) => {
      const decodedData = new TextDecoder().decode(data);
      console.log(`Received message on ${subject}: ${decodedData}`);
      await writer.write(encoder.encode(`data: ${decodedData}\n\n`));
    });

    await service.serve();
  }

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
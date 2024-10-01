import { NextRequest } from "next/server";
import { NatsService } from "../../../pubsub/nats";
import { createAppJwt } from "../../../pubsub/userJwt";

let publishService: NatsService | null = null;

async function publishServiceFn(){
  try{
    if (publishService) {
      const subject = "stark.sports.data";
    
      let count = 1;
      setInterval(async () => {
        try {
          const response = await fetch("https://cricbuzz-live.vercel.app/v1/score/100229", {
            method: "GET",
          });
          const data = await response.json();
          console.log(`Publishing message count : ${count}`);
          // console.log(`Publishing message : ${count} ${JSON.stringify(data.data)} to subject: ${subject}`);
          await publishService?.publishJSON(subject, data.data);
          count++;
          } catch (error) {
            console.error("Failed to fetch data after multiple attempts:", error);
        }
        }, 2000);
    }
  }catch(e){
    console.error("Error publishing to NATS:", e);
  }
}


let subscribeService: NatsService | null = null;

async function connectToPublishAndSubscribe(){
  if (!subscribeService && !publishService) {
    const publishAccessToken = process.env.PUBLISH_ACCESS_TOKEN;
    const subscribeAccessToken = process.env.SUBSCRIBE_ACCESS_TOKEN;
    const natsUrl = "europe-west3-gcp-dl-testnet-brokernode-frankfurt01.synternet.com:4222";

    if (!publishAccessToken || !subscribeAccessToken) return;
    console.log("Initializing NATS publish Service");
    
    publishService = new NatsService({
      url: natsUrl,
      natsCredsFile: createAppJwt(publishAccessToken),
    });
    console.log("Initializing NATS subscribe Service");
    subscribeService = new NatsService({
      url: natsUrl,
      natsCredsFile: createAppJwt(subscribeAccessToken),
    });

    if (!publishService || !subscribeService) return;
    
    console.log("Connecting to subscribe/publish NATS server...");
    await Promise.all([publishService.waitForConnection(), subscribeService.waitForConnection()]);
    console.log("Connected to subscribe/publish NATS server.");
  }
  return [publishService,subscribeService];
}

export async function GET(req: NextRequest) {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  if (!subscribeService) {
    await connectToPublishAndSubscribe();
    
    const subject = "stark.sports.data";
    
    subscribeService.addHandler(subject, async (data: Uint8Array) => {
      const decodedData = new TextDecoder().decode(data);
      console.log(`Received message on ${subject}: ${decodedData}`);
      await writer.write(encoder.encode(`data: ${decodedData}\n\n`));
    });
    
    await subscribeService.serve();
    await publishServiceFn();
  }

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
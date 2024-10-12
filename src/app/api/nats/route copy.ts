// import { NextRequest } from "next/server";
// import { NatsService } from "../../../pubsub/nats";
// import { createAppJwt } from "../../../pubsub/userJwt";

// export const dynamic = "force-dynamic";

// let subscribeService: NatsService | null = null;

// async function connectToSubscribe() {
//   if (!subscribeService) {
//     const subscribeAccessToken = process.env.SUBSCRIBE_ACCESS_TOKEN;
//     const natsUrl = "europe-west3-gcp-dl-testnet-brokernode-frankfurt01.synternet.com:4222";

//     if (!subscribeAccessToken) throw new Error("Subscribe access token not found");

//     subscribeService = new NatsService({
//       url: natsUrl,
//       natsCredsFile: createAppJwt(subscribeAccessToken),
//     });

//     await subscribeService.waitForConnection();
//     console.log("Connected to subscribe NATS server.");
//   }
//   return subscribeService;
// }

// export async function GET(req: NextRequest) {
//   const responseStream = new TransformStream();
//   const writer = responseStream.writable.getWriter();
//   const encoder = new TextEncoder();

//   const service = await connectToSubscribe();
//   const subject = "stark.sports.data";

//   service.addHandler(subject, async (data: Uint8Array) => {
//     const decodedData = new TextDecoder().decode(data);
//     console.log(`Received message on ${subject}`);
//     await writer.write(encoder.encode(`data: ${decodedData}\n\n`));
//   });

//   await service.serve();

//   req.signal.addEventListener("abort", () => {
//     console.log("Connection aborted by the client");
//     writer.close().catch(console.error);
//   });

//   return new Response(responseStream.readable, {
//     headers: {
//       "Content-Type": "text/event-stream",
//       "Cache-Control": "no-cache",
//       Connection: "keep-alive",
//     },
//   });
// }

// // import { NextRequest } from "next/server";
// // import { NatsService } from "../../../pubsub/nats";
// // import { createAppJwt } from "../../../pubsub/userJwt";

// // let subscribeService: NatsService | null = null;

// // async function connectToSubscribe() {
// //   if (!subscribeService) {
// //     const subscribeAccessToken = process.env.SUBSCRIBE_ACCESS_TOKEN;
// //     const natsUrl = "europe-west3-gcp-dl-testnet-brokernode-frankfurt01.synternet.com:4222";

// //     if (!subscribeAccessToken) return;

// //     subscribeService = new NatsService({
// //       url: natsUrl,
// //       natsCredsFile: createAppJwt(subscribeAccessToken),
// //     });

// //     if (!subscribeService) return;
// //     await subscribeService.waitForConnection();
// //     console.log("Connected to subscribe NATS server.");
// //   }
// //   return subscribeService;
// // }

// // export async function GET(req: NextRequest) {
// //   const responseStream = new TransformStream();
// //   const writer = responseStream.writable.getWriter();
// //   const encoder = new TextEncoder();

// //   let isConnectionClosed = false;

// //   req.signal.addEventListener("abort", () => {
// //     console.log("Connection aborted by the client");
// //     isConnectionClosed = true;
// //     writer.close().catch(console.error);
// //   });

// //   if (!subscribeService) {
// //     await connectToSubscribe();
// //   }
// //   const subject = "stark.sports.data";

// //   subscribeService?.addHandler(subject, async (data: Uint8Array) => {
// //     const decodedData = new TextDecoder().decode(data);
// //     console.log(`Received message on ${subject}`);
// //     if (!isConnectionClosed) {
// //       try {
// //         await writer.write(encoder.encode(`data: ${decodedData}\n\n`));
// //       } catch (error) {
// //         console.error("Error writing to stream:", error);
// //         // If we get an ERR_INVALID_STATE error, we'll just ignore it
// //         // as it means the stream is already closed
// //       }
// //     }
// //   });

// //   await subscribeService?.serve();

// //   return new Response(responseStream.readable, {
// //     headers: {
// //       "Content-Type": "text/event-stream",
// //       "Cache-Control": "no-cache",
// //       Connection: "keep-alive",
// //     },
// //   });
// // }

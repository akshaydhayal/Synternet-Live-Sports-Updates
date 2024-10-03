// import { NextRequest } from "next/server";
// import { NatsService } from "../../../pubsub/nats";
// import { createAppJwt } from "../../../pubsub/userJwt";

// let publishService: NatsService | null = null;
// let subscribeService: NatsService | null = null;

// async function publishServiceFn() {
//   try {
//     if (publishService) {
//       const subject = "stark.sports.data";
//       let count = 1;

//       const fetchAndPublish = async () => {
//         try {
//           let liveMatchesResponse = await fetch("https://cricbuzz-live.vercel.app/v1/matches/live", {
//             method: "GET",
//           });
//           let liveMatchesData = await liveMatchesResponse.json();
//           let liveMatchesId = liveMatchesData.data.matches.map((match) => match.id);
//           console.log(liveMatchesId);

//           let toPublishData = {
//             "liveMatchDetails":liveMatchesData.data.matches,
//             "liveMatchStats":[]
//           };
//           const fetchAndPublishScores = async () => {
//             try {
//               // let toPublishData = [];
//               toPublishData.liveMatchStats = [];
//               const responses = await Promise.all(liveMatchesId.map((id) => fetch(`https://cricbuzz-live.vercel.app/v1/score/${id}`)));
//               for (let i = 0; i < responses.length; i++) {
//                 const matchData = await responses[i].json();
//                 // toPublishData.push({ [liveMatchesId[i]]: { ...matchData.data, rand: Math.random() } });
//                 // toPublishData.liveMatchStats.push({ [liveMatchesId[i]]: matchData.data });
//                 toPublishData.liveMatchStats.push({ [liveMatchesId[i]]: {...matchData.data, update:matchData.data.update + Math.random()} });
//               }
//               // console.log(`Publishing message count : ${count} ${JSON.stringify(toPublishData)}`);
//               console.log(`Publishing message count : ${count} `);
//               await publishService?.publishJSON(subject, toPublishData);
//               count++;
//             } catch (error) {
//               console.error("Failed to fetch match scores:", error);
//             }
//           };

//           await fetchAndPublishScores();
//           setInterval(fetchAndPublishScores, 10000); // Every minute
//         } catch (e) {
//           console.error("Failed to fetch live matches:", e);
//         }
//       };

//       await fetchAndPublish();
//       setInterval(fetchAndPublish, 3600000); // Every hour
//     }
//   } catch (e) {
//     console.error("Error publishing to NATS:", e);
//   }
// }

// async function connectToPublishAndSubscribe() {
//   if (!subscribeService && !publishService) {
//     const publishAccessToken = process.env.PUBLISH_ACCESS_TOKEN;
//     const subscribeAccessToken = process.env.SUBSCRIBE_ACCESS_TOKEN;
//     const natsUrl = "europe-west3-gcp-dl-testnet-brokernode-frankfurt01.synternet.com:4222";

//     if (!publishAccessToken || !subscribeAccessToken) return;

//     publishService = new NatsService({
//       url: natsUrl,
//       natsCredsFile: createAppJwt(publishAccessToken),
//     });

//     subscribeService = new NatsService({
//       url: natsUrl,
//       natsCredsFile: createAppJwt(subscribeAccessToken),
//     });

//     if (!publishService || !subscribeService) return;

//     await Promise.all([publishService.waitForConnection(), subscribeService.waitForConnection()]);
//     console.log("Connected to subscribe/publish NATS server.");
//   }
//   return [publishService, subscribeService];
// }



// export async function GET(req: NextRequest) {
//   const responseStream = new TransformStream();
//   const writer = responseStream.writable.getWriter();
//   const encoder = new TextEncoder();

//   let isConnectionClosed = false;

//   req.signal.addEventListener("abort", () => {
//     console.log("Connection aborted by the client");
//     isConnectionClosed = true;
//     writer.close().catch(console.error);
//   });

//   if (!subscribeService) {
//     await connectToPublishAndSubscribe();

//     const subject = "stark.sports.data";

//     subscribeService.addHandler(subject, async (data: Uint8Array) => {
//       const decodedData = new TextDecoder().decode(data);
//       console.log(`Received message on ${subject}`);
//       if (!isConnectionClosed) {
//         try {
//           await writer.write(encoder.encode(`data: ${decodedData}\n\n`));
//         } catch (error) {
//           if (error.code !== "ERR_INVALID_STATE") {
//             console.error("Error writing to stream:", error);
//           }
//           // If we get an ERR_INVALID_STATE error, we'll just ignore it
//           // as it means the stream is already closed
//         }
//       }
//     });

//     await subscribeService.serve();
//     await publishServiceFn();
//   }

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

// // let publishService: NatsService | null = null;

// // async function publishServiceFn() {
// //   try {
// //     if (publishService) {
// //       const subject = "stark.sports.data";
// //       let count = 1;

// //       // Define the function for fetching live matches and publishing data
// //       const fetchAndPublish = async () => {
// //         try {
// //           // Fetch the list of live matches
// //           let liveMatchesResponse = await fetch("https://cricbuzz-live.vercel.app/v1/matches/live", {
// //             method: "GET",
// //           });
// //           let liveMatchesData = await liveMatchesResponse.json();
// //           let liveMatchesId = liveMatchesData.data.matches.map((match) => match.id);
// //           console.log(liveMatchesId);

// //           // Function to fetch individual match scores and publish them
// //           const fetchAndPublishScores = async () => {
// //             try {
// //               let toPublishData = [];
// //               // Fetch individual match data in parallel
// //               const responses = await Promise.all(liveMatchesId.map((id) => fetch(`https://cricbuzz-live.vercel.app/v1/score/${id}`)));
// //               for (let i = 0; i < responses.length; i++) {
// //                 const matchData = await responses[i].json();
// //                 // toPublishData.push({ [liveMatchesId[i]]: matchData.data });
// //                 toPublishData.push({ [liveMatchesId[i]]: {...matchData.data,rand:Math.random()} });
// //                 // console.log(matchData);
// //               }
// //               // Publish the data
// //               console.log(`Publishing message count : ${count}`);
// //               await publishService?.publishJSON(subject, toPublishData);
// //               count++;
// //             } catch (error) {
// //               console.error("Failed to fetch match scores:", error);
// //             }
// //           };

// //           // Call the function to fetch and publish scores immediately
// //           await fetchAndPublishScores();
// //           setInterval(fetchAndPublishScores, 1000 * 60); // Every minute for individual match scores
// //         } catch (e) {
// //           console.error("Failed to fetch live matches:", e);
// //         }
// //       };

// //       await fetchAndPublish();
// //       setInterval(fetchAndPublish, 1000 * 60 * 60); // Every hour for live matches
// //     }
// //   } catch (e) {
// //     console.error("Error publishing to NATS:", e);
// //   }
// // }

// // let subscribeService: NatsService | null = null;

// // async function connectToPublishAndSubscribe(){
// //   if (!subscribeService && !publishService) {
// //     const publishAccessToken = process.env.PUBLISH_ACCESS_TOKEN;
// //     const subscribeAccessToken = process.env.SUBSCRIBE_ACCESS_TOKEN;
// //     const natsUrl = "europe-west3-gcp-dl-testnet-brokernode-frankfurt01.synternet.com:4222";

// //     if (!publishAccessToken || !subscribeAccessToken) return;
// //     console.log("Initializing NATS publish Service");

// //     publishService = new NatsService({
// //       url: natsUrl,
// //       natsCredsFile: createAppJwt(publishAccessToken),
// //     });
// //     console.log("Initializing NATS subscribe Service");
// //     subscribeService = new NatsService({
// //       url: natsUrl,
// //       natsCredsFile: createAppJwt(subscribeAccessToken),
// //     });

// //     if (!publishService || !subscribeService) return;

// //     console.log("Connecting to subscribe/publish NATS server...");
// //     await Promise.all([publishService.waitForConnection(), subscribeService.waitForConnection()]);
// //     console.log("Connected to subscribe/publish NATS server.");
// //   }
// //   return [publishService,subscribeService];
// // }

// // export async function GET(req: NextRequest) {
// //   const responseStream = new TransformStream();
// //   const writer = responseStream.writable.getWriter();
// //   const encoder = new TextEncoder();

// //   if (!subscribeService) {
// //     await connectToPublishAndSubscribe();

// //     const subject = "stark.sports.data";

// //     subscribeService.addHandler(subject, async (data: Uint8Array) => {
// //       const decodedData = new TextDecoder().decode(data);
// //       // console.log(`Received message on ${subject}: ${decodedData}`);
// //       console.log(`Received message on ${subject}`);
// //       await writer.write(encoder.encode(`data: ${decodedData}\n\n`));
// //     });

// //     await subscribeService.serve();
// //     await publishServiceFn();
// //   }

// //   return new Response(responseStream.readable, {
// //     headers: {
// //       "Content-Type": "text/event-stream",
// //       "Cache-Control": "no-cache",
// //       Connection: "keep-alive",
// //     },
// //   });
// // }

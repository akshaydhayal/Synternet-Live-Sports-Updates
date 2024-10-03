// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { AlertCircle } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { MoonIcon, SunIcon } from "lucide-react";
// import Header from "@/components/Header";

// const Navbar = ({ toggleTheme, isDarkMode, setSelectedMatch }) => {
//   return (
//     <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 px-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-2xl font-bold">CricketLive</h1>
//         <div className="flex items-center gap-4">
//           <Button onClick={() => setSelectedMatch(null)} className=" bg-blue-700 hover:bg-blue-600 text-white ">
//             Back to Live Matches
//           </Button>
//           <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-white">
//             {isDarkMode ? <SunIcon className="h-[1.2rem] w-[1.2rem]" /> : <MoonIcon className="h-[1.2rem] w-[1.2rem]" />}
//           </Button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// const MatchDetails = ({ match, isDarkMode }) => {
//   const isMatchEnded = match.liveScore === "";

//   return (
//     <div className="flex justify-center">
//     <Card className={`w-4/5 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} overflow-hidden`}>
//       <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
//         <CardTitle className=" text-white text-2xl font-bold">{match.title}</CardTitle>
//       </CardHeader>
//       <CardContent className="px-6 p-4">
//         {isMatchEnded ? (
//           <>
//             <p className="text-xl font-bold mb-4">{match.update}</p>
//             <p className="text-lg">This match has ended and is no longer live.</p>
//           </>
//         ) : (
//           <>
//             <p className="text-3xl font-bold mb-2 text-center">{match.liveScore}</p>
//             <p className="text-lg mb-4 text-center font-semibold">{match.update}</p>

//             <div className="space-y-8">
//               <div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="bg-gray-500 dark:bg-gray-500">
//                         <th className="p-2 text-left font-semibold">Batter</th>
//                         <th className="p-2 text-left font-semibold">R</th>
//                         <th className="p-2 text-left font-semibold">B</th>
//                         <th className="p-2 text-left font-semibold">4s</th>
//                         <th className="p-2 text-left font-semibold">6s</th>
//                         <th className="p-2 text-left font-semibold">SR</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr className="border-b dark:border-gray-600">
//                         <td className="p-2 font-medium">{match.batsmanOne}</td>
//                         <td className="p-2">{match.batsmanOneRun}</td>
//                         <td className="p-2">{match.batsmanOneBall.replace(/[()]/g, "")}</td>
//                         <td className="p-2">0</td>
//                         <td className="p-2">0</td>
//                         <td className="p-2">{match.batsmanOneSR}</td>
//                       </tr>
//                       <tr>
//                         <td className="p-2 font-medium">{match.batsmanTwo}</td>
//                         <td className="p-2">{match.batsmanTwoRun}</td>
//                         <td className="p-2">{match.batsmanTwoBall.replace(/[()]/g, "")}</td>
//                         <td className="p-2">0</td>
//                         <td className="p-2">0</td>
//                         <td className="p-2">{match.batsmanTwoSR}</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               <div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="bg-gray-400 dark:bg-gray-700">
//                         <th className="p-2 text-left font-semibold">Bowler</th>
//                         <th className="p-2 text-left font-semibold">O</th>
//                         <th className="p-2 text-left font-semibold">M</th>
//                         <th className="p-2 text-left font-semibold">R</th>
//                         <th className="p-2 text-left font-semibold">W</th>
//                         <th className="p-2 text-left font-semibold">ECO</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr className="border-b dark:border-gray-600">
//                         <td className="p-2 font-medium">{match.bowlerOne}</td>
//                         <td className="p-2">{match.bowlerOneOver}</td>
//                         <td className="p-2">0</td>
//                         <td className="p-2">{match.bowlerOneRun}</td>
//                         <td className="p-2">{match.bowlerOneWickets}</td>
//                         <td className="p-2">{match.bowlerOneEconomy}</td>
//                       </tr>
//                       <tr>
//                         <td className="p-2 font-medium">{match.bowlerTwo}</td>
//                         <td className="p-2">{match.bowlerTwoOver}</td>
//                         <td className="p-2">0</td>
//                         <td className="p-2">{match.bowlerTwoRun}</td>
//                         <td className="p-2">{match.bowlerTwoWicket}</td>
//                         <td className="p-2">{match.bowlerTwoEconomy}</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </CardContent>
//     </Card>
//     </div>
//   );
// };

// const SportsUpdate = () => {
//   const [liveMatches, setLiveMatches] = useState([]);
//   const [selectedMatch, setSelectedMatch] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [liveMatchesData,setLiveMatchesData]=useState(null);
//   const [selectedMatchId,setSelectedMatchId]=useState(null);

//   console.log("live matches data from header : ",liveMatchesData);
//   console.log("live matches data api : ",liveMatches);

//   useEffect(() => {
//     fetchLiveMatches();
//   }, []);

//   const fetchLiveMatches = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("https://cricbuzz-live.vercel.app/v1/matches/live");
//       setLiveMatches(response.data.data.matches);
//       setError(null);
//     } catch (err) {
//       setError("Failed to fetch live matches. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchMatchDetails = async (matchId) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`https://cricbuzz-live.vercel.app/v1/score/${matchId}`);
//       setSelectedMatch(response.data.data);
//       setError(null);
//     } catch (err) {
//       setError("Failed to fetch match details. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackToList = () => {
//     setSelectedMatch(null);
//   };

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   useEffect(()=>{
//     if(liveMatchesData){
//       for (let i=0; i<liveMatchesData.length;i++){
//         if(Object.keys(liveMatchesData[i])[0]==selectedMatchId){
//           console.log("liveMatchedData set the values to liveMatches");
//           setLiveMatches(liveMatchesData[i][selectedMatchId]);
//         }
//       }
//     }
//   },[liveMatchesData]);
  

//   if (loading) {
//     return (
//       <div className={`flex justify-center items-center h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`flex justify-center items-center h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
//         <Alert variant="destructive" className="w-full max-w-md">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
//       <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} setSelectedMatch={setSelectedMatch} />
//       <Header setLiveMatchesData={setLiveMatchesData} />

//       <div className="container mx-auto p-4">
//         {selectedMatch ? (
//           <div>
//             <MatchDetails match={selectedMatch} isDarkMode={isDarkMode} />
//           </div>
//         ) : (
//           <div>
//             <h1 className={`text-4xl font-bold mb-8 text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>Live Cricket Matches</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {liveMatches.length>0 && liveMatches.map((match) => (
//                 <Card
//                   key={match.id}
//                   className={`cursor-pointer hover:shadow-lg transition-shadow duration-200 ${
//                     isDarkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-white hover:bg-gray-50 text-gray-900"
//                   }`}
//                   onClick={() => {
//                     fetchMatchDetails(match.id)
//                     setSelectedMatchId(match.id);
//                   }}
//                 >
//                   <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500">
//                     <CardTitle className="text-white">{match.title}</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="font-semibold text-lg mb-2">
//                       {match.teams[0]?.team} vs {match.teams[1]?.team}
//                     </p>
//                     <p className="font-medium">
//                       {match.teams[0]?.team}: <span className="text-blue-500">{match.teams[0]?.run}</span>
//                     </p>
//                     <p className="font-medium">
//                       {match.teams[1]?.team}: <span className="text-blue-500">{match.teams[1]?.run}</span>
//                     </p>
//                     <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-2`}>
//                       {match.timeAndPlace.date} {match.timeAndPlace.time} {match.timeAndPlace.place}
//                     </p>
//                     <p className="text-sm font-semibold mt-2 text-green-500">{match.overview}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SportsUpdate;
import React, { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";

//@ts-expect-error Function
const Header = ({ setLiveMatchStats }) => {
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef(null);

  useEffect(() => {
    const connectEventSource = () => {
      if (typeof window === "undefined") return;

      if (eventSourceRef.current) {
        //@ts-expect-error close
        eventSourceRef.current.close();
      }
      
      const eventSource = new EventSource("/api/nats");
      //@ts-expect-error close
      eventSourceRef.current = eventSource;
      
      eventSource.onopen = () => {
        console.log("EventSource connected");
        setIsConnected(true);
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setLiveMatchStats(data);
        } catch (error) {
          console.error("Error parsing event data:", error);
        }
      };

      eventSource.onerror = (error) => {
        console.error("EventSource failed:", error);
        setIsConnected(false);
        eventSource.close();
        setTimeout(connectEventSource, 5000);
      };
    };
    
    connectEventSource();
    
    return () => {
      if (eventSourceRef.current) {
        //@ts-expect-error close
        eventSourceRef.current.close();
      }
    };
  }, [setLiveMatchStats]);

  return (
    <header className="py-6 bg-gradient-to-r from-green-700 via-green-800 to-green-900 shadow-lg">
      <div className="container mx-auto text-center">
        <div className="flex items-center gap-6 justify-center">
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-500">Cricket Live</h1>
          <FaBell className={`text-yellow-400 mb-2 text-4xl ${isConnected ? "animate-bounce" : ""}`} />
        </div>
        <p className="text-lg text-gray-300">Stay updated with real-time cricket scores and match details from around the world.</p>
        <p className={`mt-2 ${isConnected ? "text-green-400" : "text-red-500"}`}>{isConnected ? "Connected to live updates" : "Connecting to server..."}</p>
      </div>
    </header>
  );
};

export default Header;



// import React, { useEffect, useRef, useState } from "react";
// import { FaBell } from "react-icons/fa";

// //@ts-expect-error Function
// const Header = ({ setLiveMatchStats }) => {
//   const eventSourceRef = useRef(null);
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     const connectEventSource = () => {
//       if (typeof window === "undefined") return; // Only run on client-side

//       if (eventSourceRef.current) {
//         //@ts-expect-error close
//         eventSourceRef.current.close();
//       }

//       const eventSource = new EventSource("/api/nats");
//       //@ts-expect-error types
//       eventSourceRef.current = eventSource;

//       eventSource.onopen = () => {
//         console.log("EventSource connected");
//         setIsConnected(true);
//       };

//       eventSource.onmessage = (event) => {
//         try {
//           const data = JSON.parse(event.data);
//           setLiveMatchStats(data); // Pass the entire data object
//         } catch (error) {
//           console.error("Error parsing event data:", error);
//         }
//       };

//       eventSource.onerror = (error) => {
//         console.error("EventSource failed:", error);
//         setIsConnected(false);
//         eventSource.close();
//         setTimeout(connectEventSource, 5000); // Retry after 5 seconds
//       };

//       return eventSource;
//     };

//     connectEventSource();

//     return () => {
//       if (eventSourceRef.current) {
//         //@ts-expect-error close
//         eventSourceRef.current.close();
//       }
//     };
//   }, []);

//   return (
//     <header className="py-6 bg-gradient-to-r from-green-700 via-green-800 to-green-900 shadow-lg">
//       <div className="container mx-auto text-center">
//         <div className="flex items-center gap-6 justify-center">
//           <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-500">Cricket Live</h1>
//           <FaBell className={`text-yellow-400 mb-2 text-4xl ${isConnected ? "animate-bounce" : ""}`} />
//         </div>
//         <p className="text-lg text-gray-300">Stay updated with real-time cricket scores and match details from around the world.</p>
//         {!isConnected && <p className="text-red-500 mt-2">Connecting to server...</p>}
//       </div>
//     </header>
//   );
// };

// export default Header;

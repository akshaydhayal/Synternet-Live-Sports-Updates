# Synternet Live Cricket Match Stats

Live Project Link: [https://synternet-live-sports-updates.vercel.app/](https://synternet-live-sports-updates.vercel.app/)

## Description

Cricket Live is a dynamic web application that fetches and displays real-time match updats from Cicket API, leveraging Synternet for live data streaming. Match Updates are published to Synternet data streams at regular 1 minute intervals from a EC2 Server, ensuring users receive the latest stats in real time. With an intuitive interface that supports both dark and light modes, CricketLive ensures an engaging user experience, whether you're a casual fan or a dedicated follower of the sport.

## Features
- **Live Match Updates Publishing**: Live Headlines from a Cricket API are published every minute through a EC2 Server, providing real-time updates.
- **Client Subscribes to Synternet Stream:**: Utilizes Synternet to subscribe to live Cricket Match Stats.
- **Live Match Updates:**: Provides real-time scores and updates for ongoing cricket matches. Displays match status (live/ended) and key moments.
- **Match Details View:**: Clicking on a match opens detailed stats, including player performance (batsmen and bowlers). Shows individual player statistics like runs, balls faced, and strike rate for batsmen, and overs, runs conceded, and wickets taken for bowlers.
- **Real-Time Updates:**: The app dynamically updates the feed without needing a page reload, offering a continuous flow of news as it is published to the data stream.
- **User-Friendly Interface:**: Intuitive navigation with a sleek, dark/light mode toggle.The app dynamically updates the feed without needing a page reload, offering a continuous flow of news as it is published to the data stream.

## Website Demo

![Mission Dashboard](https://github.com/akshaydhayal/Synternet-Live-Sports-Updates/blob/main/Create-Next-App%20(1).png)

*Figure 1: All Live Matches Happening*
![Mission Dashboard](https://github.com/akshaydhayal/Synternet-Live-Sports-Updates/blob/main/Create-Next-App%20(2).png)

*Figure 2: Live Match Stats Page*



## Video Demo:
https://www.loom.com/share/1113f9f485d24e949d135f1d3b3f7417?sid=a92a807f-a537-425f-b0f0-b3220bcc7c03

## Technologies Used

- **Frontend**: Next.js, React,  Tailwind CSS, Lucide Icons
- **Live streams**: Synternet, EC2 Server
  
## Synternet Streams Used

- **Published Stream**: stark.sports.data
- **Subscribed streams**: stark.sports.data

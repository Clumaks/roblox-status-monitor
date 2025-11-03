import express from "express";
import fetch from "node-fetch";

const app = express();
const USER_ID = "569802216"; 

app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://presence.roblox.com/v1/presence/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userIds: [USER_ID] })
    });

    const data = await response.json();
    const userPresence = data.userPresences[0];

    if (userPresence.userPresenceType === 2) {
      res.status(200).send("In Game 🎮");
    } else {
      res.status(503).send("Not In Game ❌");
    }
  } catch (error) {
    res.status(500).send("Error checking Roblox status");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

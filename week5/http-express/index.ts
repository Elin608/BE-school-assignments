//Task 1:
//Success, 200 OK. 404 if the route not exist. Not found. 
import express from "express";
const app = express();
app.get("/", (req, res) => {
    res.send("Welcome to my art gallery!");

});

//Task 2 & 3 :
//Success, 200 OK. 404 if the route not exist. Not found.
app.get("/gallery", (req, res) => {
    res.json({
        title: "Art Gallery",
        categories: {
            graffiti: ["Street Life", "Abandoned Dreams"],
            locations: ["Street Art", "Abounded Buildings"]
        },
        lastUpdated: new Date().toISOString()
    });

});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//Task 4:
//Success, 200 OK. 404 if the route not exist. Not found.
app.get("/featured", (req, res) => {
    res.json({
        title: "Featured Graffiti",
        artist: "Unknow Artist",
        location: "Abandoned Factory,Valencia",
        style: "Street Art",
    });
});

//Task 5:
//I use res.send because it only returns a plain text message.
app.get("/about", (req, res) => {
    res.send("Welcome to the world of street art!");
});

//Task 6: Done



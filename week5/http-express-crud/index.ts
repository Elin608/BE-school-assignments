import express from "express";
const app = express();
app.use(express.json());
type Party = {
    id: number;
    name: string;
    leader: string;
    seats: number;
};

type PartyParams = {
    id: string;
};

let parties: Party[] = [
    { id: 1, name: "Socialdemokraterna", leader: "Magdalena Andersson", seats: 200 },
    { id: 2, name: "Moderaterna", leader: "Ulf", seats: 20 },
];

//Task 1:

app.get("/parties", (req, res) => {
    res.status(200).json(parties);
});
app.post("/parties", (req, res) => {
    const { name, leader, seats } =
        req.body;
    const newParty: Party = {
        id: parties.length + 1,
        name: name,
        leader: leader,
        seats: seats,
    };

    parties.push(newParty);
    res.status(201).json(newParty);

});

app.put("/parties/:id", (req, res) => {
    const id =
        Number(req.params.id);


    const party = parties.find((party) => party.id === id);
    if (!party) {
        return res.status(404).json({
            message: ("Not found")
        });
    }
    const { name, leader, seats } = req.body;
    if (name! == undefined) party.name = name;
    if (leader! == undefined) party.leader = leader;
    if (seats! == undefined) party.seats = seats;
    res.status(200).json(party);
});

app.delete("/parties/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = parties.findIndex((party) => party.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Not found" });
    }
    const deletedParty = parties.splice(index, 1)[0];
    res.status(200).json({ message: " Party removed", party: deletedParty });
});







const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost: ${PORT}`)
});


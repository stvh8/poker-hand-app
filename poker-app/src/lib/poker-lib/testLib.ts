import { Round } from "./index";
import { sampleData } from "./sampleData";

let roundCount = 0;
sampleData.rounds.forEach((round: any) => {
    roundCount++;

    console.log("<<<<<<<< Round {1} >>>>>>>>".replace("{1}", roundCount.toString()));

    const roundObj: Round = new Round(round.players);

    roundObj.players.forEach((player) => {
        console.log("hand score", player.name, player.hand.getScore());
    })

    console.log("\n\n");
});

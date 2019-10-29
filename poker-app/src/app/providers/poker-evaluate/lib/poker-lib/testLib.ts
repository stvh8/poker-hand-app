import { Game } from "./index";
import { sampleData } from "./sampleData";

let roundCount = 0;

const game = new Game(sampleData);
const results = game.getResults();

results.forEach((round: any) => {
    roundCount++;

    console.log("<<<<<<<< Round {1} >>>>>>>>".replace("{1}", roundCount.toString()));

    round.players.forEach((player) => {
        console.log("hand score", player.name, player.hand.getScore());
    });

    console.log("\n\n");
});

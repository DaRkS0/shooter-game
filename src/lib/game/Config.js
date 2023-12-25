import { Game } from "$lib/game/Game";
const Config = {
    element: "wrapper",
    scenes: {
        Game,
    },
    board: {
        rows: 6,
        cols: 6,
    },
    tilesColors: ["blue", "green", "orange", "red", "pink", "yellow"],
    combinationRules: [[
        { col: 1, row: 0 }, { col: 2, row: 0 },
    ], [
        { col: 0, row: 1 }, { col: 0, row: 2 },
    ]]
}
export default Config;
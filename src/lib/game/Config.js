import { Game } from "$lib/game/Game";
const Config = {
    element: "wrapper",
    scenes: {
        Game,
    },
    board: {
        rows: 8,
        cols: 8,
    },
    tilesColors: ["blue", "green", "orange", "red", "pink", "yellow"],
    combinationRules: [[
        { col: 1, row: 0 }, { col: 2, row: 0 },
    ], [
        { col: 0, row: 1 }, { col: 0, row: 2 },
    ]]
}
export default Config;
export class Tools {
    /**
     * 
     * @param {number} min 
     * @param {number} max 
     * @returns 
     */
    static randomNumber(min, max) {
        if (!max) {
            max = min;
            min = 0;
        }

        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

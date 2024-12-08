import {
    bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite, bgRgb24,
    bold, italic,
    red, green, yellow, white, black, magenta, cyan, blue, gray,
    rgb24
} from "https://deno.land/std@0.224.0/fmt/colors.ts";

const palette = {
    backgrounds: [bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite],
    colors: [red, green, yellow, white, magenta, cyan, blue, gray] // black is excluded
}

const visualize2DArray = (array: [][], { showOriginalData = false, logger = console, colors = {} }) => {
    const colorCache: { [key: string]: any } = {}
    const bgColorCache: { [key: string]: any } = {}
    const last = {
        colorIndex: 0,
        bgColorIndex: 0,
    };

    for (let i = 0; i < array.length; i++) {
        const elements: any[] = [];
        for (let j = 0; j < array[i].length; j++) {
            if (showOriginalData) {
                if (!colorCache[array[i][j]]) {
                    colorCache[array[i][j]] = colors[array[i][j]] || palette.colors[last.colorIndex++ % palette.colors.length];
                }
                const textColor = colorCache[array[i][j]];
                elements.push(bgBlack(textColor(` ${array[i][j]} `)));
            }
            else {
                if (!bgColorCache[array[i][j]]) {
                    bgColorCache[array[i][j]] = colors[array[i][j]] || palette.backgrounds[last.bgColorIndex++ % palette.backgrounds.length];
                }
                elements.push(bgColorCache[array[i][j]](`  `));
            }
        }
        logger.log(elements.join(''));
    }
}

export default {
    bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite, bgRgb24,
    bold, italic,
    red, green, yellow, white, black, magenta, cyan, blue, gray,
    rgb24,
    visualize2DArray
}
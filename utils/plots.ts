import * as Plot from "npm:@observablehq/plot";
import { DOMParser } from "npm:linkedom";
import { display } from "https://deno.land/x/display@v0.1.1/mod.ts";

const lineGraph = (x, y, labels) => {
    const document = new DOMParser().parseFromString(
        `<!DOCTYPE html><html lang="en"></html>`,
        "text/html",
    );
    const data = new Array(x.length).fill(0).map((f, i) => ({
        [labels.x]: x[i],
        [labels.y]: y[i],
    }));
    
    return async () => await display(
        Plot.plot({
            y: { grid: true },
            marks: [
                Plot.line(data, labels),
            ],
            document,
        }),
    );
}

export default {
    lineGraph
}
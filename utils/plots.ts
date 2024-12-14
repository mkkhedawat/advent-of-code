import * as Plot from "npm:@observablehq/plot";
import { document } from "jsr:@ry/jupyter-helper"
import { display } from "https://deno.land/x/display@v0.1.1/mod.ts";


const lineGraph = (x, y, labels, { render = true }) => {
    const data = new Array(x.length).fill(0).map((f, i) => ({
        [labels.x]: x[i],
        [labels.y]: y[i],
    }));

    const raw = Plot.plot({
        y: { grid: true },
        marks: [
            Plot.line(data, labels),
        ],
        document,
    });

    if (!render) return raw;
    return async () => await display(raw);
}

const scatterGraph = (elements: [], labels, { render = true }) => {
    const raw = Plot.dot(elements, labels).plot({
        document,
    });
    if (!render) return raw;
    return async () => await display(raw);
}

export default {
    lineGraph,
    scatterGraph,
}
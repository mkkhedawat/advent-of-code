import sharp from "npm:sharp";
import { Buffer } from 'node:buffer';

const svgToDataURL = svgStr => {
    const encoded = encodeURIComponent(addXmlnsTagsToSVG(svgStr))
        .replace(/'/g, '%27')
        .replace(/"/g, '%22')

    const header = 'data:image/svg+xml,'
    const dataUrl = header + encoded

    return dataUrl
}

const addXmlnsTagsToSVG = (svg) => {
    // default from plot doesn't have these
    if (svg.includes("xmlns")) return svg;
    return svg.replace(/<svg/, '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"');
}

const writeSVG = async (path, svg) => {
    await Deno.writeTextFile(path, addXmlnsTagsToSVG(svg));
}


const svgToPng = async (svg, path, { background = '#fff' }) => {
    return await sharp(Buffer.from(svg))
        .flatten({ background })
        .toFormat('png')
        .toFile(path);
}

export default {
    svgToDataURL,
    addXmlnsTagsToSVG,
    writeSVG,
    svgToPng,
}
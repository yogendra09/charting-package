

import { tsvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData(parse) {
    return function(d) {
        d.date = parse(d.date);
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
        d.volume = +d.volume;

        return d;
    };
}

const parseDate = timeParse("%Y-%m-%d");

export const getData = async () => {
    const response = await fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv");
    // console.log(await response.text());
    
    const data = tsvParse(await response.text(), parseData(parseDate));

    console.log(typeof(data[0].date)); // Log the array data);
    return data; // Return the array directly
};


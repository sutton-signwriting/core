/**
 * Object of query elements with regular expression identification.
 */
type QueryObject = {
    /**
     * - required true for query object
     */
    query: boolean;
    /**
     * - an object for prefix elements
     */
    prefix: {
        required: boolean;
        parts: (string | string[] | (string | string[])[])[];
    };
    /**
     * - array of objects for symbols, ranges, and list of symbols or ranges, with optional coordinates
     */
    signbox: ({
        symbol: string;
        coord: number[];
    } | {
        range: string[];
        coord: number[];
    } | {
        or: (string | string[])[];
        coord: number[];
    })[];
    /**
     * - amount that x or y coordinates can vary and find a match, defaults to 20
     */
    variance: number;
    /**
     * - boolean value for including style string in matches
     */
    style: boolean;
};
type ColumnOptions = {
    /**
     * - the height of the columns
     */
    height: number;
    /**
     * - the widths of the columns
     */
    width: number;
    /**
     * - the lane offset for left and right lanes
     */
    offset: number;
    /**
     * - amount of padding before and after signs as well as at top, left, and right of columns
     */
    pad: number;
    /**
     * - amount of space at bottom of column that is not available
     */
    margin: number;
    /**
     * - enables variable width columns
     */
    dynamic: boolean;
    /**
     * - background color for columns
     */
    background: string;
    /**
     * - an object of style options
     */
    style: StyleObject;
    /**
     * - an object of punctuation options
     */
    punctuation: {
        spacing: boolean;
        pad: number;
        pull: boolean;
    };
};
type ColumnData = ColumnSegment[];
type ColumnSegment = {
    /**
     * - the x position in the column
     */
    x: number;
    /**
     * - the y position in the column
     */
    y: number;
    /**
     * - the min x value within the segment
     */
    minX: number;
    /**
     * - the min y value within the segment
     */
    minY: number;
    /**
     * - the width of the text segment
     */
    width: number;
    /**
     * - the height of the text segment
     */
    height: number;
    /**
     * - Left as -1, Middle as 0, Right as 1
     */
    lane: number;
    /**
     * - the padding of the text segment affects colored background
     */
    padding: number;
    /**
     * - "sign" or "symbol"
     */
    segment: string;
    /**
     * - the text of the sign or symbol with optional style string
     */
    text: string;
    /**
     * - the zoom size of the segment
     */
    zoom: number;
};
/**
 * The elements of a style string
 */
type StyleObject = {
    /**
     * - boolean to use standardized colors for symbol groups
     */
    colorize: boolean;
    /**
     * - integer value for padding around symbol or sign
     */
    padding: number;
    /**
     * - css name or hex color for background
     */
    background: string;
    /**
     * - array for css name or hex color for line and optional fill
     */
    detail: string[];
    /**
     * - decimal value for zoom level
     */
    zoom: number;
    /**
     * - custom colors for individual symbols
     */
    detailsym: {
        index: number;
        detail: string[];
    };
    /**
     * - list of class names separated with spaces used for SVG
     */
    classes: string;
    /**
     * - id name used for SVG
     */
    id: string;
};
/**
 * The elements of a symbol string
 */
type SymbolObject = {
    /**
     * - symbol identifier
     */
    symbol: string;
    /**
     * - x,y coordinate
     */
    coord: number[];
    /**
     * - style string
     */
    style: string;
};
/**
 * The elements of a sign string
 */
type SignObject = {
    /**
     * - array of symbols
     */
    sequence: string[];
    /**
     * - signbox marker or lane
     */
    box: string;
    /**
     * - preprocessed x,y coordinate
     */
    max: number[];
    /**
     * - array of symbols with coordinates
     */
    spatials: {
        symbol: string;
        coord: number[];
    }[];
    /**
     * - style string
     */
    style: string;
};

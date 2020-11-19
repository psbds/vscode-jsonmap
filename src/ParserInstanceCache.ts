import { ParserInstance } from './ParserInstance';

const PARSER_INSTANCES: ParserInstance[] = [];


export default PARSER_INSTANCES;

export function clearCache() {
    PARSER_INSTANCES.length = 0;
}
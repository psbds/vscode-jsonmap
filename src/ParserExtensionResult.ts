import { ParserInstance } from './ParserInstance';


export default class ParserExtensionResult {

    public parserInstances: ParserInstance[];

    public errorMessages: string[] = [];

    public informationMessages: string[] = [];

}
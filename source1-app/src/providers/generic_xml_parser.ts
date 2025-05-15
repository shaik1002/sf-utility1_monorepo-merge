import { XmlParser } from "../abstracts";
import { IException } from "../interfaces";

export class BlankXmlParser implements XmlParser {
    parse(): Promise<string> {
        // tslint:disable-next-line
        throw {
            message: "no xml parser configured"
        } as IException;
    }
}
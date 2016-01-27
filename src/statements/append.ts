import { Statement } from "./statement";
import { Token } from "../tokens/";
import * as Combi from "../combi";

let str  = Combi.str;
let seq  = Combi.seq;
// let alt  = Combi.alt;
// let opt  = Combi.opt;
let reg  = Combi.regex;
let star = Combi.star;

export class Append extends Statement {

    public static get_matcher(): Combi.IRunnable {
        return seq(str("APPEND"), star(reg(/.*/)));
    }

    public static match(tokens: Array<Token>): Statement {
        let result = Combi.Combi.run(this.get_matcher( ), tokens, true);
        if (result === true) {
            return new Append(tokens);
        } else {
            return undefined;
        }
    }

}
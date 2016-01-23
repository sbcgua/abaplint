import { Check } from "./check";
import File from "../file";
import Issue from "../issue";
import * as Statements from "../statements/";

export class Check12 implements Check {

    public get_key(): string {
        return "12";
    }

    public get_description(): string {
        return "Statement is obsolete";
    }

    public run(file: File) {
        let statements = file.get_statements();

        for (let sta of statements) {
            if (sta instanceof Statements.Refresh
                    || sta instanceof Statements.Compute
                    || sta instanceof Statements.Add
                    || sta instanceof Statements.Subtract
                    || sta instanceof Statements.Multiply
                    || ( sta instanceof Statements.Move
                    && sta.get_tokens()[0].get_str() === 'MOVE' )
                    || sta instanceof Statements.Divide) {
                let issue = new Issue(this, sta.get_start(), file);
                file.add(issue);
            }
        }
    }
}
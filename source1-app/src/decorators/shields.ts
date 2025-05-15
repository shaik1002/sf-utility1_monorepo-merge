import { Shield } from "../abstracts";
import { RouteHandler } from "../handlers";
import { TShield } from "../types";

export const shields = (...shields: Array<typeof Shield>): ClassDecorator => {
    return (target: any) => {
        const className = target.name;
        RouteHandler.addShields(shields as Array<TShield>, className);
    };
};
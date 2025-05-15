import { Wall, textResult } from "fortjs";
export class Wall1 extends Wall {


    async onIncoming() {
        this.response.setHeader('Custom-Header-From-Incoming-Wall', '*');
        return null;
    }

    async onOutgoing() {
        // console.log('executing wall1');
        this.response.setHeader('Custom-Header-From-Outgoing-Wall', '1');
    }
}
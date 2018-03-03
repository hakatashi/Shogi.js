"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = require("./Color");
class Piece {
    // 成った時の種類を返す．なければそのまま．
    static promote(kind) {
        return {
            FU: "TO",
            KY: "NY",
            KE: "NK",
            GI: "NG",
            KA: "UM",
            HI: "RY",
        }[kind] || kind;
    }
    // 表に返した時の種類を返す．表の場合はそのまま．
    static unpromote(kind) {
        return {
            TO: "FU",
            NY: "KY",
            NK: "KE",
            NG: "GI",
            KI: "KI",
            UM: "KA",
            RY: "HI",
            OU: "OU",
        }[kind] || kind;
    }
    // 成れる駒かどうかを返す
    static canPromote(kind) {
        return Piece.promote(kind) !== kind;
    }
    static getMoveDef(kind) {
        switch (kind) {
            case "FU":
                return { just: [[0, -1]] };
            case "KY":
                return { fly: [[0, -1]] };
            case "KE":
                return { just: [[-1, -2], [1, -2]] };
            case "GI":
                return { just: [[-1, -1], [0, -1], [1, -1], [-1, 1], [1, 1]] };
            case "KI":
            case "TO":
            case "NY":
            case "NK":
            case "NG":
                return { just: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [0, 1]] };
            case "KA":
                return { fly: [[-1, -1], [1, -1], [-1, 1], [1, 1]] };
            case "HI":
                return { fly: [[0, -1], [-1, 0], [1, 0], [0, 1]] };
            case "OU":
                return { just: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]] };
            case "UM":
                return { fly: [[-1, -1], [1, -1], [-1, 1], [1, 1]], just: [[0, -1], [-1, 0], [1, 0], [0, 1]] };
            case "RY":
                return { fly: [[0, -1], [-1, 0], [1, 0], [0, 1]], just: [[-1, -1], [1, -1], [-1, 1], [1, 1]] };
        }
    }
    static isPromoted(kind) {
        return ["TO", "NY", "NK", "NG", "UM", "RY"].indexOf(kind) >= 0;
    }
    static oppositeColor(color) {
        return color === Color_1.default.Black ? Color_1.default.White : Color_1.default.Black;
    }
    // SFENによる文字列表現から駒オブジェクトを作成
    static fromSFENString(sfen) {
        const promoted = sfen[0] === "+";
        if (promoted) {
            sfen = sfen.slice(1);
        }
        const color = sfen.match(/[A-Z]/) ? "+" : "-";
        const kind = {
            P: "FU",
            L: "KY",
            N: "KE",
            S: "GI",
            G: "KI",
            B: "KA",
            R: "HI",
            K: "OU",
        }[sfen.toUpperCase()];
        const piece = new Piece(color + kind);
        if (promoted) {
            piece.promote();
        }
        return piece;
    }
    // "+FU"などのCSAによる駒表現から駒オブジェクトを作成
    constructor(csa) {
        this.color = csa.slice(0, 1) === "+" ? Color_1.default.Black : Color_1.default.White;
        this.kind = csa.slice(1);
    }
    // 成る
    promote() {
        this.kind = Piece.promote(this.kind);
    }
    // 不成にする
    unpromote() {
        this.kind = Piece.unpromote(this.kind);
    }
    // 駒の向きを反転する
    inverse() {
        this.color = this.color === Color_1.default.Black ? Color_1.default.White : Color_1.default.Black;
    }
    // CSAによる駒表現の文字列を返す
    toCSAString() {
        return (this.color === Color_1.default.Black ? "+" : "-") + this.kind;
    }
    // SFENによる駒表現の文字列を返す
    toSFENString() {
        const sfenPiece = {
            FU: "P",
            KY: "L",
            // tslint:disable-next-line object-literal-sort-keys
            KE: "N",
            GI: "S",
            KI: "G",
            KA: "B",
            HI: "R",
            OU: "K",
        }[Piece.unpromote(this.kind)];
        return (Piece.isPromoted(this.kind) ? "+" : "") +
            (this.color === Color_1.default.Black ? sfenPiece : sfenPiece.toLowerCase());
    }
}
exports.default = Piece;

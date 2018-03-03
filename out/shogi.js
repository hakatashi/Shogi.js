(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Color;
(function (Color) {
    Color[Color["Black"] = 0] = "Black";
    Color[Color["White"] = 1] = "White";
})(Color || (Color = {}));
exports.default = Color;

},{}],2:[function(require,module,exports){
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

},{"./Color":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
if (!Array.prototype.some) {
    Array.prototype.some = function (fun /*, thisp */) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        let t = Object(this), len = t.length >>> 0;
        if (typeof fun != "function") {
            throw new TypeError();
        }
        let thisp = arguments[1];
        for (let i = 0; i < len; i++) {
            if (i in t && fun.call(thisp, t[i], i, t)) {
                return true;
            }
        }
        return false;
    };
}

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @license
 * Shogi.js
 * Copyright (c) 2014 na2hiro (https://github.com/na2hiro)
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */
const Color_1 = require("./Color");
const Piece_1 = require("./Piece");
require("./polyfills");
class Shogi {
    static getIllegalUnpromotedRow(kind) {
        switch (kind) {
            case "FU":
            case "KY":
                return 1;
            case "KE":
                return 2;
            default:
                return 0;
        }
    }
    // 手番の相手側から数えた段数
    static getRowToOppositeEnd(y, color) {
        return color === Color_1.default.Black ? y : 4 - y;
    }
    constructor(setting) {
        this.initialize(setting);
    }
    // 盤面を初期化する
    // 初期局面(なければ平手)
    initialize(setting = { preset: "HIRATE" }) {
        this.board = [];
        if (setting.preset !== "OTHER") {
            throw new Error();
        }
        for (let i = 0; i < 3; i++) {
            this.board[i] = [];
            for (let j = 0; j < 3; j++) {
                const p = setting.data.board[i][j];
                this.board[i][j] = p.kind ? new Piece_1.default((p.color === Color_1.default.Black ? "+" : "-") + p.kind) : null;
            }
        }
        this.turn = setting.data.color;
        this.hands = [[], []];
        for (let c = 0; c < 2; c++) {
            for (const k in setting.data.hands[c]) {
                if (setting.data.hands[c].hasOwnProperty(k)) {
                    const csa = (c === 0 ? "+" : "-") + k;
                    for (let i = 0; i < setting.data.hands[c][k]; i++) {
                        this.hands[c].push(new Piece_1.default(csa));
                    }
                }
            }
        }
        this.flagEditMode = false;
    }
    // SFENによる盤面表現の文字列で盤面を初期化する
    initializeFromSFENString(sfen) {
        this.board = [];
        for (let i = 0; i < 3; i++) {
            this.board[i] = [];
            for (let j = 0; j < 3; j++) {
                this.board[i][j] = null;
            }
        }
        const segments = sfen.split(" ");
        const sfenBoard = segments[0];
        let x = 2;
        let y = 0;
        for (let i = 0; i < sfenBoard.length; i++) {
            let c = sfenBoard[i];
            const promoted = false;
            if (c === "+") {
                i++;
                c += sfenBoard[i];
            }
            if (c.match(/^[1-9]$/)) {
                x -= Number(c);
            }
            else if (c === "/") {
                y++;
                x = 2;
            }
            else {
                this.board[x][y] = Piece_1.default.fromSFENString(c);
                x--;
            }
        }
        this.turn = segments[1] === "b" ? Color_1.default.Black : Color_1.default.White;
        this.hands = [[], []];
        let sfenHands = segments[2];
        if (sfenHands !== "-") {
            while (sfenHands.length > 0) {
                let count = 1;
                const m = sfenHands.match(/^[0-9]+/);
                if (m) {
                    count = Number(m[0]);
                    sfenHands = sfenHands.slice(m[0].length);
                }
                for (let i = 0; i < count; i++) {
                    const piece = Piece_1.default.fromSFENString(sfenHands[0]);
                    this.hands[piece.color].push(piece);
                }
                sfenHands = sfenHands.slice(1);
            }
        }
    }
    // 編集モード切り替え
    // * 通常モード：移動時に手番と移動可能かどうかチェックし，移動可能範囲は手番側のみ返す．
    // * 編集モード：移動時に手番や移動可能かはチェックせず，移動可能範囲は両者とも返す．
    editMode(flag) {
        this.flagEditMode = flag;
    }
    // (fromx, fromy)から(tox, toy)へ移動し，promoteなら成り，駒を取っていれば持ち駒に加える．．
    move(fromx, fromy, tox, toy, promote = false) {
        const piece = this.get(fromx, fromy);
        if (piece == null) {
            throw new Error("no piece found at " + fromx + ", " + fromy);
        }
        this.checkTurn(piece.color);
        if (!this.flagEditMode) {
            if (!this.getMovesFrom(fromx, fromy).some((move) => {
                return move.to.x === tox && move.to.y === toy;
            })) {
                throw new Error("cannot move from " + fromx + ", " + fromy + " to " + tox + ", " + toy);
            }
        }
        if (this.get(tox, toy) != null) {
            this.capture(tox, toy);
        }
        // 行き所のない駒
        const deadEnd = Shogi.getIllegalUnpromotedRow(piece.kind) >= Shogi.getRowToOppositeEnd(toy, piece.color);
        if (promote || deadEnd) {
            piece.promote();
        }
        this.set(tox, toy, piece);
        this.set(fromx, fromy, null);
        this.nextTurn();
    }
    // moveの逆を行う．つまり(tox, toy)から(fromx, fromy)へ移動し，駒を取っていたら戻し，promoteなら成りを戻す．
    unmove(fromx, fromy, tox, toy, promote = false, capture) {
        const piece = this.get(tox, toy);
        if (piece == null) {
            throw new Error("no piece found at " + tox + ", " + toy);
        }
        this.checkTurn(Piece_1.default.oppositeColor(piece.color));
        let captured;
        if (capture) {
            captured = this.popFromHand(Piece_1.default.unpromote(capture), piece.color);
            captured.inverse();
        }
        const editMode = this.flagEditMode;
        this.editMode(true);
        this.move(tox, toy, fromx, fromy);
        if (promote) {
            piece.unpromote();
        }
        if (capture) {
            if (Piece_1.default.isPromoted(capture)) {
                captured.promote();
            }
            this.set(tox, toy, captured);
        }
        this.editMode(editMode);
        this.prevTurn();
    }
    // (tox, toy)へcolorの持ち駒のkindを打つ．
    drop(tox, toy, kind, color = this.turn) {
        this.checkTurn(color);
        if (this.get(tox, toy) != null) {
            throw new Error("there is a piece at " + tox + ", " + toy);
        }
        if (!this.getDropsBy(color).some((move) => {
            return move.to.x === tox && move.to.y === toy && move.kind === kind;
        })) {
            throw new Error("Cannot move");
        }
        const piece = this.popFromHand(kind, color);
        this.set(tox, toy, piece);
        this.nextTurn();
    }
    // dropの逆を行う，つまり(tox, toy)の駒を駒台に戻す．
    undrop(tox, toy) {
        const piece = this.get(tox, toy);
        if (piece == null) {
            throw new Error("there is no piece at " + tox + ", " + toy);
        }
        this.checkTurn(Piece_1.default.oppositeColor(piece.color));
        this.pushToHand(piece);
        this.set(tox, toy, null);
        this.prevTurn();
    }
    // CSAによる盤面表現の文字列を返す
    toCSAString() {
        const ret = [];
        for (let y = 0; y < 9; y++) {
            let line = "P" + (y + 1);
            for (let x = 8; x >= 0; x--) {
                const piece = this.board[x][y];
                line += piece == null ? " * " : piece.toCSAString();
            }
            ret.push(line);
        }
        for (let i = 0; i < 2; i++) {
            let line = "P" + "+-"[i];
            for (const hand of this.hands[i]) {
                line += "00" + hand.kind;
            }
            ret.push(line);
        }
        ret.push(this.turn === Color_1.default.Black ? "+" : "-");
        return ret.join("\n");
    }
    // SFENによる盤面表現の文字列を返す
    toSFENString(moveCount = 1) {
        const ret = [];
        const sfenBoard = [];
        for (let y = 0; y < 3; y++) {
            let line = "";
            let empty = 0;
            for (let x = 2; x >= 0; x--) {
                const piece = this.board[x][y];
                if (piece == null) {
                    empty++;
                }
                else {
                    if (empty > 0) {
                        line += "" + empty;
                        empty = 0;
                    }
                    line += piece.toSFENString();
                }
            }
            if (empty > 0) {
                line += "" + empty;
            }
            sfenBoard.push(line);
        }
        ret.push(sfenBoard.join("/"));
        ret.push(this.turn === Color_1.default.Black ? "b" : "w");
        if (this.hands[0].length === 0 && this.hands[1].length === 0) {
            ret.push("-");
        }
        else {
            let sfenHands = "";
            const kinds = ["R", "B", "G", "S", "N", "L", "P", "r", "b", "g", "s", "n", "l", "p"];
            const count = {};
            for (let i = 0; i < 2; i++) {
                for (const hand of this.hands[i]) {
                    const key = hand.toSFENString();
                    count[key] = (count[key] || 0) + 1;
                }
            }
            for (const kind of kinds) {
                if (count[kind] > 0) {
                    sfenHands += (count[kind] > 1 ? count[kind] : "") + kind;
                }
            }
            ret.push(sfenHands);
        }
        ret.push("" + moveCount);
        return ret.join(" ");
    }
    // (x, y)の駒の移動可能な動きをすべて得る
    // 盤外，自分の駒取りは除外．二歩，王手放置などはチェックせず．
    getMovesFrom(x, y) {
        // 盤外かもしれない(x, y)にcolorの駒が移動しても問題がないか
        const legal = function (x, y, color) {
            if (x < 1 || 3 < x || y < 1 || 3 < y) {
                return false;
            }
            const piece = this.get(x, y);
            return piece == null || piece.color !== color;
        }.bind(this);
        const shouldStop = function (x, y, color) {
            const piece = this.get(x, y);
            return piece != null && piece.color !== color;
        }.bind(this);
        const piece = this.get(x, y);
        if (piece == null) {
            return [];
        }
        const moveDef = Piece_1.default.getMoveDef(piece.kind);
        const ret = [];
        const from = { x, y };
        if (moveDef.just) {
            for (const def of moveDef.just) {
                if (piece.color === Color_1.default.White) {
                    def[0] *= -1;
                    def[1] *= -1;
                }
                const to = { x: from.x + def[0], y: from.y + def[1] };
                if (legal(to.x, to.y, piece.color)) {
                    ret.push({ from, to });
                }
            }
        }
        if (moveDef.fly) {
            for (const def of moveDef.fly) {
                if (piece.color === Color_1.default.White) {
                    def[0] *= -1;
                    def[1] *= -1;
                }
                const to = { x: from.x + def[0], y: from.y + def[1] };
                while (legal(to.x, to.y, piece.color)) {
                    ret.push({ from, to: { x: to.x, y: to.y } });
                    if (shouldStop(to.x, to.y, piece.color)) {
                        break;
                    }
                    to.x += def[0];
                    to.y += def[1];
                }
            }
        }
        return ret;
    }
    // colorが打てる動きを全て得る
    getDropsBy(color) {
        const ret = [];
        const places = [];
        const fuExistsArray = [];
        for (let i = 1; i <= 3; i++) {
            let fuExists = false;
            for (let j = 1; j <= 3; j++) {
                const piece = this.get(i, j);
                if (piece == null) {
                    places.push({ x: i, y: j });
                }
                else if (piece.color === color && piece.kind === "FU") {
                    fuExists = true;
                }
            }
            fuExistsArray.push(fuExists);
        }
        const done = {};
        for (const hand of this.hands[color]) {
            const kind = hand.kind;
            if (done[kind]) {
                continue;
            }
            done[kind] = true;
            const illegalUnpromotedRow = Shogi.getIllegalUnpromotedRow(kind);
            for (const place of places) {
                if (kind === "FU" && fuExistsArray[place.x - 1]) {
                    continue; // 二歩
                }
                if (illegalUnpromotedRow >= Shogi.getRowToOppositeEnd(place.y, color)) {
                    continue; // 行き所のない駒
                }
                ret.push({ to: place, color, kind });
            }
        }
        return ret;
    }
    // (x, y)に行けるcolor側のkindの駒の動きを得る
    getMovesTo(x, y, kind, color = this.turn) {
        const to = { x, y };
        const ret = [];
        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
                const piece = this.get(i, j);
                if (!piece || piece.kind !== kind || piece.color !== color) {
                    continue;
                }
                const moves = this.getMovesFrom(i, j);
                if (moves.some((move) => move.to.x === x && move.to.y === y)) {
                    ret.push({ from: { x: i, y: j }, to });
                }
            }
        }
        return ret;
    }
    // (x, y)の駒を得る
    get(x, y) {
        return this.board[x - 1][y - 1];
    }
    // keyを種類，valueを枚数とするオブジェクトとして持ち駒の枚数一覧を返す．
    getHandsSummary(color) {
        const ret = {
            FU: 0,
            KY: 0,
            KE: 0,
            GI: 0,
            KI: 0,
            KA: 0,
            HI: 0,
        };
        for (const hand of this.hands[color]) {
            ret[hand.kind]++;
        }
        return ret;
    }
    // クローン
    clone() {
        const board = Array(3).fill(null).map((_) => Array(3).fill(null));
        for (const x of Array(3).keys()) {
            for (const y of Array(3).keys()) {
                const piece = this.get(x + 1, y + 1);
                if (!piece) {
                    board[x][y] = {};
                }
                else {
                    board[x][y] = {
                        color: piece.color,
                        kind: piece.kind,
                    };
                }
            }
        }
        const hands = this.hands.map((currentHands) => {
            const newHands = { HI: 0, KY: 0, KE: 0, GI: 0, KI: 0, KA: 0, FU: 0 };
            for (const piece of currentHands) {
                newHands[piece.kind]++;
            }
            return newHands;
        });
        return new Shogi({
            preset: 'OTHER',
            data: {
                color: Color_1.default.Black,
                board,
                hands: [
                    hands[Color_1.default.Black],
                    hands[Color_1.default.White],
                ],
            },
        });
    }
    // 盤面全体を反転する
    inverse() {
        const board = Array(3).fill(null).map((_) => Array(3).fill(null));
        for (const x of Array(3).keys()) {
            for (const y of Array(3).keys()) {
                const piece = this.get(x + 1, y + 1);
                if (!piece) {
                    board[2 - x][2 - y] = {};
                }
                else {
                    board[2 - x][2 - y] = {
                        color: piece.color === Color_1.default.Black ? Color_1.default.White : Color_1.default.Black,
                        kind: piece.kind,
                    };
                }
            }
        }
        const hands = this.hands.map((currentHands) => {
            const newHands = { HI: 0, KY: 0, KE: 0, GI: 0, KI: 0, KA: 0, FU: 0 };
            for (const piece of currentHands) {
                newHands[piece.kind]++;
            }
            return newHands;
        });
        return new Shogi({
            preset: 'OTHER',
            data: {
                color: Color_1.default.Black,
                board,
                hands: [
                    hands[Color_1.default.White],
                    hands[Color_1.default.Black],
                ],
            },
        });
    }
    // 以下editModeでの関数
    // (x, y)の駒を取ってcolorの持ち駒に加える
    captureByColor(x, y, color) {
        if (!this.flagEditMode) {
            throw new Error("cannot edit board without editMode");
        }
        const piece = this.get(x, y);
        this.set(x, y, null);
        piece.unpromote();
        if (piece.color !== color) {
            piece.inverse();
        }
        this.pushToHand(piece);
    }
    // (x, y)の駒をフリップする(先手→先手成→後手→後手成→)
    // 成功したらtrueを返す
    flip(x, y) {
        if (!this.flagEditMode) {
            throw new Error("cannot edit board without editMode");
        }
        const piece = this.get(x, y);
        if (!piece) {
            return false;
        }
        if (Piece_1.default.isPromoted(piece.kind)) {
            piece.unpromote();
            piece.inverse();
        }
        else if (Piece_1.default.canPromote(piece.kind)) {
            piece.promote();
        }
        else {
            piece.inverse();
        }
        return true;
    }
    // 手番を設定する
    setTurn(color) {
        if (!this.flagEditMode) {
            throw new Error("cannot set turn without editMode");
        }
        this.turn = color;
    }
    // 以下private method
    // (x, y)に駒を置く
    set(x, y, piece) {
        this.board[x - 1][y - 1] = piece;
    }
    // (x, y)の駒を取って反対側の持ち駒に加える
    capture(x, y) {
        const piece = this.get(x, y);
        this.set(x, y, null);
        piece.unpromote();
        piece.inverse();
        this.pushToHand(piece);
    }
    // 駒pieceを持ち駒に加える
    pushToHand(piece) {
        this.hands[piece.color].push(piece);
    }
    // color側のkindの駒を取って返す
    popFromHand(kind, color) {
        const hand = this.hands[color];
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].kind !== kind) {
                continue;
            }
            const piece = hand[i];
            hand.splice(i, 1); // remove at i
            return piece;
        }
        throw new Error(color + " has no " + kind);
    }
    // 次の手番に行く
    nextTurn() {
        if (this.flagEditMode) {
            return;
        }
        this.turn = this.turn === Color_1.default.Black ? Color_1.default.White : Color_1.default.Black;
    }
    // 前の手番に行く
    prevTurn() {
        if (this.flagEditMode) {
            return;
        }
        this.nextTurn();
    }
    // colorの手番で問題ないか確認する．編集モードならok．
    checkTurn(color) {
        if (!this.flagEditMode && color !== this.turn) {
            throw new Error("cannot move opposite piece");
        }
    }
}
exports.default = Shogi;
// enum Kind {HI, KY, KE, GI, KI, KA, HI, OU, TO, NY, NK, NG, UM, RY}

},{"./Color":1,"./Piece":2,"./polyfills":3}]},{},[4]);

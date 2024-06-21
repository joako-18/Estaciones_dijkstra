import Node from "./Node.mjs";
import Estation from "./Estation.mjs";

export default class LinkedList {
    #head;
    #count;

    constructor() {
        this.#head = null;
        this.#count = 0;
    }

    push(cityName, distance) {
        let city = new Estation(cityName, distance);
        let node = new Node(city);
        if (this.#head === null) {
            this.#head = node;
        } else {
            let current = this.#head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = node;
        }
        this.#count++;
    }

    size() {
        return this.#count;
    }

    isEmpty() {
        return this.#head === null;
    }

    getElementAt(index) {
        if (index >= 0 && index < this.#count) {
            let node = this.#head;
            for (let i = 0; i < index && node !== null; i++) {
                node = node.next;
            }
            return node;
        }
        return null;
    }

    getHead() {
        return this.#head;
    }

    iterator() {
        const elements = [];
        this._iterate(this.#head, elements);
        return elements;
    }
    
    _iterate(node, elements) {
        if (node === null) return;
        elements.push(node.value);
        this._iterate(node.next, elements);
    }
}
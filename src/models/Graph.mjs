import LinkedList from "./LinkendList.mjs";

export default class Graph {
    #matrizAdyacencia = [];
    #map = new Map();

    constructor() {}

    addVertices(...vertices) {
        for (let value of vertices) {
            this.#matrizAdyacencia.push(new LinkedList());
            this.#map.set(value, this.#matrizAdyacencia.length - 1);
        }
    }

    addV(value) {
        this.#matrizAdyacencia.push(new LinkedList());
        this.#map.set(value, this.#matrizAdyacencia.length - 1);
    }

    addConexion(start, end, weight = 1) {
        if (this.#map.has(start) && this.#map.has(end)) {
            this.#matrizAdyacencia[this.#map.get(start)].push(end, weight);
            return true;
        }
        return false;
    }

    dfs(callback) {
        let stack = [];
        let visited = new Set();
        const entries = [...this.#map.entries()];
    
        if (entries.length === 0) return;
    
        let [start] = entries[0];
        stack.push(start);
    
        while (stack.length > 0) {
            let vertex = stack.pop();
            if (!visited.has(vertex)) {
                callback(vertex);
                visited.add(vertex);
                let neighbors = [...this.#matrizAdyacencia[this.#map.get(vertex)].iterator()];
                for (let i = neighbors.length - 1; i >= 0; i--) {
                    let neighbor = neighbors[i];
                    if (!visited.has(neighbor.name)) {
                        stack.push(neighbor.name);
                    }
                }
            }
        }
    }    

    dijkstra(start, end) {
        const L = new Set();
        const L_prime = new Set();
        const D = new Map();
        
        for (let vertex of this.#map.keys()) {
            D.set(vertex, { distance: Infinity, predecessor: null });
        }
        D.set(start, { distance: 0, predecessor: null });
        L_prime.add(start);

        while (L_prime.size > 0) {
            let current = null;
            let currentDistance = Infinity;

            for (let vertex of L_prime) {
                if (D.get(vertex).distance < currentDistance) {
                    currentDistance = D.get(vertex).distance;
                    current = vertex;
                }
            }

            if (current === end) {
                const path = [];
                let step = end;
                while (step) {
                    path.unshift(step);
                    step = D.get(step).predecessor;
                }
                return { distance: D.get(end).distance, path };
            }

            L_prime.delete(current);
            L.add(current);

            let neighbors = [...this.#matrizAdyacencia[this.#map.get(current)].iterator()];
            for (let neighbor of neighbors) {
                if (!L.has(neighbor.name)) {
                    let newDist = D.get(current).distance + neighbor.distance;
                    if (newDist < D.get(neighbor.name).distance) {
                        D.set(neighbor.name, { distance: newDist, predecessor: current });
                        L_prime.add(neighbor.name);
                    }
                }
            }
        }

        return { distance: Infinity, path: [] };
    }
}
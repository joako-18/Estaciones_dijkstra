import Graph from "../models/Graph.mjs";

document.addEventListener('DOMContentLoaded', () => {
    const graph = new Graph();

    const addVertexForm = document.getElementById('addVertexForm');
    addVertexForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const vertexNameInput = document.getElementById('vertexName');
        const vertexName = vertexNameInput.value.trim();

        if (vertexName !== '') {
            await graph.addV(vertexName);
            console.log(`Vértice agregado: ${vertexName}`);
            vertexNameInput.value = '';
        } else {
            console.log('Ingrese un nombre válido para el vértice.');
        }
    });

    const addEdgeForm = document.getElementById('addEdgeForm');
    addEdgeForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const startVertexInput = document.getElementById('startVertex');
        const endVertexInput = document.getElementById('endVertex');
        const weightInput = document.getElementById('weight');

        const startVertex = startVertexInput.value.trim();
        const endVertex = endVertexInput.value.trim();
        const weight = parseInt(weightInput.value);

        if (startVertex !== '' && endVertex !== '' && !isNaN(weight)) {
            const added = await graph.addConexion(startVertex, endVertex, weight);
            if (added) {
                console.log(`Arista agregada de ${startVertex} a ${endVertex} con peso ${weight}`);
                startVertexInput.value = '';
                endVertexInput.value = '';
                weightInput.value = '';
            } else {
                console.log('No se pudo agregar la arista. Verifique los vértices.');
            }
        } else {
            console.log('Ingrese valores válidos para los vértices y el peso.');
        }
    });

    const dfsBtn = document.getElementById('dfsBtn');
    dfsBtn.addEventListener('click', () => {
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.innerHTML = '';

        graph.dfs((vertex) => {
            console.log(`Visitando vértice: ${vertex}`);
            resultContainer.innerHTML += `${vertex} `;
        });
    });

    const shortestPathForm = document.getElementById('shortestPathForm');
    shortestPathForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const startVertexSP = document.getElementById('startVertexSP').value.trim();
        const endVertexSP = document.getElementById('endVertexSP').value.trim();
        const resultContainer = document.getElementById('shortestPathResult');
        resultContainer.innerHTML = '';

        const { distance, path } = graph.dijkstra(startVertexSP, endVertexSP);
        if (distance !== Infinity) {
            resultContainer.innerHTML = `La distancia mínima de ${startVertexSP} a ${endVertexSP} es ${distance} km.<br>Ruta: ${path.join(' -> ')}`;
        } else {
            resultContainer.innerHTML = `No se encontró un camino de ${startVertexSP} a ${endVertexSP}.`;
        }
    });
});
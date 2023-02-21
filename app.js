// tomar lo elementos del fronted
const countProcess = document.getElementById("num-process");
const countWaiting = document.getElementById("num-waiting");
const sizeSelect = document.getElementById("size-select");
const process = document.getElementById("process");
const waiting = document.getElementById("waiting");
const btnStart = document.getElementById("btn-start").addEventListener("click", addProcess); // asignar evento de click y funcion
const btnDelete = document.getElementById("btn-delete").addEventListener("click", deleteProcess); // asignar evento de click y funcion
const btnWaiting = document.getElementById("btn-waiting").addEventListener("click", addWaiting);

// declarar lista de procesos y espera
let frameSize = parseInt(prompt("Digite el tamaño de marco: "));

let processList = new Array(frameSize);
let waitList = [];

for (let i = 0; i < processList.length; i++) {
    process.innerHTML += `<div><b>${processList[i]}</b></div>`;
    sizeSelect.innerHTML += `<option value=${i + 1}>${i + 1}</option>`
}

function occupiedSpaces() {
    let ocupados = 0;

    processList.forEach((element) => {
        if (element == undefined) {
            ocupados += 0;
        } else ocupados++;
    });

    return ocupados;
}

// funcion para crear el proceso
function createProces() {
    // tomar los valores el frontend: nombre y tamaño
    let name = document.getElementById("process-select").value;
    let size = parseInt(document.getElementById("size-select").value);

    // retornar nombre y tamaño
    return [name, size];
}

function addProcessList(size, name, list) {
    const processID = name + size;

    // añadir los procesos a la lista
    for (let i = 0; i < list.length; i++) {
        if (list[i] == undefined) {
            list[i] = processID;
        } else {
            size++;
        }

        if (size - 1 == i) {
            size = 0;
            break;
        }
    }
}

function showInfo(list) {
    // contar la cantidad de procesos
    let numProcess = 0;
    list.forEach((element) => {
        if (element != undefined) numProcess++;
    });

    // mostrar el numero de procesos activos
    countProcess.innerHTML = `Number active processes: ${numProcess}`;

    // mostrar la lista de procesos
    process.innerHTML = "";
    for (let i = 0; i < list.length; i++) {
        process.innerHTML += `<div><b>${list[i]}</b></div>`;
    }
}

function showWaiting(list) {
    // contar la cantidad de procesos en espera
    let numProcessWaiting = 0;
    list.forEach((element) => {
        if (element != undefined) numProcessWaiting++;
    });

    countWaiting.innerHTML = `Number in waiting process: ${numProcessWaiting}`;

    waiting.innerHTML = "";
    for (let i = 0; i < list.length; i++) {
        waiting.innerHTML += `<div><b>${list[i]}</b></div>`;
    }
}

// funcion para añadir el proceso
function addProcess() {
    // recibir el nombre y el tamaño del proceso
    let [name, size] = createProces();

    // si supero la capacidad de la memoria dejar en espera
    if (occupiedSpaces() + size > processList.length) {
        waitList.push(name + " " + size);

        // mostrar lista de espera
        showWaiting(waitList);

        return alert("Memoria insuficiente: proceso en lista de espera");
    }

    addProcessList(size, name, processList);

    showInfo(processList);
}


function addWaiting() {
    // tomar el primer elemento de la lista de espera
    const process = waitList[0];

    // obtener el tamaño y el nombre del proceso
    const name = process.split(" ")[0];
    const size = parseInt(process.split(" ")[1]);

    // si supero la capacidad de la memoria dejar en espera
    if (occupiedSpaces() + size > processList.length) return alert("Memoria insuficiente: proceso seguira en lista de espera");

    addProcessList(size, name, processList);

    // eliminar proceso de lista de espera
    waitList.splice(0, 1);

    // mostrar lista de espera
    showWaiting(waitList);

    showInfo(processList);
}

function deleteProcess() {
    // tomar del fronted el proceso a eliminar
    const name = document.getElementById("process-delete").value;

    // buscar el proceso en la lista y eliminarlo
    for (let i = 0; i < processList.length; i++) {
        if (processList?.[i]?.[0] == name) processList[i] = undefined;
    }

    showInfo(processList);
} 
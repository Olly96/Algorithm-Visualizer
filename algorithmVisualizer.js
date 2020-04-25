
let runBtn = true;
let generateBtn = true;
let searchDataSet = true;
const algoMap = { 'ls': linearSearch, 'bs': binarySearch, 'ss': selectionSort, 'bbs': bubbleSort};
let currentArray = [];
let algoRunning = false;
let globalDataSize;
let globalSpeed = 600;

function generateClicked() {
  if(!algoRunning){  globalDataSize = Number(document.getElementById('dataSize').value);
    globalDataSize = globalDataSize === 0 ? 50 : globalDataSize;
    const dataSetType = document.getElementById('dataTypeList').value;
    const algoType = document.getElementById('algorithmList').value;
    if (algoType === 'ls' || algoType === 'bs') {
        currentArray = generateRandomArray(globalDataSize);
        populateSpanSearch(currentArray);
    } else {
        currentArray = shuffle(generateRandomArray(globalDataSize));
        if(globalDataSize<=50){
            currentArray.map(val=> val + 50);
        }
        populateSpan(currentArray);
    }}
}

function algoChanged() {
    const algoType = document.getElementById('algorithmList').value;
    if (algoType === 'ls' || algoType === 'bs') {
        document.getElementById('searchValue').style.visibility = 'visible';
        document.getElementById('searchText').style.visibility = 'visible';
        currentArray = generateRandomArray(globalDataSize);
        populateSpanSearch(currentArray);
    } else {
        document.getElementById('searchValue').style.visibility = 'hidden';
        document.getElementById('searchText').style.visibility = 'hidden';
        currentArray = shuffle(generateRandomArray(globalDataSize));
        if(globalDataSize<=50){
            currentArray.map(val=> val + 50);
        }
        populateSpan(currentArray);
    }

}

async function runClicked() {
    if(!algoRunning){
        algoRunning = true;
        const algoType = document.getElementById('algorithmList').value;
        if (algoType === 'ls' || algoType === 'bs') {  
            const searchVal = Number(document.getElementById('searchInput').value) === 0 ? 50 : Number(document.getElementById('searchInput').value);
            populateSpanSearch(currentArray);
            await algoMap[algoType](currentArray, searchVal);
        } else{
            await algoMap[algoType](currentArray);
        }
        algoRunning = false;
    }
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function randomizeClicked() {
   if(!algoRunning){ if (searchDataSet) {
        populateSpanSearch(shuffle(currentArray));
    } else {
        populateSpan(shuffle(currentArray))
    }}
}

function sortClicked() {
   if(!algoRunning){ if (searchDataSet) {
        populateSpanSearch(currentArray.sort(function (a, b) { return a - b }));
    } else {
        populateSpan(currentArray.sort(function (a, b) { return a - b }))
    }}
}

function speedChanged(event){
 console.log(event)
 globalSpeed = 600/Number(event.target.value)
}

function onLoad() {
    generateClicked();
    // populateSpanSearch(visualizeData);
    // binarySearch(visualizeData, 94);
    // selectionSort(visualizeData);
}

function generateRandomArray(size) {
    let arr = [];
    for (let i = 1; i <= size; i++) {
        arr.push(i);
    }

    return arr;
}

async function populateSpan(arr) {
    searchDataSet = false;
    const mainDiv = document.getElementById('mainDiv');
    while (mainDiv.hasChildNodes()) {
        mainDiv.removeChild(mainDiv.firstChild);
    }
    // mainDiv.innerHTML = '';

    // let parRow = document.createElement()
    for (let i = 0; i < arr.length; i++) {
        let divElement = document.createElement('div');
        let divChild = document.createElement('div');
        divChild.setAttribute('id', 'divChild' + i);
        divChild.textContent = arr[i];
        divElement.setAttribute('class', 'flex-child-container');
        let spanElement = document.createElement('span');
        spanElement.setAttribute('id', 'span' + i);
        spanElement.style.height = arr[i] + 'px';
        spanElement.style.width = '15px';
        divChild.style.width = '15px';
        spanElement.style.marginRight = '0.85em';
        spanElement.style.marginTop = '25px'
        spanElement.style.background = 'red';
        divChild.setAttribute('class', 'divChildClass');
        // spanElement.setAttribute('class', 'arrayElementClass col pt-1');
        // spanElement.textContent = arr[i];
        divElement.appendChild(divChild);
        divElement.appendChild(spanElement);
        mainDiv.appendChild(divElement);
    }
}

function populateSpanSearch(arr) {
    searchDataSet = true;
    const mainDiv = document.getElementById('mainDiv');
    while (mainDiv.hasChildNodes()) {
        mainDiv.removeChild(mainDiv.firstChild);
    }
    // let parRow = document.createElement()
    for (let i = 0; i < arr.length; i++) {
        let spanElement = document.createElement('span');
        spanElement.setAttribute('id', 'span' + i);
        // spanElement.style.height = arr[i] + 'px';
        // spanElement.style.width = '5px';
        spanElement.textContent = arr[i];
        // spanElement.style.marginRight = '0.85em';
        spanElement.style.marginTop = '25px'
        // spanElement.style.background = 'red';
        spanElement.setAttribute('class', 'arrayElementClass');
        // spanElement.textContent = arr[i];
        mainDiv.appendChild(spanElement);
    }
}

async function linearSearch(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        const spanElementSearch = document.getElementById('span' + i);
        if (val === arr[i]) {
            spanElementSearch.classList.add('bg-success');
            break;
        }
        spanElementSearch.classList.add('arrayElementSearchBackground');
        await new Promise(r => setTimeout(r, globalSpeed));

        if (val !== arr[i]) {
            spanElementSearch.classList.remove('arrayElementSearchBackground');
        }
    }
}

async function binarySearch(sortedArray, elToFind) {
    var lowIndex = 0;
    var highIndex = sortedArray.length - 1;
    while (lowIndex <= highIndex) {
        addBackGroundSpan([lowIndex, highIndex]);

        await new Promise(r => setTimeout(r, globalSpeed));

        var midIndex = Math.floor((lowIndex + highIndex) / 2);
        if (sortedArray[midIndex] == elToFind) {
            removeBackGroundSpan([lowIndex, highIndex]);
            addBackGroundSpan([midIndex], 'bg-success');
            return midIndex;

        } else if (sortedArray[midIndex] < elToFind) {
            removeBackGroundSpan([lowIndex, highIndex]);
            lowIndex = midIndex + 1;
        } else {
            removeBackGroundSpan([lowIndex, highIndex]);
            highIndex = midIndex - 1;
        }
    } return null;
}

function addBackGroundSpan(indexArr, className = 'bg-primary') {
    indexArr.forEach(index => {
        const spanElement = document.getElementById('span' + index);
        spanElement.classList.add(className);
    })
}

function removeBackGroundSpan(indexArr, className = 'bg-primary') {
    indexArr.forEach(index => {
        const spanElement = document.getElementById('span' + index);
        spanElement.classList.remove(className);
    })
}

async function selectionSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        addBackGroundSpan([min]);
        for (let j = i + 1; j < len; j++) {
            addBackGroundSpan([j]);
            await new Promise(r => setTimeout(r, globalSpeed));
            removeBackGroundSpan([j]);
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        removeBackGroundSpan([i]);
        if (min !== i) {
            let tmp = arr[i];
            document.getElementById('span' + i).style.height = arr[min] + 'px';
            document.getElementById('divChild' + i).textContent = arr[min];
            document.getElementById('span' + min).style.height = tmp + 'px';
            document.getElementById('divChild' + min).textContent = tmp;
            await new Promise(r => setTimeout(r, globalSpeed));
            arr[i] = arr[min];
            arr[min] = tmp;

        }
    }
    return arr;
}

async function bubbleSort(inputArr) {
    let len = inputArr.length;
    for (let i = 0; i < len; i++) {
        addBackGroundSpan([i]);
        for (let j = 0; j < len; j++) {
            addBackGroundSpan([j]);
            if (inputArr[j] > inputArr[j + 1]) {
                let tmp = inputArr[j];
                const j1 = j+1;
                document.getElementById('span' + j).style.height = inputArr[j+1] + 'px';
                document.getElementById('divChild' + j).textContent = inputArr[j+1];
                document.getElementById('span' + (j+1)).style.height = tmp + 'px';
                document.getElementById('divChild' + (j+1)).textContent = tmp;
                await new Promise(r => setTimeout(r, globalSpeed));    
                inputArr[j] = inputArr[j + 1];
                inputArr[j + 1] = tmp;
            }
            removeBackGroundSpan([j]);
        }
        removeBackGroundSpan([i]);
    }
    return inputArr;
};

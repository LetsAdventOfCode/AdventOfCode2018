function solve() {
    var input = document.getElementById("input").value;
    var rows = input.split("\n").map(removePlusSign);

    var usedFrequencies = [];
    var currentFrequence = 0;
    for (var i = 0; i < rows.length; i++) {
        currentFrequence += rows[i];
        usedFrequencies.push(currentFrequence);
    }
    
    var firstDup = findFirstDuplicate(usedFrequencies, currentFrequence);
    
    document.getElementById("solution").innerHTML = currentFrequence;
    document.getElementById("solution2").innerHTML = firstDup;
}

function shiftArray(arr, shift) {
    var copiedArray = arr.slice();
    for (var i = 0; i < copiedArray.length; i++) {
        copiedArray[i] += shift;
    }
    return copiedArray;
}

function findFirstDuplicate(array, shift) {
    var shiftedArray = array.slice();
    var counter = 0;
    while (counter <= 425) {
        shiftedArray = shiftArray(shiftedArray, shift);
        for (var i = 0; i < array.length; i++) {
            if (shiftedArray.indexOf(array[i]) !== -1) {
                return array[i];
            }
        }
        counter++;
    }
}

function removePlusSign(a) {
    return a[0] === "+" ? parseInt(a.substring(1, a.length), 10) : parseInt(a, 10);
}
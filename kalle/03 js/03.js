function solve() {
    var input = document.getElementById("input").value;
    var rows = input.split("\n");

    var instructions = [];
    for (var i = 0; i < rows.length; i++) {
        var parts = rows[i].split(" ");
        var id = parts[0].split("#")[1];
        var start = parts[2].split(":")[0].split(",");
        var area = parts[3].split("x");
        instructions.push({
            id: id,
            start: start,
            area: area
        });
    }

    var grid = new Array(1200);
    for (var k = 0; k < grid.length; k++) {
        grid[k] = new Array(1200);
    }

    var c = document.getElementById("fabric");
    var ctx = c.getContext("2d");
    
    for (var j = 0; j < instructions.length; j++) {
        var instruction = instructions[j];
        var l = parseInt(instruction.start[0]);
        var stopL = l + parseInt(instruction.area[0]);
        
        for (l; l < stopL; l++) {
            var m = parseInt(instruction.start[1]);
            var stopM = m + parseInt(instruction.area[1]);
            for ( m ; m < stopM; m++) {
                if (grid[l][m]) {
                    grid[l][m] = -1;
                } else {
                    grid[l][m] = j + 1;
                }
            }
        }

        ctx.globalAlpha = 0.2;
        ctx.fillRect(instruction.start[0], instruction.start[1], instruction.area[0], instruction.area[1]);
        ctx.stroke();
    }
    var overlaps = 0;
    for (var n = 0; n < grid.length; n++) {
        for (var o = 0; o < grid[n].length; o++) {
            if (grid[n][o] === -1) {
                overlaps++;
            } 
        }
    }
    var taintedClaims = calcTaintedClaims(instructions, grid);
    var untaintedId = getUntaintedId(taintedClaims, instructions.length + 1);
    
    document.getElementById("solution").innerHTML = overlaps;
    document.getElementById("solution2").innerHTML = untaintedId;
}

function calcTaintedClaims(instructions, grid) {
    var taintedClaims = [];
    for (var j = 0; j < instructions.length; j++) {
        var instruction = instructions[j];
        var l = parseInt(instruction.start[0]);
        var stopL = l + parseInt(instruction.area[0]);

        for (l; l < stopL; l++) {
            var m = parseInt(instruction.start[1]);
            var stopM = m + parseInt(instruction.area[1]);
            for (m; m < stopM; m++) {
                if (grid[l][m] === -1) {
                    taintedClaims[j + 1] = true;
                }
            }
        }
    }
    return taintedClaims;
}

function getUntaintedId(taintedClaims, numOfInstructions) {
    var untaintedId = 0;
    for (var p = 1; p < numOfInstructions; p++) {
        if (!taintedClaims[p ]) {
            untaintedId = p;
        }
    }
    return untaintedId;
}
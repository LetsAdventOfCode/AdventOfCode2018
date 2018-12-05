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

    var grid = [1000][1000];

    var c = document.getElementById("fabric");
    var ctx = c.getContext("2d");
    for (var j = 0; j < instructions.length; j++) {
        var instruction = instructions[j];

        ctx.rect(instruction.start[0], instruction.start[1], instruction.area[0], instruction.area[1]);
        ctx.stroke();
    }


    //document.getElementById("solution").innerHTML = checksum;
}
function solve() {
    var input = document.getElementById("input").value;
    var rows = input.split("\n");
	var twoCounter = 0;
	var threeCounter = 0;
	
    for (var i = 0; i < rows.length; i++) {
		var dict = [];
        for (var j = 0; j < rows[i].length; j++) {
			if(!dict[rows[i][j]]){
				dict[rows[i][j]] = 0;
			}
			dict[rows[i][j]] += 1;
		}
		var twoUpdated = false;
		var threeUpdated = false;
		for (var key in dict){
			if(dict[key] == 2 && !twoUpdated){
				twoCounter++;
				twoUpdated = true;
			}
			if(dict[key] === 3 && !threeUpdated){
				threeCounter++;
				threeUpdated = true;
			}
		}
    }
	var checksum = twoCounter * threeCounter;

    document.getElementById("solution").innerHTML = checksum;
}
var coalList = [
    ["A", 10000, 5000, 0],
    ["B", 10000, 5000, 0],
    ["C", 10000, 5000, 0],
    ["D", 10000, 5000, 0],
    ["A", 10000, 5000, 0],
    ["B", 10000, 5000, 0],
    ["C", 10000, 5000, 0],
    ["D", 10000, 5000, 0],
    ["A", 10000, 5000, 0],
    ["B", 10000, 5000, 0],
    ["C", 10000, 5000, 0],
    ["D", 10000, 5000, 0],
    ["E", 10000, 5000, 0]
];

function custom_compare (a,b) {
    return a.value - b.value;
}

function coalOptimizer(){
    var ideal_coal_mix = [];
    var max_limit = [];

    for (var i = 0; i < coalList.length; i++) {
        max_limit[i] = document.getElementById("maxLimit" + i).value;
        ideal_coal_mix[i] = 0;
    }

    coal_rs_kcal = []
    for (var i = 0; i < coalList.length; i++) {
        coal_rs_kcal[i] = {index: i, value: coalList[i][1] / coalList[i][2]};
    }
    coal_rs_kcal.sort(custom_compare);

    percent_left = 100;
    for (var i = 0; i < coal_rs_kcal.length; i++) {
        if (percent_left > max_limit[coal_rs_kcal[i].index]) {
            ideal_coal_mix[coal_rs_kcal[i].index] = max_limit[coal_rs_kcal[i].index];
            percent_left -= max_limit[coal_rs_kcal[i].index];
        } else {
            ideal_coal_mix[coal_rs_kcal[i].index] = percent_left;
            percent_left = 0;
        }
    }

    rs_ton = 0;
    kcal_kg = 0;
    for (var i = 0; i < coalList.length; i++) {
        rs_ton += coalList[i][1] * ideal_coal_mix[i] / 100;
        kcal_kg += coalList[i][2] * ideal_coal_mix[i] / 100;
    }
    rs_kcal = rs_ton / (kcal_kg*1000);

    if (percent_left > 0) {
        document.getElementById("rs-ton").innerHTML = "Rs/ton of ideal mix: 0";
        document.getElementById("kcal-kg").innerHTML = "Kcal/kg of ideal mix: 0";
        document.getElementById("rs-kcal").innerHTML = "Rs/kcal of ideal mix: 0";
        document.getElementById("idealMixTable").innerHTML = "<h3>Percentage left: "+percent_left+"<h3>";
    } else {
        str = "<tr><th>Coal type</th><th>Percentage</th></tr>";
        for (var i = 0; i < coalList.length; i++) {
            if (ideal_coal_mix[i] > 0) {
                str += "<tr><td>" + coalList[i][0] + "</td><td>" + ideal_coal_mix[i] + "</td></tr>";
            }
        }
        document.getElementById("idealMixTable").innerHTML = str;    
        document.getElementById("rs-ton").innerHTML = "Rs/ton of ideal mix: "+rs_ton;
        document.getElementById("kcal-kg").innerHTML = "Kcal/kg of ideal mix: "+kcal_kg;
        document.getElementById("rs-kcal").innerHTML = "Rs/kcal of ideal mix: "+rs_kcal;    
    }
}

str = "<tr><th>Coal type</th><th>Price (Rs/ton)</th><th>Calorfic value (Kcal/kg)</th>";
str += "<th>Max-limit (%)</th></tr>";

for (var i = 0; i < coalList.length; i++) {
    str += "<tr><td>" + coalList[i][0] + "</td><td>" + coalList[i][1] + "</td><td>" + coalList[i][2] + "</td>";
    str += "<td><input type='number' id='maxLimit"+ i + "' value='" + coalList[i][3] + "' required></td></tr>";
}

document.getElementById("coalDetailsTable").innerHTML = str;
for (var i = 0; i < coalList.length; i++) {
    document.getElementById("maxLimit" + i).addEventListener("change", coalOptimizer);
}

coalOptimizer();
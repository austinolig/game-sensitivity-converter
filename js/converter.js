// available games to convert between
var games = [
    ['csgo', 'CSGO'],
    ['apex-legends', 'APEX LEGENDS'], 
    ['valorant', 'VALORANT'], 
    ['modern-warfare', 'MODERN WARFARE'], 
    ['overwatch', 'OVERWATCH'],
    ['siege', 'R6 SIEGE'],
    ['hyper-scape', 'HYPER SCAPE'],
];

// initialize window
$(window).on('load', () => {
    $('#table-cells-custom-header').hide();
    $("#table-cells-custom").hide();

    // for all games, populate table and dropdown items for converting
    for (i in games) {
        // populate game options
        var option = $(`<option>${games[i][1]}</option>`).attr('value', `${games[i][0]}`);
        $("#game-options").append(option);

        // populate table headers
        var header = $(`<th>${games[i][1]}</th>`);
        $("#table-headers").append(header);

        // populate table results
        var result = $(`<td>0.0000</td>`).attr('id', `result-${games[i][0]}`);
        $("#table-cells").append(result);
        var result_custom = $(`<td>0.0000</td>`).attr('id', `result-${games[i][0]}-custom`);
        $("#table-cells-custom").append(result_custom);
    }
});

// calculate sens when selecting game to convert from
$("#game-options").change(() => {
    calcSens();
});

// calculate sens when inputting sensitivity to convert from
$("#sens-input").on('keyup change', () => {
    calcSens();
});

// calculate sens when changing input dpi to convert from
$("#dpi-input").change(() => {
    calcSens();
});

// calculate sens when adding an output dpi to convert to
$("#dpi-output").change(() => {
    calcSens();
});

// calculate sens when selecting decimal precision of results
$("#decimal-precision").change(() => {
    calcSens();
});

// calculate the sensitivity for each game
function calcSens() {
    // initialize variables
    var sens_source = 0.00;
    var sens_input = $("#sens-input").val();
    var dpi_input = $("#dpi-input").val();
    var dpi_output = $("#dpi-output").val();
    var selected_game = $("#game-options option:selected").val();
    var decimal_precision = $("#decimal-precision").val();

    // sensitivity input validation
    if (sens_input == '' || sens_input <= 0) {
        sens_input = 0.00;
    }

    // if dpi output isn't set, hide custom sensitivity range, else show custom results
    if (dpi_output == '' || dpi_output <= 0) {
        $('#table-cells-custom-header').hide();
        $("#table-cells-custom").hide();
        dpi_output = 0;
    } else {
        var result_custom_header = $(`<th>SENSITIVITY @ ${dpi_output} DPI</th>`).attr('colspan', `${games.length}`);
        $("#table-cells-custom-header").html(result_custom_header);
        $('#table-cells-custom-header').show();
        $("#table-cells-custom").show();
    }

    // convert input sens from selected game to source sens
    if (selected_game == 'csgo') {
        sens_source = parseFloat(sens_input);
    } else if (selected_game == 'apex-legends') {
        sens_source = parseFloat(sens_input);
    } else if (selected_game == 'valorant') {
        sens_source = parseFloat(sens_input * 10 * 7 / 22);
    } else if (selected_game == 'modern-warfare') {
        sens_source = parseFloat(sens_input / 10 * 3);
    } else if (selected_game == 'overwatch') {
        sens_source = parseFloat(sens_input / 10 * 3);
    } else if (selected_game == 'siege') {
        sens_source = parseFloat(sens_input / 3.83972336439);
    } else if (selected_game == 'hyper-scape') {
        sens_source = parseFloat(sens_input / 3.83972336439);
    }

    // relate source sens to dpi input
    sens_source = sens_source * dpi_input;
    console.log(sens_source);

    // convert to csgo
    var sens_csgo = parseFloat(sens_source);
    $("#result-csgo").text((sens_csgo / dpi_input).toFixed(decimal_precision));
    $("#result-csgo-custom").text((sens_csgo / dpi_output).toFixed(decimal_precision));

    // convert to apex legends
    var sens_apex_legends = parseFloat(sens_source);
    $("#result-apex-legends").text((sens_apex_legends / dpi_input).toFixed(decimal_precision));
    $("#result-apex-legends-custom").text((sens_apex_legends / dpi_output).toFixed(decimal_precision));
    
    // convert to valorant
    var sens_valorant = parseFloat(sens_source * 22 / 7 / 10);
    $("#result-valorant").text((sens_valorant / dpi_input).toFixed(decimal_precision));
    $("#result-valorant-custom").text((sens_valorant / dpi_output).toFixed(decimal_precision));

    // convert to modernwarfare
    var sens_modern_warfare = parseFloat(sens_source * (1/3) * 10);
    $("#result-modern-warfare").text((sens_modern_warfare / dpi_input).toFixed(decimal_precision));
    $("#result-modern-warfare-custom").text((sens_modern_warfare / dpi_output).toFixed(decimal_precision));

    // convert to overwatch
    var sens_overwatch = parseFloat(sens_source * (1/3) * 10);
    $("#result-overwatch").text((sens_overwatch / dpi_input).toFixed(decimal_precision));
    $("#result-overwatch-custom").text((sens_overwatch / dpi_output).toFixed(decimal_precision));

    // convert to siege
    var sens_siege = parseFloat(sens_source * 3.83972336439);
    $("#result-siege").text((sens_siege / dpi_input).toFixed(decimal_precision));
    $("#result-siege-custom").text((sens_siege / dpi_output).toFixed(decimal_precision));

    // convert to hyper scape
    var sens_hyper_scape = parseFloat(sens_source * 3.83972336439);
    $("#result-hyper-scape").text((sens_hyper_scape / dpi_input).toFixed(decimal_precision));
    $("#result-hyper-scape-custom").text((sens_hyper_scape / dpi_output).toFixed(decimal_precision));
}
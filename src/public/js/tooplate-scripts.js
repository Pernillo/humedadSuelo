const width_threshold = 480;

function drawLineChart() {
  const socket = io(); //cargar cliente socket.io
  let counter = 0; // contador del tiempo

  if ($("#lineChart").length) {
    ctxLine = document.getElementById("lineChart").getContext("2d");
    optionsLine = {
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Humedad del suelo",
            },
          },
        ],
      },
    };

    // Set aspect ratio based on window width
    optionsLine.maintainAspectRatio =
      $(window).width() < width_threshold ? false : true;

    let configLine = {
      type: "line",
      data: {
        labels: ["Tiempo"],
        datasets: [
          {
            label: "Humedad",
            data: [],
            fill: true,
            borderColor: "rgba(8, 61, 119)",
            lineTension: 0.1,
          },
        ],
      },
      options: optionsLine,
    };

    let lineChart = new Chart(ctxLine, configLine);

    socket.on("humidityValue", function (dataSerial) {
      //obtener valores por socket, desde el arduino
      const serialValue = +dataSerial.value;
      console.log(serialValue);
      lineChart.data.labels.push(counter);
      lineChart.data.datasets.forEach((dataset) => {
        dataset.data.push(serialValue);
        if (serialValue < 5) {
          //cambiar color del grafico
          dataset.backgroundColor = "rgb(249, 83, 70)";
          dataset.borderColor = "rgb(249, 83, 70)";
          //encender bomba
        } else {
          dataset.backgroundColor = "rgba(8, 61, 119)";
          dataset.borderColor = "rgba(8, 61, 119)";
        }
      });
      counter++;
      console.log(lineChart.data.datasets);
      lineChart.update();
    });
  }
}

function updateChartOptions() {
  if ($(window).width() < width_threshold) {
    if (optionsLine) {
      optionsLine.maintainAspectRatio = false;
    }
  } else {
    if (optionsLine) {
      optionsLine.maintainAspectRatio = true;
    }
  }
}

function updateLineChart() {
  if (lineChart) {
    lineChart.options = optionsLine;
    lineChart.update();
  }
}

function reloadPage() {
  setTimeout(function () {
    window.location.reload();
  }); // Reload the page so that charts will display correctly
}
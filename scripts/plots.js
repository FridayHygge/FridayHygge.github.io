const tsvFilePath = 'data/inventory.tsv'; // Replace with the actual file path

fetch(tsvFilePath)
    .then(response => response.text())
    .then(data => {
        const parsedData = parseTsvData(data);
        const uniqueCounts = countUniqueOccurrences(parsedData);
        createPieChart(uniqueCounts);
    })
    .catch(error => console.error('Error loading TSV file:', error));

function parseTsvData(tsv) {
    const rows = tsv.split('\n');
    const data = [];

    for (let i = 0; i < rows.length; i++) {
        const columns = rows[i].split('\t');
        data.push(columns);
    }

    return data;
}

function countUniqueOccurrences(data) {
    const counts = new Map();

    for (let i = 1; i < data.length; i++) {
        const value = data[i][5]; // Assuming column 5 is the 5th column (0-based index)
        if (counts.has(value)) {
            counts.set(value, counts.get(value) + parseInt(data[i][3]));
        } else {
            counts.set(value, parseInt(data[i][3]));
        }
    }

    return counts;
}

function createPieChart(counts) {
    const labels = Array.from(counts.keys());
    const countValues = Array.from(counts.values());
    const backgroundColors = generateRandomColors(labels);

    const pieChartData = {
        labels: labels,
        datasets: [{
            data: countValues,
            backgroundColor: backgroundColors,
        }],
    };

    const pieCanvas = document.getElementById('pieChart');
    pieCanvas.width = pieCanvas.parentElement.clientWidth;

    const pieCtx = pieCanvas.getContext('2d');
    const pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: pieChartData,
    });
}

function generateRandomColors(labels) {
    const colors = [];
    for (let i = 0; i < labels.length; i++) {
        let color = "#58508d";
        if (labels[i] === "Beer") {
            color = "#ffa600";
        }
        else if (labels[i] === "AF Beer") {
            color = "#bc5090";
        }
        else if (labels[i] === "Cider") {
            color = "#ff6361";
        }
        else {
            color = "#58508d";
            
        }
        
        colors.push(color);
    }
    return colors;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

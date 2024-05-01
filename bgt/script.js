
// Get all table rows
const rows = document.querySelectorAll('tbody tr');

// Loop through each row
rows.forEach(row => {
    // Get all td elements in the row
    const tds = row.querySelectorAll('td');
    // Convert NodeList to array and reverse it
    const reversedTds = Array.from(tds).reverse();
    // Remove existing td elements from the row
    tds.forEach(td => td.remove());
    // Append reversed td elements back to the row
    reversedTds.forEach(td => row.appendChild(td));
});



// Bar Chart
var ctx = document.getElementById('barChart').getContext('2d');
var barChart = new Chart(ctx, {
  type: 'bar',
  data: {
    
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [{
      label: 'Line 1',
      data: [13, 1, 8, 5, 2, 12, 0, 10, 5, 11],
      borderColor: '#86e49d',
      borderWidth: 1,
      backgroundColor: '#86e49e58',
      fill: false
    }, {
      label: 'Line 2',
      data: [2, 5, 7, 4, 8, 10, 6, 9, 13, 10],
      borderColor: '#6fcaea',
      borderWidth: 1,
      backgroundColor: '#6fc9ea8e',
      fill: false
    }, {
      label: 'Line 3',
      data: [4, 7, 9, 6, 10, 13, 8, 11, 14, 12],
      borderColor: '#ffa288',
      borderWidth: 1,
      backgroundColor: '#ffa28884', // Lighter shade for the shadow
      fill: false // Fill area under the line
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// line Chart

var ctx = document.getElementById('pieChart').getContext('2d');
var lineChart = new Chart(ctx, {
type: 'line',
data: {
labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
datasets: [{
  label: 'Line 1',
  data: [13, 8, 9, 10, 8, 11, 15, 10, 8, 11],
  borderColor: '#86e49d',
  backgroundColor: '#86e49e58',
  fill: true
}, {
  label: 'Line 3',
  data: [8, 7, 9, 6, 4, 7, 8, 11, 9, 12],
  borderColor: '#ffa288',
  backgroundColor: '#ffa28884', // Lighter shade for the shadow
  fill: true // Fill area under the line
}]
},
options: {
scales: {
  yAxes: [{
    ticks: {
      beginAtZero: true
    }
  }]
}
}
});

// Pie Chart
var ctx2 = document.getElementById('lineChart').getContext('2d');
var pieChart = new Chart(ctx2, {
  type: 'doughnut',
  data: {
    labels: ['سلبي', 'محايد', 'إيجابي'],
    datasets: [{
      label: 'radar Chart',
      data: [30, 40, 30],
       backgroundColor: [
        '#86e49e58 ',
        '#6fc9ea8e',
        '#ffa28884'
      ],
      borderColor: [
        '#86e49d',
        '#6fcaea',
        '#ffa288'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


let options = {
  startAngle: -1.55,
  size: 90,
  value: 0.85,
  fill: {gradient: ['#ffffffb2', '#ffffffb2']}
}
$(".circle .bar").circleProgress(options).on('circle-animation-progress',
function(event, progress, stepValue){
  $(this).parent().find("span").text(String(stepValue.toFixed(2).substr(2)) + "%");
});
$(".js .bar").circleProgress({
  value: 0.70
});
$(".react .bar").circleProgress({
  value: 0.60
});



const search = document.querySelector('.input-group input'),
table_rows = document.querySelectorAll('tbody tr'),
table_headings = document.querySelectorAll('thead th');

// 1. Searching for specific data of HTML table
search.addEventListener('input', searchTable);

function searchTable() {
table_rows.forEach((row, i) => {
let table_data = row.textContent.toLowerCase(),
search_data = search.value.toLowerCase();

row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
row.style.setProperty('--delay', i / 25 + 's');
})

document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
});
}

// 2. Sorting | Ordering data of HTML table

table_headings.forEach((head, i) => {
let sort_asc = true;
head.onclick = () => {
table_headings.forEach(head => head.classList.remove('active'));
head.classList.add('active');

document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
table_rows.forEach(row => {
row.querySelectorAll('td')[i].classList.add('active');
})

head.classList.toggle('asc', sort_asc);
sort_asc = head.classList.contains('asc') ? false : true;

sortTable(i, sort_asc);
}
})


function sortTable(column, sort_asc) {
[...table_rows].sort((a, b) => {
let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
})
.map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}

// 3. Converting HTML table to PDF

const pdf_btn = document.querySelector('#toPDF');
const customers_table = document.querySelector('#customers_table');


const toPDF = function (customers_table) {
const html_code = `
<!DOCTYPE html>
<link rel="stylesheet" type="text/css" href="style.css">
<div class="card-03" id="bgt" >${bgt.innerHTML}</div>`;

const new_window = window.open();
new_window.document.write(html_code);

setTimeout(() => {
new_window.print();
new_window.close();
}, 400);
}

pdf_btn.onclick = () => {
toPDF(customers_table);
}

// 4. Converting HTML table to JSON

const json_btn = document.querySelector('#toJSON');

const toJSON = function (table) {
let table_data = [],
t_head = [],

t_headings = table.querySelectorAll('th'),
t_rows = table.querySelectorAll('tbody tr');

for (let t_heading of t_headings) {
let actual_head = t_heading.textContent.trim().split(' ');

t_head.push(actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase());
}

t_rows.forEach(row => {
const row_object = {},
t_cells = row.querySelectorAll('td');

t_cells.forEach((t_cell, cell_index) => {
const img = t_cell.querySelector('img');
if (img) {
    row_object['customer image'] = decodeURIComponent(img.src);
}
row_object[t_head[cell_index]] = t_cell.textContent.trim();
})
table_data.push(row_object);
})

return JSON.stringify(table_data, null, 4);
}

json_btn.onclick = () => {
const json = toJSON(customers_table);
downloadFile(json, 'json')
}

// 5. Converting HTML table to CSV File

const csv_btn = document.querySelector('#toCSV');

const toCSV = function (table) {
// Code For SIMPLE TABLE
// const t_rows = table.querySelectorAll('tr');
// return [...t_rows].map(row => {
//     const cells = row.querySelectorAll('th, td');
//     return [...cells].map(cell => cell.textContent.trim()).join(',');
// }).join('\n');

const t_heads = table.querySelectorAll('th'),
tbody_rows = table.querySelectorAll('tbody tr');

const headings = [...t_heads].map(head => {
let actual_head = head.textContent.trim().split(' ');
return actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase();
}).join(',') + ',' + 'image name';

const table_data = [...tbody_rows].map(row => {
const cells = row.querySelectorAll('td'),
img = decodeURIComponent(row.querySelector('img').src),
data_without_img = [...cells].map(cell => cell.textContent.replace(/,/g, ".").trim()).join(',');

return data_without_img + ',' + img;
}).join('\n');

return headings + '\n' + table_data;
}

csv_btn.onclick = () => {
const csv = toCSV(customers_table);
downloadFile(csv, 'csv', 'customer orders');
}



const excel_btn = document.querySelector('#toEXCEL');

const toExcel = function (table) {


const t_heads = table.querySelectorAll('th'),
tbody_rows = table.querySelectorAll('tbody tr');

const headings = [...t_heads].map(head => {
let actual_head = head.textContent.trim().split(' ');
return actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase();
}).join('\t') + '\t' + 'image name';

const table_data = [...tbody_rows].map(row => {
const cells = row.querySelectorAll('td'),
img = decodeURIComponent(row.querySelector('img').src),
data_without_img = [...cells].map(cell => cell.textContent.trim()).join('\t');

return data_without_img + '\t' + img;
}).join('\n');

return headings + '\n' + table_data;
}

excel_btn.onclick = () => {
const excel = toExcel(customers_table);
downloadFile(excel, 'excel');
}

const downloadFile = function (data, fileType, fileName = '') {
const a = document.createElement('a');
a.download = fileName;
const mime_types = {
'json': 'application/json',
'csv': 'text/csv',
'excel': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}
a.href = `
data:${mime_types[fileType]};charset=utf-8,${encodeURIComponent(data)}
`;
document.body.appendChild(a);
a.click();
a.remove();
}


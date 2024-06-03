import data from './data.json' assert { type: 'json' }

let lineAreaChart
let horizontalBarChart
let pieChart
let monthlySalesChart

function updateCharts() {
  const selectedBoroughs = Array.from(
    document.querySelectorAll('#boroughFilter input:checked')
  ).map((checkbox) => checkbox.value)
  const selectedBuildingClasses = Array.from(
    document.querySelectorAll('#buildingClassFilter input:checked')
  ).map((checkbox) => checkbox.value)

  const filteredData = data.filter(
    (item) =>
      (selectedBoroughs.length === 0 ||
        selectedBoroughs.includes(item.borough_name)) &&
      (selectedBuildingClasses.length === 0 ||
        selectedBuildingClasses.includes(item.building_classification))
  )

  // Update total sales, average sale price, average building area, average land area
  const totalPenjualan = filteredData.reduce(
    (sum, item) => sum + item.sale_price,
    0
  )
  document.getElementById('totalPenjualan').textContent =
    totalPenjualan.toLocaleString()

  const rataRataHargaPenjualan = totalPenjualan / filteredData.length
  document.getElementById('rataRataHargaPenjualan').textContent =
    rataRataHargaPenjualan.toLocaleString()

  const totalLuasBangunan = filteredData.reduce(
    (sum, item) => sum + item.total_unit,
    0
  )
  const rataRataLuasBangunan = totalLuasBangunan / filteredData.length
  document.getElementById('rataRataLuasBangunan').textContent =
    rataRataLuasBangunan.toLocaleString()

  const totalLuasTanah = filteredData.reduce(
    (sum, item) => sum + item.land_square_feet,
    0
  )
  const rataRataLuasTanah = totalLuasTanah / filteredData.length
  document.getElementById('rataRataLuasTanah').textContent =
    rataRataLuasTanah.toLocaleString()

  // Update line chart for average land and building area over time
  const boroughs = [...new Set(filteredData.map((item) => item.borough_name))]
  lineAreaChart.data.labels = boroughs
  lineAreaChart.data.datasets[0].data = boroughs.map(
    (borough) =>
      filteredData
        .filter((item) => item.borough_name === borough)
        .reduce((sum, item) => sum + item.land_square_feet, 0) /
      filteredData.filter((item) => item.borough_name === borough).length
  )
  lineAreaChart.data.datasets[1].data = boroughs.map(
    (borough) =>
      filteredData
        .filter((item) => item.borough_name === borough)
        .reduce((sum, item) => sum + item.total_unit, 0) /
      filteredData.filter((item) => item.borough_name === borough).length
  )
  lineAreaChart.update()

  // Update horizontal bar chart for land and building area by building type
  const residentialTypes = [
    ...new Set(filteredData.map((item) => item.residential_type)),
  ]
  horizontalBarChart.data.labels = residentialTypes
  horizontalBarChart.data.datasets[0].data = residentialTypes.map(
    (type) =>
      filteredData
        .filter((item) => item.residential_type === type)
        .reduce((sum, item) => sum + item.land_square_feet, 0) /
      filteredData.filter((item) => item.residential_type === type).length
  )
  horizontalBarChart.data.datasets[1].data = residentialTypes.map(
    (type) =>
      filteredData
        .filter((item) => item.residential_type === type)
        .reduce((sum, item) => sum + item.total_unit, 0) /
      filteredData.filter((item) => item.residential_type === type).length
  )
  horizontalBarChart.update()

  // Update pie chart for sales distribution by borough
  const boroughSales = boroughs.map((borough) =>
    filteredData
      .filter((item) => item.borough_name === borough)
      .reduce((sum, item) => sum + item.sale_price, 0)
  )

  pieChart.data.labels = boroughs
  pieChart.data.datasets[0].data = boroughSales
  pieChart.update()

  // Update monthly sales trend chart
  const months = [...new Set(filteredData.map((item) => item.mon_yyyy))].sort()
  const monthlySales = months.map((month) =>
    filteredData
      .filter((item) => item.mon_yyyy === month)
      .reduce((sum, item) => sum + item.sale_price, 0)
  )

  monthlySalesChart.data.labels = months
  monthlySalesChart.data.datasets[0].data = monthlySales
  monthlySalesChart.update()
}

// Line chart for average land and building area over time
const lineAreaCtx = document.getElementById('lineAreaChart')
lineAreaChart = new Chart(lineAreaCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'GROSS SQUARE FEET',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'LAND SQUARE FEET',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  },
})

// Horizontal bar chart for land and building area by building type
const horizontalBarCtx = document.getElementById('horizontalBarChart')
horizontalBarChart = new Chart(horizontalBarCtx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Gross Square Feet',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Land Square Feet',
        data: [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  },
  options: {
    indexAxis: 'y',
  },
})

// Pie chart for sales distribution by borough
const pieCtx = document.getElementById('pieChart')
pieChart = new Chart(pieCtx, {
  type: 'pie',
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  },
})

// Monthly sales trend chart
const monthlySalesCtx = document.getElementById('monthlySalesChart')
monthlySalesChart = new Chart(monthlySalesCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        fill: true,
      },
    ],
  },
})

// Fill filter options with unique values from data
const boroughs = [...new Set(data.map((item) => item.borough_name))]
const boroughFilter = document.getElementById('boroughFilter')
boroughs.forEach((borough) => {
  const label = document.createElement('label')
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.value = borough
  checkbox.addEventListener('change', updateCharts)
  label.appendChild(checkbox)
  label.appendChild(document.createTextNode(borough))
  boroughFilter.appendChild(label)
})

const buildingClasses = [
  ...new Set(data.map((item) => item.building_classification)),
]
const buildingClassFilter = document.getElementById('buildingClassFilter')
buildingClasses.forEach((buildingClass) => {
  const label = document.createElement('label')
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.value = buildingClass
  checkbox.addEventListener('change', updateCharts)
  label.appendChild(checkbox)
  label.appendChild(document.createTextNode(buildingClass))
  buildingClassFilter.appendChild(label)
})

// Initial charts update
updateCharts()

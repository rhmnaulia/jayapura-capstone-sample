# Simple Real Estate Dashboard

This repository contains a simple real estate dashboard built using Chart.js and vanilla JavaScript. The dashboard provides a visual representation of NYC property sales data, allowing users to filter and analyze the data based on various criteria. This dashboard was created as a reference for mentees from the Jayapura section, where there were four teams working on their capstone projects.

## Features

- Filter data by borough and building class category
- Display total sales, average sale price, average building area, and average land area
- Line chart for average land and building area over time
- Horizontal bar chart for land and building area by building type
- Pie chart for sales distribution by borough
- Line chart for monthly sales trend

## Getting Started

To get a local copy of the project up and running, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/simple-real-estate-dashboard.git
   ```

2. Navigate to the project directory:
   ```
   cd simple-real-estate-dashboard
   ```

3. Open the `index.html` file in your preferred web browser.

## Usage

Upon opening the dashboard, you will see various charts and statistics related to NYC property sales. You can filter the data using the dropdown menus at the top, which allow you to select specific boroughs and building class categories.

The dashboard displays the following information:

- Total sales
- Average sale price
- Average building area
- Average land area
- Line chart for average land and building area over time, grouped by borough
- Horizontal bar chart for land and building area by building type
- Pie chart for sales distribution by borough
- Line chart for monthly sales trend

The charts and statistics will automatically update based on the selected filters.

## Data

The data used in this dashboard is loaded from the `data.json` file, which contains NYC property sales data. The data includes information such as borough, building classification, residential type, sale price, land area, and building area.

## Dependencies

This project relies on the following external dependencies:

- [Chart.js](https://www.chartjs.org/) - A JavaScript library for creating charts and visualizations.

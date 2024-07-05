<template>
    <LineChart :chartData="data" :options="options" />
</template>

<script lang="ts">
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import salesData from '../data.json';
import { SalesData } from '../types';

Chart.register(...registerables);

export default {
    name: 'SalesLineChart',
    components: { LineChart },
    setup() {
        const data = {
            labels: (salesData.salesData as SalesData[]).map(
                (item) => item.month
            ),
            datasets: [
                {
                    label: 'Sales',
                    data: (salesData.salesData as SalesData[]).map(
                        (item) => item.sales
                    ),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
        };

        return { data, options };
    },
};
</script>

<style></style>

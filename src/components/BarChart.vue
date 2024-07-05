<template>
    <BarChart :chartData="data" :options="options" />
</template>

<script lang="ts">
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import expenseData from '../data.json';
import { ExpenseData } from '../types';

Chart.register(...registerables);

export default {
    name: 'ExpensesBarChart',
    components: { BarChart },
    setup() {
        const data = {
            labels: (expenseData.expenseData as ExpenseData[]).map(
                (item) => item.category
            ),
            datasets: [
                {
                    label: 'Expenses',
                    data: (expenseData.expenseData as ExpenseData[]).map(
                        (item) => item.amount
                    ),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
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

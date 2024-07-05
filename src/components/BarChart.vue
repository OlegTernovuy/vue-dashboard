<template>
    <p v-if="loadingState">Loading...</p>
    <BarChart :chartData="data" :options="options" v-else />
</template>

<script lang="ts">
import { Chart, registerables } from 'chart.js';
import { BarChart } from 'vue-chart-3';
import { ref, onMounted } from 'vue';

import { ChartData, ExpenseData } from '../types';
import api from '../api/chartApi';

Chart.register(...registerables);

export default {
    name: 'ExpensesBarChart',
    components: { BarChart },
    setup() {
        const loadingState = ref(true);
        const data = ref<ChartData | null>(null);
        const options = {
            responsive: true,
            maintainAspectRatio: false,
        };

        onMounted(async () => {
            try {
                const expenseData: ExpenseData[] = await api.getExpenseData();
                data.value = {
                    labels: expenseData.map((item) => item.category),
                    datasets: [
                        {
                            label: 'Sales',
                            data: expenseData.map((item) => item.amount),
                        },
                    ],
                };
                loadingState.value = false;
            } catch (error) {
                console.error('Failed to fetch expense data:', error);
                loadingState.value = false;
            }
        });

        return { data, options, loadingState };
    },
};
</script>

<style></style>

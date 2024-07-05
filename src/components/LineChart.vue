<template>
    <p v-if="loadingState">Loading...</p>
    <LineChart :chartData="data" :options="options" v-else />
</template>

<script lang="ts">
import { Chart, registerables } from 'chart.js';
import { LineChart } from 'vue-chart-3';
import { ref, onMounted } from 'vue';

import { ChartData, SalesData } from '../types';
import api from '../api/chartApi';

Chart.register(...registerables);

export default {
    name: 'SalesLineChart',
    components: { LineChart },
    setup() {
        const loadingState = ref(true);
        const data = ref<ChartData | null>(null);
        const options = {
            responsive: true,
            maintainAspectRatio: false,
        };

        onMounted(async () => {
            try {
                const salesData: SalesData[] = await api.getSalesData();
                data.value = {
                    labels: salesData.map((item) => item.month),
                    datasets: [
                        {
                            label: 'Sales',
                            data: salesData.map((item) => item.sales),
                        },
                    ],
                };
                loadingState.value = false;
            } catch (error) {
                console.error('Failed to fetch sales data:', error);
                loadingState.value = false;
            }
        });

        return { data, options, loadingState };
    },
};
</script>

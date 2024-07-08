<template>
    <div>
        <p v-if="loadingState">Loading...</p>
        <div v-else>
            <BarChart :chartData="filteredChartData" :options="options" />
            <ChartFilters
                type="bar"
                :data="expenseData"
                @filter-change="handleFilterChange"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Chart, registerables } from 'chart.js';
import { defineComponent, computed } from 'vue';
import { BarChart } from 'vue-chart-3';
import { useStore } from 'vuex';

import { ChartFilters } from './index';

Chart.register(...registerables);

export default defineComponent({
    name: 'ExpensesBarChart',
    components: { BarChart, ChartFilters },
    setup() {
        const store = useStore();

        const loadingState = computed(
            () => store.getters['chartData/isLoading']
        );
        const expenseData = computed(() => store.state.chartData.expensesData);
        const filteredChartData = computed(
            () => store.getters['chartData/expensesChartData']
        );

        store.dispatch('chartData/fetchExpensesData');

        const handleFilterChange = (maxAmount: number | null) => {
            store.dispatch('chartData/applyExpensesFilter', maxAmount);
        };

        return {
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
            loadingState,
            expenseData,
            filteredChartData,
            handleFilterChange,
        };
    },
});
</script>

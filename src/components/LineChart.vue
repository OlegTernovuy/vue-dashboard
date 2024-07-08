<template>
    <div>
        <p v-if="loadingState">Loading...</p>
        <div v-else>
            <LineChart :chartData="filteredChartData" :options="options" />
            <ChartFilters
                type="line"
                :data="salesData"
                @filter-change="handleFilterChange"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { LineChart } from 'vue-chart-3';
import { useStore } from 'vuex';

import { ChartFilters } from './index';

export default defineComponent({
    name: 'SalesLineChart',
    components: { LineChart, ChartFilters },
    setup() {
        const store = useStore();

        const loadingState = computed(
            () => store.getters['chartData/isLoading']
        );
        const salesData = computed(() => store.state.chartData.salesData);
        const filteredChartData = computed(
            () => store.getters['chartData/salesChartData']
        );

        store.dispatch('chartData/fetchSalesData');

        const handleFilterChange = (maxSales: number | null) => {
            store.dispatch('chartData/applySalesFilter', maxSales);
        };

        return {
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
            loadingState,
            salesData,
            filteredChartData,
            handleFilterChange,
        };
    },
});
</script>

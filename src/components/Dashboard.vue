<template>
    <div class="dashboard">
        <SalesLineChart />
        <ExpensesBarChart />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SalesLineChart from './LineChart.vue';
import ExpensesBarChart from './BarChart.vue';

export default defineComponent({
    name: 'Dashboard',
    components: { SalesLineChart, ExpensesBarChart },
});
</script>

<style scoped>
.dashboard {
    display: flex;
    flex-direction: row;

}
</style>

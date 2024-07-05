<template>
    <div class="filters">
        <label v-if="type === 'line'" for="salesFilter">Filter by Sales:</label>
        <label v-if="type === 'bar'" for="amountFilter"
            >Filter by Amount:</label
        >
        <select
            v-if="type === 'line'"
            id="salesFilter"
            v-model="selectedMaxSales"
            @change="applyFilter"
        >
            <option
                v-for="maxSales in maxSalesOptions"
                :key="maxSales"
                :value="maxSales"
            >
                ≤ {{ maxSales }}
            </option>
        </select>
        <select
            v-if="type === 'bar'"
            id="amountFilter"
            v-model="selectedMaxAmount"
            @change="applyFilter"
        >
            <option
                v-for="maxAmount in maxAmountOptions"
                :key="maxAmount"
                :value="maxAmount"
            >
                ≤ {{ maxAmount }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'ChartFilters',
    props: {
        type: {
            type: String,
            required: true,
        },
        data: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            selectedMaxSales: null,
            selectedMaxAmount: null,
            maxSalesOptions: [150, 180, 200, 230, 250],
            maxAmountOptions: [500, 1000, 1500, 3000],
        };
    },
    methods: {
        applyFilter() {
            if (this.type === 'line') {
                this.$emit('filter-change', this.selectedMaxSales);
            } else if (this.type === 'bar') {
                this.$emit('filter-change', this.selectedMaxAmount);
            }
        },
    },
};
</script>

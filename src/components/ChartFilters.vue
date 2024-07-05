<template>
    <div class="filters">
        <label :for="filterId">{{ filterLabel }}</label>
        <select :id="filterId" v-model="selectedValue" @change="applyFilter">
            <option
                v-for="option in filterOptions"
                :key="option"
                :value="option"
            >
                ≤ {{ option }}
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
            validator: (value) => ['line', 'bar'].includes(value),
        },
        data: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            selectedValue: null,
            filterId: '',
            filterLabel: '',
            filterOptions: [],
        };
    },
    computed: {
        maxSalesOptions() {
            return [150, 180, 200, 230, 250];
        },
        maxAmountOptions() {
            return [500, 1000, 1500, 3000];
        },
    },
    watch: {
        type(newType) {
            if (newType === 'line') {
                this.filterId = 'salesFilter';
                this.filterLabel = 'Filter by Sales:';
                this.filterOptions = this.maxSalesOptions;
            } else if (newType === 'bar') {
                this.filterId = 'amountFilter';
                this.filterLabel = 'Filter by Amount:';
                this.filterOptions = this.maxAmountOptions;
            }
        },
    },
    methods: {
        applyFilter() {
            this.$emit('filter-change', this.selectedValue);
        },
    },
    mounted() {
        // Initialize filter options based on type
        if (this.type === 'line') {
            this.filterId = 'salesFilter';
            this.filterLabel = 'Filter by Sales:';
            this.filterOptions = this.maxSalesOptions;
        } else if (this.type === 'bar') {
            this.filterId = 'amountFilter';
            this.filterLabel = 'Filter by Amount:';
            this.filterOptions = this.maxAmountOptions;
        }
    },
};
</script>

import { SalesData, ExpenseData, ChartData } from '../../types';
import api from '../../api/chartApi';

interface ChartState {
    loading: boolean;
    salesData: SalesData[];
    expensesData: ExpenseData[];
    filteredSalesChartData: ChartData;
    filteredExpensesChartData: ChartData;
}

const state: ChartState = {
    loading: true,
    salesData: [],
    expensesData: [],
    filteredSalesChartData: {
        labels: [],
        datasets: [{ label: '', data: [] }],
    },
    filteredExpensesChartData: {
        labels: [],
        datasets: [{ label: '', data: [] }],
    },
};

const getters = {
    salesChartData(state: ChartState): ChartData {
        return state.filteredSalesChartData;
    },
    expensesChartData(state: ChartState): ChartData {
        return state.filteredExpensesChartData;
    },
    isLoading(state: ChartState): boolean {
        return state.loading;
    },
};

const actions = {
    async fetchSalesData({ commit }: any) {
        try {
            const response = await api.getSalesData();
            commit('setSalesData', response);
        } catch (error) {
            console.error('Failed to fetch sales data:', error);
        }
    },
    async fetchExpensesData({ commit }: any) {
        try {
            const response = await api.getExpenseData();
            commit('setExpensesData', response);
        } catch (error) {
            console.error('Failed to fetch expenses data:', error);
        }
    },
    applySalesFilter({ commit, state }: any, maxSales: number | null) {
        const filteredData = state.salesData.filter(
            (item: SalesData) => maxSales === null || item.sales <= maxSales
        );
        const chartData: ChartData = {
            labels: filteredData.map((item: any) => item.month),
            datasets: [
                {
                    label: 'Sales',
                    data: filteredData.map((item: any) => item.sales),
                },
            ],
        };
        commit('setFilteredSalesChartData', chartData);
    },
    applyExpensesFilter({ commit, state }: any, maxAmount: number | null) {
        const filteredData = state.expensesData.filter(
            (item: ExpenseData) =>
                maxAmount === null || item.amount <= maxAmount
        );
        const chartData: ChartData = {
            labels: filteredData.map((item: any) => item.category),
            datasets: [
                {
                    label: 'Expenses',
                    data: filteredData.map((item: any) => item.amount),
                },
            ],
        };
        commit('setFilteredExpensesChartData', chartData);
    },
};

const mutations = {
    setSalesData(state: ChartState, salesData: SalesData[]) {
        state.salesData = salesData;
        state.filteredSalesChartData.labels = salesData.map(
            (item) => item.month
        );
        state.filteredSalesChartData.datasets[0].data = salesData.map(
            (item) => item.sales
        );
        state.loading = false;
    },
    setExpensesData(state: ChartState, expensesData: ExpenseData[]) {
        state.expensesData = expensesData;
        state.filteredExpensesChartData.labels = expensesData.map(
            (item) => item.category
        );
        state.filteredExpensesChartData.datasets[0].data = expensesData.map(
            (item) => item.amount
        );
        state.loading = false;
    },
    setFilteredSalesChartData(state: ChartState, chartData: ChartData) {
        state.filteredSalesChartData = chartData;
    },
    setFilteredExpensesChartData(state: ChartState, chartData: ChartData) {
        state.filteredExpensesChartData = chartData;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};

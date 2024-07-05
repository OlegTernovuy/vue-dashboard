import { ref } from 'vue';
import { ChartData, SalesData, ExpenseData } from '../types';
import api from '../api/chartApi';

type ChartDataType = SalesData[] | ExpenseData[];

export const useChartData = (type: 'sales' | 'expenses') => {
    const loadingState = ref(true);
    const data = ref<ChartDataType>([]);

    const defaultChartData: ChartData = {
        labels: [],
        datasets: [
            {
                label: type === 'sales' ? 'Sales' : 'Expenses',
                data: [],
            },
        ],
    };

    const filteredChartData = ref<ChartData | null>(null);

    const fetchData = async () => {
        try {
            if (type === 'sales') {
                data.value = await api.getSalesData();
            } else {
                data.value = await api.getExpenseData();
            }

            defaultChartData.labels = data.value.map((item) =>
                type === 'sales'
                    ? (item as SalesData).month
                    : (item as ExpenseData).category
            );

            defaultChartData.datasets[0].data = data.value.map((item) =>
                type === 'sales'
                    ? (item as SalesData).sales
                    : (item as ExpenseData).amount
            );

            filteredChartData.value = { ...defaultChartData };
            loadingState.value = false;
        } catch (error) {
            console.error(`Failed to fetch ${type} data:`, error);
            loadingState.value = false;
        }
    };

    return {
        loadingState,
        data,
        defaultChartData,
        filteredChartData,
        fetchData,
    };
};

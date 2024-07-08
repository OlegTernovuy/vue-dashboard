import { createStore } from 'vuex';
import chartData from './modules/chartData';

export default createStore({
    modules: {
        chartData,
    },
});

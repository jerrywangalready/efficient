import {createStore} from 'vuex'

export default createStore({
    strict: true,
    state: {
        user: {},
        token: ""
    },
    getters: {
        user: state => {
            return state.user;
        },
        token: state => {
            return state.token;
        }
    },
    mutations: {
        user(state, user) {
            state.user = user;
        },
        token(state, token) {
            state.token = token;
        }

    },
    actions: {
        // syncReducePrice(context, num) {
        //     setTimeout(function () {
        //         context.commit('reducePrice', num)
        //     }, 3000);
        // }
    },
    modules: {}
})

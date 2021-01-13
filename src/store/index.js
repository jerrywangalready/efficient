import {createStore} from 'vuex'

export default createStore({
    strict: true,
    state: {
        products: [
            {name: "a", price: 200},
            {name: "b", price: 120},
            {name: "c", price: 100},
            {name: "d", price: 20}
        ],
        token: {
        }
    },
    getters: {
        saleProducts: state => {
            return state.products.map(
                product => {
                    return {
                        name: "**" + product.name + "**",
                        price: product.price / 2
                    };
                });
        },
        token: state => {
            return state.token;
        }
    },
    mutations: {
        reducePrice(state, num) {
            state.products.forEach(product => {
                product.price -= num;
            })
        },
        login(state, userInfo) {
            state.token = userInfo;
        }

    },
    actions: {
        syncReducePrice(context, num) {
            setTimeout(function () {
                context.commit('reducePrice', num)
            }, 3000);
        }
    },
    modules: {}
})

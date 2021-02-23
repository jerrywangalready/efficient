// plugins/i18n.js
export default {
    install: (app, options) => {
        console.log(app);
        // app.config.globalProperties.$translate = (key) => {
        //     return key.split('.')
        //         .reduce((o, i) => { if (o) return o[i] }, options)
        // }
        //
        // app.provide('i18n', options)
        //
        // app.directive('my-directive', {
        //     mounted (el, binding, vnode, oldVnode) {
        //         // some logic ...
        //     }
        // })
        //
        // app.mixin({
        //     created() {
        //         // some logic ...
        //     }
        // })
        //
        // app.prototype.showMessage = value => {
        //     console.log(value);
        // }
    }
}
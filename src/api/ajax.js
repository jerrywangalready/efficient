// plugins/i18n.js
export default {
    install: (app, options) => {
        // Plugin code goes here
        app.config.globalProperties.$translate = key => {
            return key.split('.').reduce((o, i) => {
                if (o) return o[i]
            }, options)
        }
    }
}
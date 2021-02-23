import merge from 'webpack-merge'
import config from '../../vue.config'
import plugin from '../api/plugin'

module.exports = merge(config, {
    plugins: [
        plugin
    ]
})
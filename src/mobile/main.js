import FastClick from 'fastclick'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

import Vue from 'vue'
import App from './app'

new Vue({...App}).$mount('#app')
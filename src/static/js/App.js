var Login = window.Login = window.Login || {}
var Recovery = window.Recovery = window.Recovery || {}
var ErrorPage = window.ErrorPage = window.ErrorPage || {}
var Home = window.Home = window.Home || {}
var Dashboard = window.Dashboard = window.Dashboard || {}

const isLoggedIn = document.cookie.split('; ').find(row => row.startsWith('auth='))
const hasRecoveryCode = new URLSearchParams(window.location.hash.split('?')[1]).get('recovery_code') !== null

m.route(document.body, '/', {
    '/': {
        view() {
            return !isLoggedIn ? m.route.set('/login') : m(Dashboard)
        }
    },
    '/login': {
        view() {
            return isLoggedIn ? m.route.set('/') : m(Login)
        }
    },
    '/recovery': {
        view() {
            return (isLoggedIn || hasRecoveryCode) ? m(Recovery) : m.route.set('/')
        }
    },
    '/error': {
        view() {
            return m(ErrorPage)
        }
    }
})

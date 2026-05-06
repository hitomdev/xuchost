window.Login = window.Login || {}
window.Recovery = window.Recovery || {}
window.ErrorPage = window.ErrorPage || {}
window.Home = window.Home || {}
window.Dashboard = window.Dashboard || {}

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

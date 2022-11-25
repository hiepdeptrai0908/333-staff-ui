import configRoutes from '~/config/routes'
import Home from '~/components/pages/Home'
import User from '~/components/pages/User'
import Time from '~/components/pages/Time'
import Info from '~/components/pages/Info'
import RegisterUser from '~/components/pages/RegisterUser'
import { AdminLayout } from '~/components/Layouts'

const publicRoutes = [
    { path: configRoutes.home, component: Home },
    { path: configRoutes.user, component: User, layout: AdminLayout },
    { path: configRoutes.time, component: Time, layout: AdminLayout },
    { path: configRoutes.info, component: Info, layout: AdminLayout },
    { path: configRoutes.register, component: RegisterUser, layout: AdminLayout },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }

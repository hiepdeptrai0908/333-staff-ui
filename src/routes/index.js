import configRoutes from '~/config/routes'
import Home from '~/components/pages/Home'
import Admin from '~/components/pages/Admin'
import Info from '~/components/pages/Info'
import { AdminLayout } from '~/components/Layouts'

const publicRoutes = [
    { path: configRoutes.home, component: Home },
    { path: configRoutes.admin, component: Admin, layout: AdminLayout },
    { path: configRoutes.info, component: Info, layout: AdminLayout },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }

import configRoutes from '~/config/routes'
import Home from '~/components/pages/Home'
import User from '~/components/pages/User'
import { Time, TimeDownload } from '~/components/pages/Time'
import EditTime from '~/components/pages/EditTime'
import Info from '~/components/pages/Info'
import RegisterUser from '~/components/pages/RegisterUser'
import { AdminLayout, DownloafLayout } from '~/components/Layouts'

const publicRoutes = [
    { path: configRoutes.home, component: Home },
    { path: configRoutes.user, component: User, layout: AdminLayout },
    { path: configRoutes.time, component: Time, layout: AdminLayout },
    { path: configRoutes.editTime, component: EditTime, layout: AdminLayout },
    { path: configRoutes.download, component: TimeDownload, layout: DownloafLayout },
    { path: configRoutes.info, component: Info, layout: AdminLayout },
    { path: configRoutes.register, component: RegisterUser, layout: AdminLayout },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }

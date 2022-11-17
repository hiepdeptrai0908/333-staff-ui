import classname from 'classnames/bind'

import styles from './AdminLayout.module.scss'
import { Header, Sidebar } from '~/components/Layouts/components'

const cx = classname.bind(styles)

function AdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    )
}

export default AdminLayout

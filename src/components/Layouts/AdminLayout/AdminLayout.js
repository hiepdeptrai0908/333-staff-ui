import classname from 'classnames/bind'

import styles from './AdminLayout.module.scss'
import { Sidebar } from '~/components/Layouts/components'

const cx = classname.bind(styles)

function AdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('content')}>{children}</div>
        </div>
    )
}

export default AdminLayout

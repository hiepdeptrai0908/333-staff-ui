import classname from 'classnames/bind'

import styles from './DefaultLayout.module.scss'
import { Header } from '~/components/Layouts/components'

const cx = classname.bind(styles)

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    )
}

export default DefaultLayout

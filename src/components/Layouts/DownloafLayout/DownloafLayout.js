import classname from 'classnames/bind'

import styles from './DownloafLayout.module.scss'
import { Header } from '~/components/Layouts/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import configRoutes from '~/config/routes'

const cx = classname.bind(styles)

function DownloafLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Link to={configRoutes.time} className={cx('back-btn')}>
                <FontAwesomeIcon className={cx('back-icon')} icon={faRotateLeft} />
                <div>Quay lại</div>
            </Link>
        </div>
    )
}

export default DownloafLayout

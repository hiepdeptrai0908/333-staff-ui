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
            <div className={cx('back-btn')} style={{ backgroundColor: 'red' }}>
                <FontAwesomeIcon className={cx('back-icon')} icon={faRotateLeft} />
                <Link to={configRoutes.time}>Quay lại</Link>
            </div>
        </div>
    )
}

export default DownloafLayout

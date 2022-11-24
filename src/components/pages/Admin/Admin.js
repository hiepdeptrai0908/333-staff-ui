import className from 'classnames/bind'
import styles from './Admin.module.scss'

const cx = className.bind(styles)

function Admin() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}></div>
            <div className={cx('content')}>Danh sách nhân viên</div>
        </div>
    )
}

export default Admin

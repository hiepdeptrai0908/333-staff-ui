import className from 'classnames/bind'
import styles from './User.module.scss'

const cx = className.bind(styles)

function User() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}></div>
            <div className={cx('content')}>Danh sách nhân viên</div>
        </div>
    )
}

export default User

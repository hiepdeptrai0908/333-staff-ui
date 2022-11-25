import className from 'classnames/bind'
import styles from './Time.module.scss'

const cx = className.bind(styles)

function Time() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}></div>
            <div className={cx('content')}>Giờ làm</div>
        </div>
    )
}

export default Time

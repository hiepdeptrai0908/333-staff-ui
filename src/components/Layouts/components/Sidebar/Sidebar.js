import classname from 'classnames/bind'
import styles from './Sidebar.module.scss'

const cx = classname.bind(styles)

function Sidebar() {
    return <div className={cx('wrapper')}>Sidebar</div>
}

export default Sidebar

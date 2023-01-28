import classname from 'classnames/bind'
import styles from './Sidebar.module.scss'
import { Link, NavLink } from 'react-router-dom'

import configRoutes from '~/config/routes'
import images from '~/assets/images'

const cx = classname.bind(styles)

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <Link to={configRoutes.home} className={cx('logo-box')}>
                <img className={cx('logo-img')} src={images.logo} alt="logo" />
            </Link>
            <div className={cx('items')}>
                <NavLink
                    className={cx('item')}
                    style={({ isActive }) =>
                        isActive
                            ? { color: '#fff', backgroundColor: '#333' }
                            : { color: '#333', backgroundColor: '#fff' }
                    }
                    to={configRoutes.time}
                >
                    Quản lý thời gian
                </NavLink>
                <NavLink
                    className={cx('item')}
                    style={({ isActive }) =>
                        isActive
                            ? { color: '#fff', backgroundColor: '#333' }
                            : { color: '#333', backgroundColor: '#fff' }
                    }
                    to={configRoutes.user}
                >
                    Quản lý nhân viên
                </NavLink>
                <NavLink
                    className={cx('item')}
                    style={({ isActive }) =>
                        isActive
                            ? { color: '#fff', backgroundColor: '#333' }
                            : { color: '#333', backgroundColor: '#fff' }
                    }
                    to={configRoutes.register}
                >
                    Tạo tài khoản
                </NavLink>
                <NavLink
                    className={cx('item')}
                    style={({ isActive }) =>
                        isActive
                            ? { color: '#fff', backgroundColor: '#333' }
                            : { color: '#333', backgroundColor: '#fff' }
                    }
                    to={configRoutes.download}
                >
                    Download Layout
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar

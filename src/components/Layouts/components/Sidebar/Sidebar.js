import classname from 'classnames/bind'
import styles from './Sidebar.module.scss'
import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

import configRoutes from '~/config/routes'
import images from '~/assets/images'

const cx = classname.bind(styles)

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo-box')}>
                <Link to={configRoutes.home}>
                    <img className={cx('logo-img')} src={images.logo} alt="logo" />
                </Link>
            </div>
            <div className={cx('items')}>
                <NavLink to={configRoutes.user}>
                    <button className={cx('item')}>Quản lý nhân viên</button>
                </NavLink>
                <NavLink to={configRoutes.time}>
                    <button className={cx('item')}>Quản lý giờ làm</button>
                </NavLink>
                <NavLink to={configRoutes.register}>
                    <button className={cx('item')}>Tạo tài khoản</button>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar

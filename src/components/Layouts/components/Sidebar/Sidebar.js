import classname from 'classnames/bind'
import styles from './Sidebar.module.scss'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import configRoutes from '~/config/routes'
import images from '~/assets/images'

const cx = classname.bind(styles)

function Sidebar() {
    const [className, setClassName] = useState(cx('item'))
    const [isActive, setIsActive] = useState(false)

    const handleClick = () => {
        // ...
    }

    useEffect(() => {
        const itemElement = document.querySelectorAll('.Sidebar_item__n0BXY')
        itemElement.forEach((item) => {
            item.onclick = () => {
                itemElement.forEach((item) => {
                    !(item.classList === cx('item', 'active')) && item.classList.remove(cx('active'))
                })
                item.classList.add(cx('active'))
            }
        })
    })

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo-box')}>
                <Link to={configRoutes.home}>
                    <img className={cx('logo-img')} src={images.logo} alt="logo" />
                </Link>
            </div>
            <div className={cx('items')}>
                <button className={cx('item', 'active') || className} onClick={handleClick}>
                    Quản lý nhân viên
                </button>
                <button className={className} onClick={handleClick}>
                    Quản lý giờ làm
                </button>
                <button className={className} onClick={handleClick}>
                    Tạo tài khoản
                </button>
            </div>
        </div>
    )
}

export default Sidebar

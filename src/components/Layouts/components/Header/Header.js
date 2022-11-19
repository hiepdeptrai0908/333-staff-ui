import classname from 'classnames/bind'
import styles from './Header.module.scss'
import images from '~/assets/images'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import configRoutes from '~/config/routes'
import { useEffect, useState } from 'react'

const cx = classname.bind(styles)

function Header() {
    const nextBtnClass = 'out-right'
    const [userName, setUserName] = useState('')
    const [outRightClass, setOutRightClass] = useState(undefined)
    useEffect(() => {
        setUserName('Triệu Quang Hiệp')
    })
    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo-box')}>
                <Link to={configRoutes.home}>
                    <img className={cx('logo-img')} src={images.logo} alt="logo" />
                </Link>
            </div>
            <div className={cx('search')}>
                <input className={cx('search-input')} type="text" placeholder="Nhập mã số nhân viên..." />
                <FontAwesomeIcon
                    className={cx('search-icon', outRightClass)}
                    onClick={() => {
                        setOutRightClass(nextBtnClass)
                        setTimeout(() => {
                            setOutRightClass(undefined)
                        }, 1500)
                    }}
                    icon={faArrowCircleRight}
                />
            </div>
            {userName ? (
                <div className={cx('staff-name')}>
                    Xin chào : <span>{userName}</span>
                </div>
            ) : (
                <></>
            )}
            <Link to={configRoutes.admin}>
                <button className={cx('manage-btn')}>管理</button>
            </Link>
        </header>
    )
}
export default Header

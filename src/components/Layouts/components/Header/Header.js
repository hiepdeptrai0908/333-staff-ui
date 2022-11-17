import classname from 'classnames/bind'
import styles from './Header.module.scss'
import images from '~/assets/images'

import { Link } from 'react-router-dom'

import configRoutes from '~/config/routes'
import Search from '~/components/Search'

const cx = classname.bind(styles)

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo-box')}>
                <Link to={configRoutes.home}>
                    <img className={cx('logo-img')} src={images.logo} alt="logo" />
                </Link>
            </div>
            <Search />

            <Link to={configRoutes.time}>
                <button className={cx('manage-btn')}>管理</button>
            </Link>
        </header>
    )
}
export default Header

import classname from 'classnames/bind'
import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'

import styles from './Header.module.scss'
import images from '~/assets/images'

import configRoutes from '~/config/routes'
import Search from '~/components/Search'

const cx = classname.bind(styles)

function Header() {
    const [backgroundLink, setBackgroundLink] = useState(localStorage.getItem('bg') || 'goldBg')
    const btnBgGruop = useRef()

    const htmlEl = document.getElementsByTagName('html')[0]
    htmlEl.style.backgroundImage = `url('${images[backgroundLink]}')`

    const handleTongleBtn = () => {
        console.log(btnBgGruop.current)
        if (btnBgGruop.current.style.display === 'flex') {
            return (btnBgGruop.current.style.display = 'none')
        }
        btnBgGruop.current.style.display = 'flex'
    }

    const handleChangeBg = (e) => {
        const nameBtn = e.target.name || 'goldBg'

        if (nameBtn) {
            localStorage.setItem('bg', nameBtn)
            setBackgroundLink(nameBtn)
        }
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo-box')}>
                <img className={cx('logo-img')} src={images.logo} alt="logo" onClick={handleTongleBtn} />
                <div className={cx('bg-group')} ref={btnBgGruop}>
                    <button className={cx('bg-item', 'bg-item--a')} name="newYearBg1" onClick={handleChangeBg}>
                        Tết 1
                    </button>
                    <button className={cx('bg-item', 'bg-item--b')} name="newYearBg2" onClick={handleChangeBg}>
                        Tết 2
                    </button>
                    <button className={cx('bg-item', 'bg-item--c')} name="goldBg" onClick={handleChangeBg}>
                        Gold
                    </button>
                    <button className={cx('bg-item', 'bg-item--d')} name="snowBg" onClick={handleChangeBg}>
                        Tuyết
                    </button>
                </div>
            </div>
            <Search />

            <Link to={configRoutes.time}>
                <button className={cx('manage-btn')}>管理</button>
            </Link>
        </header>
    )
}
export default Header

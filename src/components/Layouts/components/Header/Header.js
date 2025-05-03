import classname from 'classnames/bind'
import { Link } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react'

import styles from './Header.module.scss'
import images from '~/assets/images'

import configRoutes from '~/config/routes'
import Search from '~/components/Search'

const cx = classname.bind(styles)

function Header() {
    const [backgroundLink, setBackgroundLink] = useState(localStorage.getItem('bg') || 'bg9')
    const [arrayImages, setArrayImages] = useState([])

    // Lấy key trong images
    useEffect(() => {
        Object.keys(images).forEach((key) => setArrayImages((prev) => [...prev, key]))
    }, [])
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
            <div
                className={cx('logo-box')}
                style={{ backgroundImage: `url('${images[backgroundLink]}')`, objectFit: 'cover' }}
            >
                <img className={cx('logo-img')} src={images.logo} alt="logo" onClick={handleTongleBtn} />
                <div className={cx('bg-group')} ref={btnBgGruop}>
                    {arrayImages.map((key, index) => {
                        return (
                            key !== 'logo' &&
                            key !== 'noData' && (
                                <React.Fragment key={key}>
                                    <button
                                        className={cx('bg-item')}
                                        name={key}
                                        style={{ backgroundImage: `url('${images[key]}')` }}
                                        onClick={handleChangeBg}
                                    ></button>
                                </React.Fragment>
                            )
                        )
                    })}
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

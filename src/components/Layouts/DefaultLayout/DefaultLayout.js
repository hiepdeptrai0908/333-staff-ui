import { useState } from 'react'

import classname from 'classnames/bind'

import styles from './DefaultLayout.module.scss'
import { Header } from '~/components/Layouts/components'
import UserContext from '~/context/UserContext'

const cx = classname.bind(styles)

function DefaultLayout({ children }) {
    const [userInfo, setUserInfo] = useState()
    const contextValues = { userInfo, setUserInfo }

    return (
        <div className={cx('wrapper')}>
            <UserContext.Provider value={contextValues}>
                <Header />
                <div className={cx('container')}>
                    <div className={cx('content')}>{children}</div>
                </div>
            </UserContext.Provider>
        </div>
    )
}

export default DefaultLayout

import { useState } from 'react'
import classname from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
import { Header } from '~/components/Layouts/components'
import { UserContext, LoadingContext } from '~/context/UserContext' // cập nhật import

const cx = classname.bind(styles)

function DefaultLayout({ children }) {
    const [userInfo, setUserInfo] = useState()
    const [loading, setLoading] = useState(false)

    const userContextValues = { userInfo, setUserInfo }
    const loadingContextValues = { loading, setLoading }

    return (
        <div className={cx('wrapper')}>
            <UserContext.Provider value={userContextValues}>
                <LoadingContext.Provider value={loadingContextValues}>
                    <Header />
                    <div className={cx('container')}>
                        <div className={cx('content')}>{children}</div>
                    </div>
                </LoadingContext.Provider>
            </UserContext.Provider>
        </div>
    )
}

export default DefaultLayout

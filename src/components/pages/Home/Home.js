import classname from 'classnames/bind'
import { useEffect, useState } from 'react'
import styles from './Home.module.scss'
import Clock from '~/components/Clock'
import { userInfo } from '~/components/Search/Search'
import { ToastContainer, toast } from 'react-toastify'
import { baseURL } from '~/utils'
export { userInfo } from '~/components/Search/Search'

const cx = classname.bind(styles)
function Home() {
    const btnTitles = ['出勤', '退勤', '休憩開始', '休憩終了']

    const idBtn = ['time-in', 'time-out', 'break-in', 'break-out']

    const handleOnclick = (e) => {
        if (!userInfo) {
            const toastMessage = toast.warning('Bạn chưa nhập mã số nhân viên !', {
                position: toast.POSITION.TOP_RIGHT,
            })
            return toastMessage
        }
        fetch(baseURL + e.target.id, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        })
            .then((response) => response.json())
            .then((data) => {
                const title = data.title
                const status = data.status
                toast[status](title, {
                    position: toast.POSITION.TOP_RIGHT,
                })
            })
            .catch((error) => {
                console.error('Error:', error)
            })
        // if (userInfo) {
        //     setData(userInfo)
        //     setHasUser(true)
        //     toast.success(`${userInfo.fullname} check in thành công`, {
        //         position: toast.POSITION.TOP_RIGHT,
        //     })
        // } else {
        //     setData({})
        //     setHasUser(false)
        //     toast.warning('Bạn chưa đăng nhập !', {
        //         position: toast.POSITION.TOP_RIGHT,
        //     })
        // }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('actions')}>
                {btnTitles.map((btnTitle, index) => {
                    return (
                        <button
                            id={idBtn[index]}
                            className={cx('action-btn')}
                            onClick={(event) => handleOnclick(event)}
                            key={index}
                        >
                            {btnTitle}
                        </button>
                    )
                })}
            </div>
            <ToastContainer />
            <Clock />
        </div>
    )
}

export default Home

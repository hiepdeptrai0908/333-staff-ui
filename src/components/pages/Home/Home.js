import classname from 'classnames/bind'
import styles from './Home.module.scss'
import Clock from '~/components/Clock'
import { userInfo } from '~/components/Search/Search'
import { ToastContainer, toast } from 'react-toastify'
import { baseURL } from '~/utils'
export { userInfo } from '~/components/Search/Search'

const cx = classname.bind(styles)
function Home() {
    const date = new Date(Date.now())
    let year = String(date.getFullYear())
    let month = String(date.getMonth() + 1)
    let day = String(date.getDate())

    if (month.length < 2) {
        month = '0' + month
    }
    if (day.length < 2) {
        day = '0' + day
    }

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
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('actions')}>
                <div className={cx('today')}>
                    {year}
                    <span>年</span>
                    {month}
                    <span>月</span>
                    {day}
                    <span>日</span>
                </div>
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

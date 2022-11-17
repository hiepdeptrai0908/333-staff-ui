import classname from 'classnames/bind'
import { useEffect, useState } from 'react'
import styles from './Clock.module.scss'

const cx = classname.bind(styles)

function Clock() {
    const [hours, setHours] = useState('00')
    const [minute, setMinute] = useState('00')
    const [second, setSecond] = useState('00')

    useEffect(() => {
        function Dong_ho() {
            var hoursNow = new Date().getHours()
            var minuteNow = new Date().getMinutes()
            var secondNow = new Date().getSeconds()
            if (hoursNow < 10) {
                hoursNow = '0' + hoursNow
            }
            if (minuteNow < 10) {
                minuteNow = '0' + minuteNow
            }
            if (secondNow < 10) {
                secondNow = '0' + secondNow
            }
            setHours(hoursNow)
            setMinute(minuteNow)
            setSecond(secondNow)
        }
        setInterval(Dong_ho, 1000)
    }, [second])
    return (
        <div className={cx('clock')}>
            <div className={cx('title')}>Thời gian bây giờ là:</div>
            <div className={cx('time')}>
                <div className={cx('time-items')}>
                    <div className={cx('time-item', 'time-hours')}>{hours}</div>
                    <div className={cx('time-item-title')}>Giờ</div>
                </div>
                <div className={cx('time-items')}>
                    <div className={cx('time-item', 'time-minute')}>{minute}</div>
                    <div className={cx('time-item-title')}>Phút</div>
                </div>
                <div className={cx('time-items')}>
                    <div className={cx('time-item', 'time-second')}>{second}</div>
                    <div className={cx('time-item-title', 'title-second')}>Giây</div>
                </div>
            </div>
        </div>
    )
}

export default Clock

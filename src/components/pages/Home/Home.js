import classname from 'classnames/bind'
import { useState } from 'react'
import styles from './Home.module.scss'
import Clock from '~/components/Clock'

const cx = classname.bind(styles)
function Home() {
    const [data, setData] = useState({})
    console.log(data.type === 'error')

    const handleOnclick = () => {
        setData({ type: 'error' })
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('actions')}>
                <button className={cx('action-btn')} onClick={handleOnclick}>
                    出勤
                </button>
                <button className={cx('action-btn')} onClick={handleOnclick}>
                    退勤
                </button>
                <button className={cx('action-btn')} onClick={handleOnclick}>
                    休憩開始
                </button>
                <button className={cx('action-btn')} onClick={handleOnclick}>
                    休憩終了
                </button>
            </div>
            <Clock />
        </div>
    )
}

export default Home

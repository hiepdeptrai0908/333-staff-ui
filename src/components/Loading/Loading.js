import classNames from 'classnames/bind'
import styles from './Loading.module.scss'

const cx = classNames.bind(styles)

function Loading({ loading }) {
    return (
        <div className={cx('ring')}>
            Loading
            <span className={cx('ring-span')}></span>
        </div>
    )
}

export default Loading

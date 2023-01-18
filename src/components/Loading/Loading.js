import classNames from 'classnames/bind'
import styles from './Loading.module.scss'

const cx = classNames.bind(styles)

function Loading({ loading }) {
    return (
        <div className={cx('lds-facebook')}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Loading

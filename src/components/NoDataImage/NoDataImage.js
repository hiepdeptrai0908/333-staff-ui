import classNames from 'classnames/bind'
import styles from './NoDataImage.module.scss'
import images from '~/assets/images'

const cx = classNames.bind(styles)

function NoDataImage() {
    return (
        <div className={cx('no-data')}>
            <img className={cx('no-data-img')} src={images.noData} alt="no data" />
        </div>
    )
}

export default NoDataImage

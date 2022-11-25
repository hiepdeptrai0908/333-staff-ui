import className from 'classnames/bind'
import styles from './RegisterUser.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faUserPlus,
    faCakeCandles,
    faMarsAndVenus,
    faMobileScreenButton,
    faEnvelope,
    faHouseUser,
    faSignsPost,
    faKey,
} from '@fortawesome/free-solid-svg-icons'
import { faKeycdn } from '@fortawesome/free-brands-svg-icons'

const cx = className.bind(styles)

function RegisterUser() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>Tạo tài khoản mới</div>
            <div className={cx('container')}>
                <div className={cx('box')}>
                    <div className={cx('box-item')}>
                        <div className={cx('tilte')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faUser} /> <span>Họ và tên</span>
                        </div>
                        <input type="text" className={cx('fullname-input')} required autoComplete="off" />
                    </div>
                    <div className={cx('staffid')}>
                        <div className={cx('tilte')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faUserPlus} />
                            <span>Mã nhân viên</span>
                        </div>
                        <input
                            type="number"
                            className={cx('staff-id-input')}
                            required
                            maxLength={3}
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div className={cx('box')}>
                    <div className={cx('box-item')}>
                        <div className={cx('tilte')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faCakeCandles} /> <span>Ngày sinh</span>
                        </div>
                        <input type="date" className={cx('birthday-input')} required autoComplete="off" />
                    </div>
                    <div className={cx('staffid')}>
                        <div className={cx('tilte')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faMarsAndVenus} />
                            <span>Giới tính</span>
                        </div>
                        <select name="sex" className={cx('sex-input')} required>
                            <optgroup label="-- Chọn giới tính --">
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </optgroup>
                        </select>
                    </div>
                </div>

                <div className={cx('box')}>
                    <div className={cx('box-item')}>
                        <div className={cx('tilte')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faMobileScreenButton} />{' '}
                            <span>Số điện thoại</span>
                        </div>
                        <input type="text" className={cx('phone-input')} required autoComplete="off" />
                    </div>
                    <div className={cx('staffid')}>
                        <div className={cx('tilte')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faEnvelope} />
                            <span>Email</span>
                        </div>
                        <input type="email" className={cx('email-input')} required autoComplete="off" />
                    </div>
                </div>

                <div className={cx('box', 'address')}>
                    <div className={cx('tilte')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faHouseUser} /> <span>Địa chỉ</span>
                    </div>
                    <div className={cx('box-item', 'address-item')}>
                        <div className={cx('post')}>
                            <div className={cx('tilte', 'post-code')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faSignsPost} />
                                郵便番号:
                            </div>
                            <input
                                type="number"
                                className={cx('post-input')}
                                maxLength={7}
                                minLength={7}
                                autoComplete="off"
                            />
                        </div>
                        <button className={cx('search-btn')}>検索</button>
                    </div>
                </div>
                <input className={cx('address-value')} type="text" autoComplete="off" />

                <div className={cx('box', 'account')}>
                    <div className={cx('box-item')}>
                        <div className={cx('tilte')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faUser} /> <span>Tài khoản</span>
                        </div>
                        <input type="text" className={cx('password-input')} required autoComplete="off" />
                    </div>
                    <div className={cx('staffid')}>
                        <div className={cx('tilte')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faKey} />
                            <span>Mật khẩu</span>
                        </div>
                        <input type="text" className={cx('password-input')} required maxLength={6} autoComplete="off" />
                    </div>
                    <div className={cx('staffid')}>
                        <div className={cx('tilte')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faKey} />
                            <span>Nhập lại mật khẩu</span>
                        </div>
                        <input type="text" className={cx('password-input')} required minLength={6} autoComplete="off" />
                    </div>
                </div>

                <button className={cx('register-btn')}>
                    <span>Hoàn tất đăng ký</span>
                </button>
            </div>
        </div>
    )
}

export default RegisterUser

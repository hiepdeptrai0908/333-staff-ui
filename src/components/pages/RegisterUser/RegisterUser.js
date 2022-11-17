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
import { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import images from '~/assets/images'

import { baseURL } from '~/utils'

const cx = className.bind(styles)

function RegisterUser() {
    const [hasLogin, setHasLogin] = useState(false)
    const [userLogin, setUserLogin] = useState({})
    const [fullnameValue, setFullnameValue] = useState('')
    const [staffIdValue, setStaffIdValue] = useState('')
    const [birthdayValue, setBirthdayValue] = useState('')
    const [sexValue, setSexValue] = useState('Nam')
    const [phoneNumberValue, setPhoneNumberValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [addressValue, setAddressValue] = useState('')
    const [isCheckUser, setIsCheckUser] = useState(false)
    const [isCheckStaffId, setIsCheckStaffId] = useState(false)
    const [usernameValue, setUserNameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [retypePasswordValue, setRetypePasswordValue] = useState('')

    const fullnameRef = useRef()
    const staffIdRef = useRef()
    const birthdayRef = useRef()
    const sexRef = useRef()
    const phoneNumberRef = useRef()
    const emailRef = useRef()
    const zipcodeRef = useRef()
    const addressRef = useRef()
    const userNameRef = useRef()
    const passwordRef = useRef()
    const retypePasswordRef = useRef()
    const registerTextRef = useRef()

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const today = year + '-' + month + '-' + day

    const datas = {
        fullname: fullnameValue,
        staff_id: staffIdValue,
        birthday: birthdayValue,
        sex: sexValue,
        phone_number: phoneNumberValue,
        email: emailValue,
        address: addressValue,
        username: usernameValue,
        password: passwordValue,
        create_at: today,
        create_user: userLogin.fullname,
    }
    console.log(userLogin.fullname)
    // get user when change input value
    useEffect(() => {
        const fetchUserApi = fetch(baseURL + 'check-user', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: datas.username }),
        })
        fetchUserApi
            .then((response) => response.json())
            .then((datas) => {
                if (datas === 1) {
                    console.log(datas)
                    setMessageUsername('Tên tài khoản này đã được sử dụng !')
                } else {
                    setMessageUsername('')
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCheckUser])

    useEffect(() => {
        const fetchUserApi = fetch(baseURL + 'check-staff-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ staff_id: datas.staff_id }),
        })
        fetchUserApi
            .then((response) => response.json())
            .then((datas) => {
                if (datas === 1) {
                    console.log(datas)
                    setMessageStaffId('Mã này đã được sử dụng !')
                } else {
                    setMessageStaffId('')
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCheckStaffId])

    const handleSearchZipcode = () => {
        fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcodeRef.current.value}`)
            .then((response) => response.json())
            .then((datas) => datas.results[0])
            .then((results) => {
                setAddressValue(results.address1 + results.address1 + results.address3)
                setMessageAddress('')
            })
            .catch(() => toast.error('Số bưu điện không đúng !'))
    }

    const handleSubmitForm = () => {
        fetch(baseURL + 'register-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datas),
        })
            .then((response) => response.json())
            .then((datas) => {
                setFullnameValue('')
                setStaffIdValue('')
                setBirthdayValue('')
                setSexValue('')
                setPhoneNumberValue('')
                setEmailValue('')
                setAddressValue('')
                setUserNameValue('')
                setPasswordValue('')
                setRetypePasswordValue('')
                zipcodeRef.current.value = ''
                toast('Bạn đã đăng ký thành công !')
            })
    }

    // handle change value input
    const handleChangeFullname = (e) => {
        if (!(e.target.value === '')) {
            setMessageFullname('')
        }
        setFullnameValue(fullnameRef.current.value)
    }
    const handleChangeStaffId = (e) => {
        if (!(e.target.value === '')) {
            setMessageStaffId('')
        }
        setStaffIdValue(staffIdRef.current.value)
    }

    const handleChangeBirthday = (e) => {
        if (!(e.target.value === '')) {
            setMessageBirthday('')
        }
        setBirthdayValue(birthdayRef.current.value)
    }

    const handleChangeSex = (e) => {
        setSexValue(sexRef.current.value)
    }

    const handleChangePhoneNumber = (e) => {
        if (!(e.target.value === '')) {
            setMessagePhoneNumber('')
        }
        setPhoneNumberValue(phoneNumberRef.current.value)
    }

    const handleChangeEmail = (e) => {
        setEmailValue(emailRef.current.value)
    }

    const handleChangeAddress = (e) => {
        if (!(e.target.value === '')) {
            setMessageAddress('')
        }
        setAddressValue(addressRef.current.value)
    }

    const handleChangeUserName = (e) => {
        if (!(e.target.value === '')) {
            setMessageUsername('')
        }
        setUserNameValue(userNameRef.current.value)
        setTimeout(() => {}, 500)
    }

    const handleChangePassword = (e) => {
        if (!(e.target.value === '')) {
            setMessagePassword('')
            setMessageRetypePassword('')
        }
        setPasswordValue(passwordRef.current.value)
    }

    const handleChangeRetypePassword = (e) => {
        setRetypePasswordValue(retypePasswordRef.current.value)
        if (!(e.target.value === '')) {
            setMessagePassword('')
            setMessageRetypePassword('')
        }
    }

    const handleChangeLoginUser = (e) => {
        setLoginUserName(loginUserNameRef.current.value)
    }

    const handleChangeLoginPassword = (e) => {
        setLoginPassword(loginPasswordRef.current.value)
    }

    // Message
    const [mesageFullname, setMessageFullname] = useState('')
    const [mesageStaffId, setMessageStaffId] = useState('')
    const [mesageBirthday, setMessageBirthday] = useState('')
    const [mesagePhoneNumber, setMessagePhoneNumber] = useState('')
    const [mesageAddress, setMessageAddress] = useState('')
    const [mesageUsername, setMessageUsername] = useState('')
    const [mesagePassword, setMessagePassword] = useState('')
    const [mesageRetypePassword, setMessageRetypePassword] = useState('')

    const validate = {
        fullname: function (value) {
            // Không được để trống
            if (value === '' || value === undefined) {
                return setMessageFullname('Trường này không được để trống !')
            }
            return true
        },
        staffId: function (value) {
            // Phải là số và không được để trống
            if (value === '' || value === undefined) {
                return setMessageStaffId('Trường này không được để trống !')
            }
            return true
        },
        birthday: function (value) {
            // Phải là số và không được để trống
            if (value === '' || value === null) {
                return setMessageBirthday('Trường này không được để trống !')
            }
            return true
        },
        phoneNumber: function (value) {
            if (value === '') {
                return setMessagePhoneNumber('Trường này không được để trống !')
            }

            if (value.length < 10 || value.length > 11) {
                return setMessagePhoneNumber('Số điện thoại không đúng !')
            }
            return true
        },
        address: function (value) {
            if (value === '') {
                return setMessageAddress('Trường này không được để trống !')
            }
            return true
        },
        username: function (value) {
            if (value === '') {
                return setMessageUsername('Trường này không được để trống !')
            }

            if (value.indexOf(' ') >= 0) {
                return setMessageUsername('Không được chứa khoảng trắng !')
            }

            return true
        },
        password: function (password, retypePassword, minLength) {
            if (password === '') {
                setMessagePassword('Trường này không được để trống !')
            }

            if (retypePassword === '') {
                return setMessageRetypePassword('Trường này không được để trống !')
            }

            if (password.length < minLength) {
                setPasswordValue('')
                setRetypePasswordValue('')
                passwordRef.current.focus()
                return setMessagePassword(`Mật khẩu tối thiểu phải ${minLength} ký tự !`)
            }

            if (!(password === retypePassword)) {
                setPasswordValue('')
                setRetypePasswordValue('')
                passwordRef.current.focus()
                return setMessageRetypePassword('Nhập lại mật khẩu không chính xác !')
            }
            return true
        },
    }

    const handleValidation = () => {
        registerTextRef.current.classList.add(cx('text-out'))
        setTimeout(() => {
            registerTextRef.current.classList.remove(cx('text-out'))
        }, 400)
        const resultValidate1 = validate.fullname(datas.fullname)
        const resultValidate2 = validate.staffId(datas.staff_id)
        const resultValidate3 = validate.phoneNumber(datas.phone_number)
        const resultValidate4 = validate.address(datas.address)
        const resultValidate5 = validate.username(datas.username)
        const resultValidate6 = validate.password(passwordValue, retypePasswordValue, 8)
        const resultValidate7 = validate.birthday(birthdayValue)
        if (
            resultValidate1 === true &&
            resultValidate2 === true &&
            resultValidate3 === true &&
            resultValidate4 === true &&
            resultValidate5 === true &&
            resultValidate6 === true &&
            resultValidate7 === true
        ) {
            handleSubmitForm()
        } else {
            toast.error('Có lỗi xảy ra. Vui lòng kiểm tra lại thông tin !')
        }
    }

    // Login
    const [loginUserName, setLoginUserName] = useState()
    const [loginPassword, setLoginPassword] = useState()

    const loginUserNameRef = useRef()
    const loginPasswordRef = useRef()

    const loginForm = {
        username: loginUserName,
        password: loginPassword,
    }

    const login = () => {
        fetch(baseURL + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginForm),
        })
            .then((response) => response.json())
            .then((datas) => {
                if (datas[0].username === loginUserName) {
                    toast.success('Bạn đã đăng nhập thành công.')

                    setHasLogin(true)
                    return setUserLogin(datas[0])
                } else {
                    toast.error('Tài khoản hoặc mật khẩu không đúng !')
                    setLoginUserName('')
                    setLoginPassword('')
                    loginUserNameRef.current.focus()

                    setHasLogin(false)
                }
            })
            .catch(() => {
                toast.success('Có lỗi xảy ra, vui lòng liên hệ quản trị viên !')
                setUserLogin({})
                setHasLogin(false)
            })
    }

    const handleKeypress = (e) => {
        if (e.charCode === 13) {
            login()
        }
    }

    let heading = hasLogin ? 'tạo tài khoản mới' : 'Đăng nhập'

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>{heading}</div>
            {hasLogin ? (
                <div className={cx('container')}>
                    <div className={cx('box')}>
                        <div className={cx('box-item')}>
                            <div className={cx('tilte')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser} /> <span>Họ và tên</span>
                                <span className={cx('required')}>*</span>
                                <span className={cx('validate-message')}>{mesageFullname}</span>
                            </div>
                            <input
                                ref={fullnameRef}
                                value={fullnameValue}
                                onChange={handleChangeFullname}
                                type="text"
                                className={cx('fullname-input', 'input')}
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className={cx('staffid')}>
                            <div className={cx('tilte')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faUserPlus} />
                                <span>Mã nhân viên</span>
                                <span className={cx('required')}>*</span>
                                <span className={cx('validate-message')}>{mesageStaffId}</span>
                            </div>
                            <input
                                ref={staffIdRef}
                                value={staffIdValue}
                                onChange={handleChangeStaffId}
                                onKeyUp={() => {
                                    setTimeout(() => setIsCheckStaffId(!isCheckStaffId), 500)
                                }}
                                type="text"
                                className={cx('input')}
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
                                <span className={cx('required')}>*</span>
                                <span className={cx('validate-message')}>{mesageBirthday}</span>
                            </div>
                            <input
                                ref={birthdayRef}
                                value={birthdayValue}
                                onChange={handleChangeBirthday}
                                type="date"
                                className={cx('input')}
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className={cx('staffid')}>
                            <div className={cx('tilte')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faMarsAndVenus} />
                                <span>Giới tính</span>
                            </div>
                            <select ref={sexRef} value={sexValue} onChange={handleChangeSex} className={cx('input')}>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Bê đê">Bê đê</option>
                            </select>
                        </div>
                    </div>

                    <div className={cx('box')}>
                        <div className={cx('phone')}>
                            <div className={cx('tilte')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faMobileScreenButton} />{' '}
                                <span>Số điện thoại</span>
                                <span className={cx('required')}>*</span>
                                <span className={cx('validate-message')}>{mesagePhoneNumber}</span>
                            </div>
                            <input
                                ref={phoneNumberRef}
                                value={phoneNumberValue}
                                onChange={handleChangePhoneNumber}
                                type="text"
                                className={cx('input', 'phone-input')}
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className={cx('email')}>
                            <div className={cx('tilte')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faEnvelope} />
                                <span>Email</span>
                            </div>
                            <input
                                ref={emailRef}
                                value={emailValue}
                                onChange={handleChangeEmail}
                                type="email"
                                className={cx('input', 'email-input')}
                                required
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <div className={cx('box', 'address')}>
                        <div className={cx('tilte')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faHouseUser} />
                            <span>Địa chỉ</span>
                            <span className={cx('required')}>*</span>
                        </div>
                        <div className={cx('box-item', 'address-item')}>
                            <div className={cx('post')}>
                                <div className={cx('tilte', 'post-code')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faSignsPost} />
                                    郵便番号:
                                </div>
                                <input
                                    ref={zipcodeRef}
                                    type="text"
                                    className={cx('input', 'post-input')}
                                    maxLength={7}
                                    autoComplete="off"
                                />
                            </div>
                            <button className={cx('search-btn')} onClick={handleSearchZipcode}>
                                検索
                            </button>
                        </div>
                    </div>
                    <span className={cx('validate-message')}>{mesageAddress}</span>
                    <input
                        ref={addressRef}
                        value={addressValue}
                        onChange={handleChangeAddress}
                        className={cx('input', 'address-value')}
                        type="text"
                        autoComplete="off"
                    />

                    <div className={cx('box', 'account')}>
                        <div className={cx('box-item')}>
                            <div className={cx('tilte')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser} /> <span>Tài khoản</span>
                                <span className={cx('required')}>*</span>
                            </div>
                            <span className={cx('validate-message')}>{mesageUsername}</span>

                            <input
                                ref={userNameRef}
                                value={usernameValue}
                                onChange={handleChangeUserName}
                                onKeyUp={() => {
                                    setTimeout(() => setIsCheckUser(!isCheckUser), 500)
                                }}
                                type="text"
                                className={cx('input', 'password-input')}
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className={cx('staffid')}>
                            <div className={cx('tilte')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faKey} />
                                <span>Mật khẩu</span>
                                <span className={cx('required')}>*</span>
                                <span className={cx('validate-message')}>{mesagePassword}</span>
                            </div>
                            <input
                                ref={passwordRef}
                                value={passwordValue}
                                onChange={handleChangePassword}
                                type="password"
                                className={cx('input', 'password-input')}
                                required
                                minLength={6}
                                autoComplete="off"
                            />
                        </div>
                        <div className={cx('staffid')}>
                            <div className={cx('tilte')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faKey} />
                                <span>Nhập lại mật khẩu</span>
                                <span className={cx('required')}>*</span>
                                <span className={cx('validate-message')}>{mesageRetypePassword}</span>
                            </div>
                            <input
                                ref={retypePasswordRef}
                                value={retypePasswordValue}
                                onChange={handleChangeRetypePassword}
                                type="password"
                                className={cx('input', 'password-input')}
                                required
                                minLength={6}
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <button className={cx('register-btn')} onClick={handleValidation}>
                        <span ref={registerTextRef} className={cx('register-btn-text')}>
                            Hoàn tất đăng ký
                        </span>
                    </button>
                </div>
            ) : (
                <div className={cx('form-login')}>
                    <div className={cx('login-container')}>
                        <div className={cx('login-logo')}>
                            <img className={cx('logo-img')} src={images.logo} alt="logo" />
                        </div>
                        <div className={cx('login-box')}>
                            <div className={cx('login-group')}>
                                <div className={cx('login-title')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                    <label htmlFor="user-name-login" className={cx('title')}>
                                        Tài khoản
                                    </label>
                                </div>
                                <input
                                    id="user-name-login"
                                    ref={loginUserNameRef}
                                    value={loginUserName}
                                    onChange={handleChangeLoginUser}
                                    type="text"
                                    className={cx('login-input')}
                                    autoComplete="off"
                                />
                            </div>

                            <div className={cx('login-group')}>
                                <div className={cx('login-title')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faKey} />
                                    <label htmlFor="password-login" className={cx('title')}>
                                        Mật khẩu
                                    </label>
                                </div>
                                <input
                                    id="password-login"
                                    ref={loginPasswordRef}
                                    value={loginPassword}
                                    onChange={handleChangeLoginPassword}
                                    onKeyPress={handleKeypress}
                                    type="password"
                                    className={cx('login-input')}
                                    autoComplete="off"
                                />
                            </div>
                            <button className={cx('login-btn')} onClick={login}>
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    )
}

export default RegisterUser

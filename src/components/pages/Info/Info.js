import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { baseURL } from '~/utils'
import styles from './Info.module.scss'

const cx = classNames.bind(styles)

function Info() {
    const userId = localStorage.getItem('userId')
    const [disabledGlobal, setDisabledGlobal] = useState(true)
    const [staffIdValue, setStaffIdValue] = useState('')
    const [fullnameValue, setFullnameValue] = useState('')
    const [birthdayValue, setBirthdayValue] = useState('')
    const [sexValue, setSexValue] = useState('')
    const [phoneNumberValue, setPhoneNumberValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [addressValue, setAddressValue] = useState('')
    const [mesageUsername, setMessageUsername] = useState('')
    const [usernameValue, setUserNameValue] = useState('')
    const [isCheckUser, setIsCheckUser] = useState(false)

    const [currentDatas, setCurrentDatas] = useState({})

    const updateDatas = {
        user_id: userId,
        staff_id: staffIdValue,
        fullname: fullnameValue,
        sex: sexValue,
        birthday: birthdayValue,
        email: emailValue,
        phone_number: phoneNumberValue,
        address: addressValue,
        username: usernameValue,
    }

    const staffIdRef = useRef()
    const fullnameRef = useRef()
    const sexRef = useRef()
    const birthdayRef = useRef()
    const emailRef = useRef()
    const phoneNumberRef = useRef()
    const addressRef = useRef()
    const userNameRef = useRef()
    const currentPasswordRef = useRef()
    const newPasswordRef = useRef()
    const retypePasswordRef = useRef()

    useEffect(() => {
        fetch(baseURL + `get-account/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setStaffIdValue(data[0].staff_id)
                setFullnameValue(data[0].fullname)
                setSexValue(data[0].sex)
                setBirthdayValue(data[0].birthday)
                setEmailValue(data[0].email)
                setPhoneNumberValue(data[0].phone_number)
                setAddressValue(data[0].address)
                setUserNameValue(data[0].username)

                setCurrentDatas(data[0])
            })
    }, [userId])

    const handleUpdateGlobal = () => {
        setDisabledGlobal(!disabledGlobal)
        if (disabledGlobal === false) {
            if (
                updateDatas.staff_id === currentDatas.staff_id &&
                updateDatas.fullname === currentDatas.fullname &&
                updateDatas.sex === currentDatas.sex &&
                updateDatas.birthday === currentDatas.birthday &&
                updateDatas.email === currentDatas.email &&
                updateDatas.phone_number === currentDatas.phone_number &&
                updateDatas.address === currentDatas.address &&
                updateDatas.username === currentDatas.username
            ) {
                toast.info('Bạn chưa thay đổi thông tin !')
            } else {
                fetch(baseURL + 'update-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateDatas),
                })
                toast.success('Đã update thành công.')
            }
        }
    }

    const handleUpdatePassword = () => {
        if (currentPasswordRef.current.value !== currentDatas.password) {
            toast.error('Mật khẩu cũ không đúng !')
        } else {
            if (newPasswordRef.current.value !== retypePasswordRef.current.value) {
                toast.error('Nhập lại mật khẩu không chính xác !')
            } else {
                updateDatas.password = retypePasswordRef.current.value
                fetch(baseURL + 'update-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateDatas),
                })
                toast.success('Đã đổi mật khẩu thành công')
            }
        }
    }

    useEffect(() => {
        const fetchUserApi = fetch(baseURL + 'check-user', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: updateDatas.username }),
        })
        fetchUserApi
            .then((response) => response.json())
            .then((datas) => {
                if (datas === 1 && usernameValue !== currentDatas.username) {
                    console.log(datas)
                    setMessageUsername('Tên tài khoản này đã được sử dụng !')
                } else {
                    setMessageUsername('')
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCheckUser])

    // onchange function
    const handleChangeUserName = (e) => {
        if (!(e.target.value === '')) {
            setMessageUsername('')
        }
        setUserNameValue(userNameRef.current.value)
        setTimeout(() => {}, 500)
    }

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>Thông tin tài khoản</h2>
            <div className={cx('group')}>
                <h3 className={cx('group-heading')}>Thông tin chung</h3>
                <div className={cx('group-item')}>
                    <div className={cx('item-title')}>Mã nhân viên:</div>
                    <input
                        className={cx('item-input')}
                        ref={staffIdRef}
                        type="text"
                        value={staffIdValue}
                        onChange={() => setStaffIdValue(staffIdRef.current.value)}
                        disabled={disabledGlobal}
                    />
                </div>
                <div className={cx('group-item')}>
                    <div className={cx('item-title')}>Họ và tên:</div>
                    <input
                        className={cx('item-input')}
                        ref={fullnameRef}
                        type="text"
                        value={fullnameValue}
                        onChange={() => setFullnameValue(fullnameRef.current.value)}
                        disabled={disabledGlobal}
                    />
                </div>
                <div className={cx('group-item')}>
                    <div className={cx('item-title')}>Giới Tính:</div>
                    <input
                        className={cx('item-input')}
                        ref={sexRef}
                        type="text"
                        value={sexValue}
                        onChange={() => setSexValue(sexRef.current.value)}
                        disabled={disabledGlobal}
                    />
                </div>
                <div className={cx('group-item')}>
                    <div className={cx('item-title')}>Ngày sinh:</div>
                    <input
                        className={cx('item-input')}
                        ref={birthdayRef}
                        type="date"
                        value={birthdayValue}
                        onChange={() => setBirthdayValue(birthdayRef.current.value)}
                        disabled={disabledGlobal}
                    />
                </div>
                <div className={cx('group-item')}>
                    <div className={cx('item-title')}>Email:</div>
                    <input
                        className={cx('item-input')}
                        ref={emailRef}
                        type="text"
                        value={emailValue}
                        onChange={() => setEmailValue(emailRef.current.value)}
                        disabled={disabledGlobal}
                    />
                </div>
                <div className={cx('group-item')}>
                    <div className={cx('item-title')}>Số điện thoại:</div>
                    <input
                        className={cx('item-input')}
                        ref={phoneNumberRef}
                        type="text"
                        value={phoneNumberValue}
                        onChange={() => setPhoneNumberValue(phoneNumberRef.current.value)}
                        disabled={disabledGlobal}
                    />
                </div>
                <div className={cx('group-item')}>
                    <div className={cx('item-title')}>Địa chỉ:</div>
                    <input
                        className={cx('item-input')}
                        ref={addressRef}
                        type="text"
                        value={addressValue}
                        onChange={() => setAddressValue(addressRef.current.value)}
                        disabled={disabledGlobal}
                    />
                </div>
                <div className={cx('group-item')}>
                    <div className={cx('item-title')}>Tài khoản:</div>
                    <div className={cx('item--message')}>
                        <span className={cx('validate-message')}>{mesageUsername}</span>
                        <input
                            className={cx('item-input')}
                            ref={userNameRef}
                            onChange={handleChangeUserName}
                            onKeyUp={() => {
                                setTimeout(() => setIsCheckUser(!isCheckUser), 500)
                            }}
                            type="text"
                            value={usernameValue}
                            disabled={disabledGlobal}
                        />
                    </div>
                </div>

                <div className={cx('group-item')}>
                    <div className={cx('update-btn', disabledGlobal ? 'disabled' : '')} onClick={handleUpdateGlobal}>
                        Chỉnh sửa
                    </div>
                </div>
                <h3 className={cx('group-heading')}>Đổi mật khẩu</h3>
                <div className={cx('group-item')}>
                    <div className={cx('item-title', 'item-title--password')}>Mật khẩu cũ:</div>
                    <input
                        className={cx('item-input', 'item-input--password')}
                        ref={currentPasswordRef}
                        type="password"
                    />
                </div>
                <div className={cx('group-item')}>
                    <div className={cx('item-title', 'item-title--password')}>Mật khẩu mới:</div>
                    <input className={cx('item-input', 'item-input--password')} ref={newPasswordRef} type="password" />
                </div>
                <div className={cx('group-item')}>
                    <div className={cx('item-title', 'item-title--password')}>Nhập lại mật khẩu:</div>
                    <input
                        className={cx('item-input', 'item-input--password')}
                        ref={retypePasswordRef}
                        type="password"
                    />
                </div>
                <div className={cx('group-item')}>
                    <div className={cx('update-btn', 'update-btn--password')} onClick={handleUpdatePassword}>
                        Đổi mật khẩu
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Info

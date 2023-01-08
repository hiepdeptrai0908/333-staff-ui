import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { baseURL } from '~/utils'
import styles from './Info.module.scss'
import NoDataImage from '~/components/NoDataImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { useReactToPrint } from 'react-to-print'

const cx = classNames.bind(styles)

function Info() {
    const userId = localStorage.getItem('userId')
    const [isLogin, setIslogin] = useState(sessionStorage.getItem('isLogin') || false)
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
    const [currentPasswordValue, setCurrentPasswordValue] = useState('')
    const [newPasswordValue, setNewPassword] = useState('')
    const [retypePasswordValue, setRetypePasswordValue] = useState('')

    const [isCheckUser, setIsCheckUser] = useState(false)

    const [yearValue, setYearValue] = useState(new Date().getFullYear())
    const [monthValue, setMonthValue] = useState(new Date().getMonth() + 1)

    const [currentDatas, setCurrentDatas] = useState({ create_user: '' })
    const [timeDatas, setTimeDatas] = useState([])

    const [monthResutl, setMonthResutl] = useState(monthValue)

    const [isSearchTime, setIsSearchTime] = useState(false)

    const [timeTotal, setTimeTotal] = useState({})

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

    const yearRef = useRef()
    const monthRef = useRef()
    const contentRef = useRef()

    const searchTimeData = {
        staff_id: updateDatas.staff_id,
        month: monthValue === '' ? '0' : String(monthValue).length < 2 ? '0' + String(monthValue) : String(monthValue),
        year: yearValue === '' ? '0000' : String(yearValue),
    }

    useEffect(() => {
        if (isLogin === 'true') {
            console.log(isLogin)
            toast.success('Đăng nhập thành công !')
            setIslogin('')
            sessionStorage.removeItem('isLogin')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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
                if (mesageUsername === '') {
                    currentDatas.username = updateDatas.username
                    fetch(baseURL + 'update-user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updateDatas),
                    })
                    toast.success('Đã update thành công.')
                } else {
                    toast.warning('Tên tài khoản không hợp lệ !')
                }
            }
        }
    }

    const handleUpdatePassword = () => {
        if (currentPasswordValue !== currentDatas.password) {
            toast.error('Mật khẩu cũ không đúng !')
        } else {
            if (newPasswordValue !== retypePasswordValue) {
                toast.error('Nhập lại mật khẩu không đúng !')
            } else {
                updateDatas.password = retypePasswordValue
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

    const handleSearchTime = () => {
        if (searchTimeData.month === '') return toast.warning('Tháng không được để trống !')
        if (searchTimeData.year === '') return toast.warning('Năm không được để trống !')
        setIsSearchTime(true)
        fetch(baseURL + 'search-time-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchTimeData),
        })
            .then((response) => response.json())
            .then((data) => {
                setTimeDatas([...data])
                setMonthResutl(monthValue)
            })

        fetch(baseURL + 'total-month-time', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchTimeData),
        })
            .then((response) => response.json())
            .then((data) => {
                setTimeTotal(data)
            })
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
                    setMessageUsername('Tài khoản này đã được sử dụng !')
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

    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
    })

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
                        disabled={true}
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
                            className={cx('item-input', 'item-input--username')}
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
                    <div className={cx('item-title')}>Người tạo TK:</div>
                    <input
                        className={cx('item-input')}
                        ref={addressRef}
                        type="text"
                        value={currentDatas.create_user}
                        onChange={() => {}}
                        disabled={true}
                    />
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
                        value={currentPasswordValue}
                        onChange={() => setCurrentPasswordValue(currentPasswordRef.current.value)}
                        type="password"
                    />
                </div>
                <div className={cx('group-item')}>
                    <div className={cx('item-title', 'item-title--password')}>Mật khẩu mới:</div>
                    <input
                        className={cx('item-input', 'item-input--password')}
                        ref={newPasswordRef}
                        value={newPasswordValue}
                        onChange={() => setNewPassword(newPasswordRef.current.value)}
                        type="password"
                    />
                </div>
                <div className={cx('group-item')}>
                    <div className={cx('item-title', 'item-title--password')}>Nhập lại mật khẩu:</div>
                    <input
                        className={cx('item-input', 'item-input--password')}
                        ref={retypePasswordRef}
                        value={retypePasswordValue}
                        onChange={() => setRetypePasswordValue(retypePasswordRef.current.value)}
                        type="password"
                    />
                </div>
                <div className={cx('group-item')}>
                    <div className={cx('update-btn', 'update-btn--password')} onClick={handleUpdatePassword}>
                        Đổi mật khẩu
                    </div>
                </div>
                <h3 className={cx('group-heading')}>Chấm công</h3>
                <div className={cx('group-item')}>
                    <div className={cx('item-title', 'item-title--time')}>Tháng</div>
                    <input
                        className={cx('item-input', 'item-input--time')}
                        ref={monthRef}
                        value={monthValue}
                        onChange={() => setMonthValue(monthRef.current.value)}
                    />
                    <div className={cx('item-title', 'item-title--time')}>Năm</div>
                    <input
                        className={cx('item-input', 'item-input--time')}
                        ref={yearRef}
                        value={yearValue}
                        onChange={() => setYearValue(yearRef.current.value)}
                    />
                    <div className={cx('group-item')}>
                        <div className={cx('search-btn')} onClick={handleSearchTime}>
                            Tìm kiếm
                        </div>
                    </div>
                </div>
                {isSearchTime && timeDatas.length !== 0 ? (
                    <div className={cx('table-wrapper')} ref={contentRef}>
                        <div className={cx('table-headding')}>
                            Bảng chấm công tháng {monthResutl} của
                            <span style={{ color: 'green', paddingLeft: '10px' }}>{fullnameValue}</span>
                        </div>
                        <table id="list-time" className={cx('styled-table')}>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Ngày</th>
                                    <th>出勤</th>
                                    <th>退勤</th>
                                    <th>休憩</th>
                                    <th>合計</th>
                                </tr>
                            </thead>
                            <tbody>
                                {timeDatas ? (
                                    timeDatas.map((timeData, index) => {
                                        return (
                                            <tr key={index}>
                                                <td
                                                    className={cx('table-data')}
                                                    style={{ fontWeight: '600', width: '20px' }}
                                                >
                                                    {index + 1}
                                                </td>
                                                <td className={cx('table-data')}>{timeData.date_in}</td>
                                                <td className={cx('table-data')}>{timeData.time_in}</td>
                                                <td className={cx('table-data')}>{timeData.time_out}</td>
                                                <td className={cx('table-data')}>
                                                    {timeData.break_total === '00:00' ? '' : timeData.break_total}
                                                </td>
                                                <td className={cx('table-data')}>{timeData.work_total}</td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <NoDataImage />
                                )}
                            </tbody>
                        </table>
                        <div className={cx('total-time')}>
                            Tổng
                            <span className={cx('total-time-result')}>{timeTotal.work_total}</span>
                        </div>
                    </div>
                ) : (
                    <div>{isSearchTime ? <NoDataImage /> : <div></div>}</div>
                )}
            </div>
            {isSearchTime && timeDatas.length !== 0 && (
                <button onClick={handlePrint} className={cx('download-btn')}>
                    <FontAwesomeIcon className={cx('download-icon')} icon={faDownload} />
                    Tải file PDF
                </button>
            )}
            <ToastContainer />
        </div>
    )
}

export default Info

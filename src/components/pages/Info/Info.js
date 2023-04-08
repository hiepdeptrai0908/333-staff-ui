import classNames from 'classnames/bind'
import { Fragment, useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { baseURL } from '~/utils'
import styles from './Info.module.scss'
import NoDataImage from '~/components/NoDataImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useReactToPrint } from 'react-to-print'
import images from '~/assets/images'

const cx = classNames.bind(styles)

function Info() {
    const userId = localStorage.getItem('userId')
    const [isLogin, setIslogin] = useState(sessionStorage.getItem('isLogin') || false)
    const [listUsers, setListUsers] = useState([])
    const [disabledGlobal, setDisabledGlobal] = useState(true)
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
    const [yearSalaryValue, setYearSalaryValue] = useState(() => {
        if (new Date().getMonth() + 1 === 1) {
            return new Date().getFullYear() - 1
        } else {
            return new Date().getFullYear()
        }
    })
    const [monthSalaryValue, setMonthSalaryValue] = useState(() => {
        if (new Date().getMonth() + 1 === 1) {
            return 12
        } else {
            return new Date().getMonth()
        }
    })

    const [currentDatas, setCurrentDatas] = useState({ create_user: '', staff_id: '' })
    const [timeDatas, setTimeDatas] = useState([])

    const [monthResutl, setMonthResutl] = useState(monthValue)

    const [isSearchTime, setIsSearchTime] = useState(false)

    const [timeTotal, setTimeTotal] = useState({})

    // Salary
    const [titleBtnSalary, setTitleBtnSalary] = useState('Hiện')
    const [classSalary, setClassSalary] = useState('')
    const [disabledSalary, setDisalbledSalary] = useState(true)
    const [salaryData, setSalaryData] = useState({ basic_salary: '1050', up_salary: '1260', fresher_salary: '950' })
    const [currentSalaryData, setCurrentSalaryData] = useState({
        basic_salary: '1050',
        up_salary: '1260',
        fresher_salary: '950',
    })
    const [basicSalaryValue, setBasicSalaryValue] = useState(salaryData.basic_salary || '')
    const [upSalaryValue, setUpSalaryValue] = useState(salaryData.up_salary || '')
    const [isShowSalaryTable, setIsShowSalaryTable] = useState(false)
    const [salaryUserData, setSalaryUserData] = useState({
        allowance: '',
        basic_salary: '',
        create_at: '',
        create_user: '',
        delete_at: '',
        delete_user: '',
        fullname: '',
        regular_time: '',
        salary: '',
        salary_date: '',
        salary_id: '',
        staff_id: '',
        status: '',
        total_days: '',
        total_times: '',
        total_times_up: '',
        up_salary: '',
        update_at: '',
        update_user: '',
    })

    const updateDatas = {
        user_id: userId,
        staff_id: currentDatas.staff_id,
        fullname: fullnameValue,
        sex: sexValue,
        birthday: birthdayValue,
        email: emailValue,
        phone_number: phoneNumberValue,
        address: addressValue,
        username: usernameValue,
    }

    const updateSalaryDatas = {
        basic_salary: Number(basicSalaryValue),
        up_salary: Number(upSalaryValue),
    }

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
    const yearSalaryRef = useRef()
    const monthSalaryRef = useRef()
    const contentRef = useRef()

    // Salary ref
    const basicSalaryRef = useRef()
    const upSalaryRef = useRef()
    const salaryUserRef = useRef()

    const searchTimeData = {
        staff_id: updateDatas.staff_id,
        month: monthValue === '' ? '0' : String(monthValue).length < 2 ? '0' + String(monthValue) : String(monthValue),
        year: yearValue === '' ? '0000' : String(yearValue),
    }

    useEffect(() => {
        if (isLogin === 'true') {
            toast.success('Đăng nhập thành công !')
            setIslogin('')
            sessionStorage.removeItem('isLogin')
        }
        fetch(baseURL + 'salary/get-setting', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data[0]) {
                    setCurrentSalaryData(data[0])
                    setBasicSalaryValue(data[0].basic_salary || '')
                    setUpSalaryValue(data[0].up_salary || '')
                    setSalaryData(data[0])
                }
            })

        fetch(baseURL + 'get-accounts')
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setListUsers(data)
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        fetch(baseURL + `get-account/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setFullnameValue(data[0].fullname || '')
                setSexValue(data[0].sex || '')
                setBirthdayValue(data[0].birthday || '')
                setEmailValue(data[0].email || '')
                setPhoneNumberValue(data[0].phone_number || '')
                setAddressValue(data[0].address || '')
                setUserNameValue(data[0].username || '')

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

    // Handle Salary
    const handleSearchSalary = (e) => {
        setIsShowSalaryTable(false)
        if (salaryUserRef.current.value === '') return toast.info('Vui lòng chọn tên nhân viên !')

        if (monthSalaryValue === '' || yearSalaryValue === '') return toast.info('Tháng, Năm không được để trống!')
        if (monthSalaryValue > new Date().getMonth() + 1 || yearSalaryValue > new Date().getFullYear)
            return toast.info('Không thể xuất bảng lương của tương lai!')
        const postData = {
            staff_id: Number(salaryUserRef.current.value),
            month: Number(monthSalaryValue) < 10 ? '0' + String(monthSalaryValue) : String(monthSalaryValue),
            year: String(yearSalaryValue),
        }
        const nameBtn = e.target.name
        if (nameBtn === 'create') {
            fetch(baseURL + 'salary/get-salary-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            })
                .then((response) => response.json())
                .then((datas) => {
                    if (datas) {
                        setSalaryUserData(datas[0])
                    }
                })
            toast.success('Thành công!')
            setIsShowSalaryTable(true)
            return
        } else if (nameBtn === 'delete') {
            fetch(baseURL + 'salary/delete-salary-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            })

            toast.success(`Đã xoá bảng lương tháng ${monthSalaryValue} của ${salaryUserData.fullname}.`)
            setIsShowSalaryTable(false)
            return
        }
    }

    const handleUpdateSalary = () => {
        disabledSalary ? setDisalbledSalary(false) : setDisalbledSalary(true)

        if (disabledSalary === true) return

        if (
            updateSalaryDatas.basic_salary === currentSalaryData.basic_salary &&
            updateSalaryDatas.up_salary === currentSalaryData.up_salary
        ) {
            toast.info('Thông tin không có sự thay đổi!')
            return
        }
        fetch(baseURL + 'salary/update-setting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateSalaryDatas),
        })
            .then((response) => response.json())
            .then((data) => {
                setCurrentSalaryData(updateSalaryDatas)
                toast[data?.status](data?.title)
            })
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
                        type="text"
                        value={currentDatas.staff_id}
                        onChange={() => {}}
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
                    <input className={cx('item-input')} type="text" value={currentDatas.create_user} disabled={true} />
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
                        <button className={cx('search-btn')} onClick={handleSearchTime}>
                            Tìm kiếm
                        </button>
                    </div>
                </div>
                {isSearchTime && timeDatas.length !== 0 ? (
                    <div className={cx('table-wrapper')}>
                        <div className={cx('table-headding')}>
                            BẢNG CÔNG THÁNG {monthResutl}
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

                {currentDatas?.staff_id === 333 && (
                    <Fragment>
                        {/* Setting lương */}
                        <h3 className={cx('group-heading', 'group-heading--salary')}>Tuỳ chỉnh lương</h3>
                        <button
                            className={cx('tongle-show__settings')}
                            onClick={() => {
                                if (titleBtnSalary === 'Hiện') {
                                    setTitleBtnSalary('Ẩn')
                                    setClassSalary(cx('fade-in'))
                                } else if (titleBtnSalary === 'Ẩn') {
                                    setTitleBtnSalary('Hiện')
                                    setClassSalary(cx('fade-out'))
                                }
                            }}
                        >
                            {titleBtnSalary === 'Hiện' ? (
                                <FontAwesomeIcon icon={faPlus} />
                            ) : (
                                <FontAwesomeIcon icon={faMinus} />
                            )}
                        </button>
                        <div className={cx('salary', classSalary)}>
                            <div className={cx('salary-item')}>
                                <div className={cx('salary-item__title')}> Lương cơ bản:</div>
                                <input
                                    className={cx('salary-item__input')}
                                    type="text"
                                    ref={basicSalaryRef}
                                    value={basicSalaryValue}
                                    onChange={() => {
                                        setBasicSalaryValue(basicSalaryRef.current.value)
                                    }}
                                    disabled={disabledSalary}
                                />
                            </div>
                            <div className={cx('salary-item')}>
                                <div className={cx('salary-item__title')}> Lương tối / Tăng ca:</div>
                                <input
                                    className={cx('salary-item__input')}
                                    type="text"
                                    ref={upSalaryRef}
                                    value={upSalaryValue}
                                    onChange={() => {
                                        setUpSalaryValue(upSalaryRef.current.value)
                                    }}
                                    disabled={disabledSalary}
                                />
                            </div>
                            <div className={cx('group-item')}>
                                <div
                                    className={cx('update-btn', disabledSalary ? 'disabled' : '')}
                                    onClick={handleUpdateSalary}
                                >
                                    {disabledSalary ? 'Chỉnh Lương' : 'Xác Nhận'}
                                </div>
                            </div>
                        </div>

                        {/* Bảng lương */}
                        <h3 className={cx('group-heading')}>Bảng lương</h3>
                        <div className={cx('group-item')}>
                            <select ref={salaryUserRef} className={cx('salary-user')}>
                                <option value="" key="0">
                                    --- Chọn Nhân Viên ---
                                </option>
                                {listUsers
                                    .filter((user) => user.staff_id !== 333)
                                    .map((user) => {
                                        return (
                                            <option value={user.staff_id} key={user.user_id}>
                                                {user.fullname}
                                            </option>
                                        )
                                    })}
                            </select>
                            <div className={cx('group-item')}>
                                <div className={cx('item-title', 'item-title--time')}>Tháng</div>
                                <input
                                    className={cx('item-input', 'item-input--time')}
                                    ref={monthSalaryRef}
                                    value={monthSalaryValue}
                                    onChange={() => setMonthSalaryValue(monthSalaryRef.current.value)}
                                />
                                <div className={cx('item-title', 'item-title--time')}>Năm</div>
                                <input
                                    className={cx('item-input', 'item-input--time')}
                                    ref={yearSalaryRef}
                                    value={yearSalaryValue}
                                    onChange={() => setYearSalaryValue(yearSalaryRef.current.value)}
                                />
                            </div>
                            <div className={cx('group-item')}>
                                <button className={cx('search-btn')} name="create" onClick={handleSearchSalary}>
                                    Xuất bản
                                </button>
                                <button
                                    className={cx('search-btn', 'search-btn--salary')}
                                    name="delete"
                                    onClick={handleSearchSalary}
                                >
                                    Xoá
                                </button>
                            </div>
                        </div>
                        {isShowSalaryTable && (
                            <div className={cx('table-wrapper', 'salary-table-wrapper')} ref={contentRef}>
                                <div className={cx('salary-heading')}>
                                    <div>
                                        <i style={{ fontWeight: 'bold' }}>333ベトナム料理</i>
                                        <div>Họ & Tên : {salaryUserData.fullname}</div>
                                        <div>Mã : {salaryUserData.staff_id}</div>
                                    </div>
                                    <img className={cx('salary-heading-logo')} src={images.logo} alt="logo" />
                                </div>
                                <table className={cx('salary-table')}>
                                    <thead>
                                        <tr key="">
                                            <th className={cx('salary-table--title')} colSpan={2}>
                                                Bảng Lương Tháng {salaryUserData.salary_date.split('-')[1]} năm{' '}
                                                {salaryUserData.salary_date.split('-')[0]}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className={cx('salary-table-content')} key="">
                                            <th className={cx('salary-table-content--key')}>Lương cơ bản</th>
                                            <td className={cx('salary-table-content--value')}>
                                                {salaryUserData.basic_salary}円
                                            </td>
                                        </tr>
                                        <tr className={cx('salary-table-content')}>
                                            <th className={cx('salary-table-content--key')}>Số lần (ngày) làm</th>
                                            <td className={cx('salary-table-content--value')}>
                                                {salaryUserData.total_days}
                                            </td>
                                        </tr>
                                        <tr className={cx('salary-table-content')}>
                                            <th className={cx('salary-table-content--key')}>Tổng giờ làm</th>
                                            <td className={cx('salary-table-content--value')}>
                                                {salaryUserData.total_times}
                                            </td>
                                        </tr>
                                        <tr className={cx('salary-table-content')}>
                                            <th className={cx('salary-table-content--key')}>Giờ thường</th>
                                            <td className={cx('salary-table-content--value')}>
                                                {salaryUserData.regular_time}
                                            </td>
                                        </tr>
                                        <tr className={cx('salary-table-content')}>
                                            <th className={cx('salary-table-content--key')}>Giờ tăng ca</th>
                                            <td className={cx('salary-table-content--value')}>
                                                {salaryUserData.total_times_up}
                                            </td>
                                        </tr>
                                        <tr className={cx('salary-table-content')}>
                                            <th className={cx('salary-table-content--key')}>Hỗ trợ đi lại</th>
                                            <td className={cx('salary-table-content--value')}>
                                                {salaryUserData.allowance}円
                                            </td>
                                        </tr>
                                        <tr className={cx('salary-table-content')}>
                                            <th className={cx('salary-table-content--key')}></th>
                                            <td className={cx('salary-table-content--value')}></td>
                                        </tr>
                                        <tr className={cx('salary-table-content')}>
                                            <th className={cx('salary-table-content--key')}></th>
                                            <td className={cx('salary-table-content--value')}></td>
                                        </tr>
                                        <tr className={cx('salary-table-content')}>
                                            <th className={cx('salary-table-content--key')}></th>
                                            <td className={cx('salary-table-content--value')}></td>
                                        </tr>
                                        <tr className={cx('salary-table-content')}>
                                            <th className={cx('salary-table-content--key')}></th>
                                            <td className={cx('salary-table-content--value')}></td>
                                        </tr>
                                        <tr className={cx('salary-table-content')}>
                                            <th className={cx('salary-table-content--key')}>Thực lãnh</th>
                                            <td className={cx('salary-table-content--value')}>
                                                {salaryUserData.salary}円
                                            </td>
                                        </tr>
                                        <tr className={cx('salary-table-content')}>
                                            <th className={cx('salary-table-content--key')}></th>
                                            <td className={cx('salary-table-content--value')}></td>
                                        </tr>
                                        <tr className={cx('salary-table-content')}>
                                            <th className={cx('salary-table-content--key')}>Được xuất bản lúc</th>
                                            <td className={cx('salary-table-content--value')}>
                                                {salaryUserData.create_at}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Fragment>
                )}
            </div>
            {isShowSalaryTable && (
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

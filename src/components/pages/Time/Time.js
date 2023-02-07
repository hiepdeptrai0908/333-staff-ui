import className from 'classnames/bind'
import { useRef, useEffect, useState, Fragment } from 'react'
import { useReactToPrint } from 'react-to-print'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot, faDownload, faRightLong, faClose } from '@fortawesome/free-solid-svg-icons'

import styles from './Time.module.scss'
import { baseURL } from '~/utils'
import NoDataImage from '~/components/NoDataImage'
import { Link } from 'react-router-dom'
import configRoutes from '~/config/routes'
import { toast, ToastContainer } from 'react-toastify'
import Loading from '~/components/Loading'

const cx = className.bind(styles)

const dateValues = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
]
const monthValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const yearValues = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]

function Time() {
    const [searchAction, setSearchAction] = useState(sessionStorage.getItem('searchTimeAction') || 'today')

    const [datas, setDatas] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const [loginUsernameValue, setLoginUsernameValue] = useState('')
    const [loginPasswordValue, setLoginPasswordValue] = useState('')
    const [totalTime, setTotalTime] = useState('00:00')
    const [loading, setLoading] = useState(false)

    const contentRef = useRef()
    const dayRef = useRef()
    const monthRef = useRef()
    const yearRef = useRef()
    const loginUserRef = useRef()
    const loginPasswordRef = useRef()
    const loginBtnRef = useRef()
    const [adminAccount, setAdminAccount] = useState({ username: '', password: '' })
    const [searchMonth, setSearchMonth] = useState('')

    useEffect(() => {
        fetch(baseURL + 'admin-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        })
            .then((response) => response.json())
            .then((data) => {
                setLoading(true)
                setAdminAccount(data[0])
            })
        setLoading(false)
    }, [])

    const handleClick = (e) => {
        setSearchAction(e.target.name)
        sessionStorage.setItem('searchTimeAction', e.target.name)
        const actionElement = document.querySelector(`.${cx('active')}`)
        if (actionElement && searchAction === 'date') {
            actionElement.classList.remove(cx('active'))
        }
        e.target.classList.add(cx('active'))
        e.target.name === 'today' ? setSearchAction('today') : setSearchAction('online')
    }
    useEffect(() => {
        if (searchAction === 'date') {
            const searchData = {
                day:
                    dayRef.current.value === ''
                        ? null
                        : dayRef.current.value < 10
                        ? '0' + String(dayRef.current.value)
                        : String(dayRef.current.value),
                month:
                    monthRef.current.value === ''
                        ? null
                        : monthRef.current.value < 10
                        ? '0' + String(monthRef.current.value)
                        : String(monthRef.current.value),
                year: String(yearRef.current.value),
            }

            setSearchMonth(searchData.month)

            fetch(baseURL + 'time/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchData),
            })
                .then((response) => response.json())
                .then((res) => {
                    setLoading(true)
                    setDatas([...res])
                })

            fetch(baseURL + 'total-month-all', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchData),
            })
                .then((response) => response.json())
                .then((datas) => {
                    if (datas.work_total) {
                        setTotalTime(datas.work_total)
                    }
                })
            setLoading(false)
            return
        }
        const fetchApi = fetch(baseURL + searchAction)
        fetchApi
            .then((response) => response.json())
            .then((res) => {
                setLoading(true)
                setDatas([...res])
            })

        setLoading(false)
    }, [searchAction])

    // bật tắt bảng chi tiết
    const handleDetalClick = (e) => {
        const detal = document.querySelector(`.${cx('detal-show')}`)
        if (e.target.classList.contains(cx('detal-show'))) {
            return e.target.classList.remove(cx('detal-show'))
        } else if (detal) {
            detal.classList.remove(cx('detal-show'))
        }
        e.target.classList.add(cx('detal-show'))
    }

    // tìm theo ngày
    const handleSearchClick = (e) => {
        setSearchAction('date')
        sessionStorage.setItem('searchTimeAction', 'date')
        const actionElement = document.querySelector(`.${cx('active')}`)
        if (actionElement) {
            actionElement.classList.remove(cx('active'))
        }
        const searchData = {
            day:
                dayRef.current.value === ''
                    ? null
                    : dayRef.current.value < 10
                    ? '0' + String(dayRef.current.value)
                    : String(dayRef.current.value),
            month:
                monthRef.current.value === ''
                    ? null
                    : monthRef.current.value < 10
                    ? '0' + String(monthRef.current.value)
                    : String(monthRef.current.value),
            year: String(yearRef.current.value),
        }

        setSearchMonth(searchData.month)

        fetch(baseURL + 'time/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchData),
        })
            .then((response) => response.json())
            .then((res) => {
                setLoading(true)
                setDatas([...res])
            })

        fetch(baseURL + 'total-month-all', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchData),
        })
            .then((response) => response.json())
            .then((datas) => {
                if (datas.work_total) {
                    setTotalTime(datas.work_total)
                }
            })
        setLoading(false)
    }

    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
    })

    const handleLogin = (e) => {
        if (loginUserRef.current.value === '' || loginPasswordRef.current.value === '') {
            e.preventDefault()
            return toast.warning('Tài khoản, mật khẩu không được để trống !')
        }

        if (loginUsernameValue === adminAccount.username && loginPasswordValue === adminAccount.password) {
            sessionStorage.setItem('isLogin', 'true')
        } else {
            e.preventDefault()
            toast.error('Đăng nhập thất bại !')
            loginUserRef.current.value = ''
            loginPasswordRef.current.value = ''
            loginUserRef.current.focus()
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>Danh sách giờ làm</div>
            <div className={cx('search-action')}>
                <div className={cx('action')}>
                    <button
                        className={cx('now-btn', searchAction === 'today' && 'active')}
                        name="today"
                        onClick={handleClick}
                    >
                        Hôm nay
                    </button>
                    <button
                        className={cx('now-btn', searchAction === 'online' && 'active')}
                        name="online"
                        onClick={handleClick}
                    >
                        Đang online
                    </button>
                </div>
                <div className={cx('date')}>
                    <select ref={dayRef} className={cx('date-item')}>
                        <option value="">Ngày</option>
                        {dateValues.map((date, index) => {
                            return (
                                <option key={index} value={date}>
                                    {date < 10 ? '0' + String(date) : String(date)}
                                </option>
                            )
                        })}
                    </select>
                    <select ref={monthRef} className={cx('date-item')} defaultValue={new Date().getMonth() + 1}>
                        <option value="">Tháng</option>
                        {monthValues.map((month, index) => {
                            return (
                                <option key={index} value={month}>
                                    {month < 10 ? '0' + String(month) : String(month)}
                                </option>
                            )
                        })}
                    </select>
                    <select ref={yearRef} className={cx('date-item')} defaultValue={new Date().getFullYear()}>
                        {yearValues.map((year, index) => {
                            return (
                                <option key={index} value={year}>
                                    {year}
                                </option>
                            )
                        })}
                    </select>
                    <button className={cx('date-item', 'date-time-btn')} onClick={handleSearchClick}>
                        Tìm kiếm
                    </button>
                </div>
            </div>
            <div className={cx('content')} ref={contentRef}>
                {loading ? (
                    datas.length !== 0 ? (
                        <Fragment>
                            <table id="list-time" className={cx('styled-table')}>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th></th>
                                        <th>Mã số</th>
                                        <th>Họ và Tên</th>
                                        {searchAction === 'date' && <th>Ngày</th>}
                                        <th>Giờ vào</th>
                                        <th>Giờ ra</th>
                                        <th>Tổng</th>
                                        <th colSpan={2}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datas.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td
                                                    className={cx('table-data')}
                                                    style={{ fontWeight: '600', width: '20px' }}
                                                >
                                                    {index + 1}
                                                </td>
                                                <td className={cx('table-data')}>
                                                    {data.status === 'online' ? (
                                                        <span>
                                                            <FontAwesomeIcon
                                                                className={cx(
                                                                    'online-icon',
                                                                    (data.break_in1 && !data.break_out1) ||
                                                                        (data.break_in2 && !data.break_out2)
                                                                        ? 'breaking-icon'
                                                                        : '',
                                                                )}
                                                                icon={faCircleDot}
                                                            />
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            <FontAwesomeIcon
                                                                className={cx('off-icon')}
                                                                icon={faCircleDot}
                                                            />
                                                        </span>
                                                    )}
                                                </td>
                                                <td className={cx('table-data')}>{data.staff_id}</td>
                                                <td className={cx('table-data')}>{data.fullname}</td>
                                                {searchAction === 'date' && (
                                                    <td className={cx('table-data')}>
                                                        {data.date_in.split('-')[1]}/{data.date_in.split('-')[2]}
                                                    </td>
                                                )}
                                                <td className={cx('table-data')}>{data.time_in}</td>
                                                <td className={cx('table-data')}>
                                                    {data.time_out ||
                                                        ((data.break_in1 && !data.break_out1) ||
                                                        (data.break_in2 && !data.break_out2) ? (
                                                            <span style={{ color: 'gold' }}>Đang giải lao</span>
                                                        ) : (
                                                            <span style={{ color: '#0ef30e' }}>Đang làm</span>
                                                        ))}
                                                </td>
                                                <td
                                                    className={cx(
                                                        'table-data',
                                                        data?.work_total === '00:00' ||
                                                            Number(data.work_total?.split(':')[0]) < 0
                                                            ? 'error'
                                                            : '',
                                                    )}
                                                >
                                                    {data.work_total === '00:00' ? '' : data.work_total}
                                                </td>
                                                <td className={cx('table-data', 'detal-btn')}>
                                                    <div className={cx('break-btn-box')}>
                                                        <button className={cx('break-btn')} onClick={handleDetalClick}>
                                                            Chi tiết
                                                        </button>
                                                        <div className={cx('break-popover')}>
                                                            <div className={cx('popover-group')}>
                                                                <div className={cx('group-title')}>Họ và Tên</div>
                                                                <div className={cx('group-data')}>{data.fullname}</div>
                                                            </div>
                                                            <div className={cx('popover-group')}>
                                                                <div className={cx('group-title')}>Giờ vào</div>
                                                                <div className={cx('group-data')}>
                                                                    {data.time_in}
                                                                    <span className={cx('date')}>{data.date_in}</span>
                                                                </div>
                                                            </div>
                                                            <div className={cx('popover-group')}>
                                                                <div className={cx('group-title')}>Giờ ra</div>
                                                                <div className={cx('group-data')}>
                                                                    {data.time_out}
                                                                    {data.date_out && (
                                                                        <span className={cx('date')}>
                                                                            {data.date_out}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className={cx('popover-group')}>
                                                                <div className={cx('group-title')}>Giải lao lần 1</div>
                                                                <div className={cx('group-data')}>
                                                                    {data.break_in1 ? (
                                                                        <span>
                                                                            {data.break_in1}
                                                                            <span className={cx('to')}>~</span>
                                                                            {data.break_out1 ? (
                                                                                <span>
                                                                                    {data.break_out1}
                                                                                    <span className={cx('break-total')}>
                                                                                        <FontAwesomeIcon
                                                                                            className={cx('right-icon')}
                                                                                            icon={faRightLong}
                                                                                        ></FontAwesomeIcon>
                                                                                        {data.break_time1}
                                                                                    </span>
                                                                                </span>
                                                                            ) : (
                                                                                'Đang giải lao'
                                                                            )}
                                                                        </span>
                                                                    ) : (
                                                                        ''
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className={cx('popover-group')}>
                                                                <div className={cx('group-title')}>Giải lao lần 2</div>
                                                                <div className={cx('group-data')}>
                                                                    {data.break_in2 ? (
                                                                        <span>
                                                                            {data.break_in2}
                                                                            <span className={cx('to')}>~</span>
                                                                            {data.break_out2 ? (
                                                                                <span>
                                                                                    {data.break_out2}
                                                                                    <span className={cx('break-total')}>
                                                                                        <FontAwesomeIcon
                                                                                            className={cx('right-icon')}
                                                                                            icon={faRightLong}
                                                                                        ></FontAwesomeIcon>
                                                                                        {data.break_time1}
                                                                                    </span>
                                                                                </span>
                                                                            ) : (
                                                                                'Đang giải lao'
                                                                            )}
                                                                        </span>
                                                                    ) : (
                                                                        ''
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className={cx('popover-group')}>
                                                                <div className={cx('group-title')}>合計休憩 (1)</div>
                                                                <div className={cx('group-data')}>
                                                                    {data.break_total === '00:00'
                                                                        ? ''
                                                                        : data.break_total || ''}
                                                                </div>
                                                            </div>
                                                            <div className={cx('popover-group')}>
                                                                <div className={cx('group-title')}>合計勤怠 (2)</div>
                                                                <div className={cx('group-data')}>{data.work_time}</div>
                                                            </div>
                                                            <div className={cx('popover-group')}>
                                                                <div className={cx('group-title')}>合計　(2-1)</div>
                                                                <div className={cx('group-data')}>
                                                                    {data.work_total}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={cx('table-data')}>
                                                    <button
                                                        onClick={(e) => {
                                                            setIsShowModal(!isShowModal)
                                                            localStorage.setItem('time_id', data.time_id)
                                                        }}
                                                        className={cx('update-btn')}
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            {totalTime !== '00:00' && searchAction === 'date' && (
                                <div className={cx('total-time')}>
                                    Tổng thời gian tháng {searchMonth}
                                    <span className={cx('total-time-result')}>{totalTime}</span>
                                </div>
                            )}
                        </Fragment>
                    ) : (
                        <NoDataImage />
                    )
                ) : (
                    <Loading />
                )}
            </div>
            <div className={cx('form-update')}>
                <form className={cx('form')}>
                    <div></div>
                </form>
            </div>

            {/**Modal */}
            <div className={cx('modal-wrapper')} style={{ display: isShowModal ? 'flex' : 'none' }}>
                <div className={cx('modal-box')}>
                    <div className={cx('heading')}>Đăng nhập quyền ADMIN</div>
                    <div className={cx('login-group')}>
                        <div className={cx('group-item')}>
                            <label htmlFor="tk" className={cx('item-title')}>
                                Tài khoản
                            </label>
                            <input
                                ref={loginUserRef}
                                id="tk"
                                className={cx('item-input')}
                                autoComplete="off"
                                value={loginUsernameValue}
                                onChange={() => setLoginUsernameValue(loginUserRef.current.value)}
                            />
                        </div>
                        <div className={cx('group-item')}>
                            <label htmlFor="mk" className={cx('item-title')}>
                                Mật khẩu
                            </label>
                            <input
                                ref={loginPasswordRef}
                                id="mk"
                                type="password"
                                className={cx('item-input', 'item-input--password')}
                                autoComplete="off"
                                value={loginPasswordValue}
                                onChange={() => setLoginPasswordValue(loginPasswordRef.current.value)}
                                onKeyPress={(e) => {
                                    if (e.charCode === 13) {
                                        loginBtnRef.current.click()
                                    }
                                }}
                            />
                        </div>
                        <div className={cx('group-item')}>
                            <Link
                                ref={loginBtnRef}
                                to={configRoutes.editTime}
                                className={cx('login-btn')}
                                onClick={handleLogin}
                            >
                                Đăng nhập
                            </Link>
                        </div>
                    </div>
                    <div className={cx('close-btn')} onClick={() => setIsShowModal(false)}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                </div>
            </div>

            <button onClick={handlePrint} className={cx('download-btn')}>
                <FontAwesomeIcon className={cx('download-icon')} icon={faDownload} />
                Tải file PDF
            </button>
            <ToastContainer />
        </div>
    )
}

export default Time

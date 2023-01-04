import className from 'classnames/bind'
import { useRef, useEffect, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot, faDownload, faRightLong, faClose } from '@fortawesome/free-solid-svg-icons'

import styles from './Time.module.scss'
import { baseURL } from '~/utils'
import NoDataImage from '~/components/NoDataImage'
import { Link } from 'react-router-dom'
import configRoutes from '~/config/routes'
import { toast, ToastContainer } from 'react-toastify'

const cx = className.bind(styles)

const dateValues = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
]
const monthValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const yearValues = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]

function Time() {
    const [show, setShow] = useState('today')
    const [data, setData] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const contentRef = useRef()
    const dayRef = useRef()
    const monthRef = useRef()
    const yearRef = useRef()
    const loginUserRef = useRef()
    const loginPasswordRef = useRef()
    const [adminAccount, setAdminAccount] = useState({})

    useEffect(() => {
        fetch(baseURL + 'admin-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        })
            .then((response) => response.json())
            .then((data) => setAdminAccount(data[0]))
    }, [])

    const handleClick = (e) => {
        setShow(e.target.name)
        console.log(show)
        const actionElement = document.querySelector(`.${cx('active')}`)
        if (actionElement) {
            actionElement.classList.remove(cx('active'))
        }
        e.target.classList.add(cx('active'))
        e.target.name === 'today' ? setShow('today') : setShow('online')
    }
    useEffect(() => {
        if (show === 'date') {
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

            fetch(baseURL + 'time/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchData),
            })
                .then((response) => response.json())
                .then((datas) => {
                    setData([...datas])
                })
            return
        }
        const fetchApi = fetch(baseURL + show)
        fetchApi.then((response) => response.json()).then((datas) => setData([...datas]))
    }, [show])

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
        setShow('date')
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
        console.log(searchData)
        fetch(baseURL + 'time/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchData),
        })
            .then((response) => response.json())
            .then((datas) => {
                setData([...datas])
            })
    }

    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
    })

    const handleLogin = (e) => {
        if (loginUserRef.current.value === '' || loginPasswordRef.current.value === '') {
            e.preventDefault()
            return toast.warning('Tài khoản, mật khẩu không được để trống !')
        } else {
            if (
                loginUserRef.current.value === adminAccount.username &&
                loginPasswordRef.current.value === adminAccount.password
            ) {
                toast.success('Đăng nhập thành công.')
            } else {
                e.preventDefault()
                toast.error('Đăng nhập thất bại !')
                loginUserRef.current.value = ''
                loginPasswordRef.current.value = ''
                loginUserRef.current.focus()
            }
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>Danh sách giờ làm</div>
            <div className={cx('search-action')}>
                <div className={cx('action')}>
                    <button className={cx('now-btn', 'active')} name="today" onClick={handleClick}>
                        Hôm nay
                    </button>
                    <button className={cx('now-btn')} name="online" onClick={handleClick}>
                        Đang online
                    </button>
                </div>
                <div className={cx('date')}>
                    <select ref={dayRef} className={cx('date-item')}>
                        <option value="">Ngày</option>
                        {dateValues.map((date, index) => {
                            return (
                                <option key={index} value={date}>
                                    {date}
                                </option>
                            )
                        })}
                    </select>
                    <select ref={monthRef} className={cx('date-item')}>
                        <option value="">Tháng</option>
                        {monthValues.map((month, index) => {
                            return (
                                <option key={index} value={month}>
                                    {month}
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
                {data.length !== 0 ? (
                    <table id="list-time" className={cx('styled-table')}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th></th>
                                <th>Mã số</th>
                                <th>Họ và Tên</th>
                                <th>Giờ vào</th>
                                <th>Giờ ra</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={cx('table-data')} style={{ fontWeight: '600', width: '20px' }}>
                                            {index + 1}
                                        </td>
                                        <td className={cx('table-data')}>
                                            {data.status === 'online' ? (
                                                <span>
                                                    <FontAwesomeIcon className={cx('online-icon')} icon={faCircleDot} />
                                                </span>
                                            ) : (
                                                <span>
                                                    <FontAwesomeIcon className={cx('off-icon')} icon={faCircleDot} />
                                                </span>
                                            )}
                                        </td>
                                        <td className={cx('table-data')}>{data.staff_id}</td>
                                        <td className={cx('table-data')}>{data.fullname}</td>
                                        <td className={cx('table-data')}>{data.time_in}</td>
                                        <td className={cx('table-data')}>
                                            {data.time_out || <span style={{ color: '#079d07' }}>Đang làm</span>}
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
                                                                <span className={cx('date')}>{data.date_out}</span>
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
                                                                        'Chưa kết thúc giải lao'
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
                                                            {data.break_total || '00:00'}
                                                        </div>
                                                    </div>
                                                    <div className={cx('popover-group')}>
                                                        <div className={cx('group-title')}>合計勤怠 (2)</div>
                                                        <div className={cx('group-data')}>{data.work_time}</div>
                                                    </div>
                                                    <div className={cx('popover-group')}>
                                                        <div className={cx('group-title')}>合計　(2-1)</div>
                                                        <div className={cx('group-data')}>{data.work_total}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={cx('table-data')}>
                                            <Link
                                                to={configRoutes.editTime}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setIsShowModal(!isShowModal)
                                                    localStorage.setItem('time_id', data.time_id)
                                                }}
                                                className={cx('update-btn')}
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                        <td className={cx('table-data')}>
                                            <a
                                                href={configRoutes.time}
                                                onClick={() => {
                                                    // eslint-disable-next-line no-restricted-globals
                                                    if (!confirm('Bạn thực sự muốn xoá ?')) {
                                                        return false
                                                    } else {
                                                        fetch(baseURL + `delete-time/${data.time_id}`)
                                                    }
                                                }}
                                                className={cx('delete-btn')}
                                            >
                                                Xoá
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                ) : (
                    <NoDataImage />
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
                            <input ref={loginUserRef} id="tk" className={cx('item-input')} />
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
                            />
                        </div>
                        <div className={cx('group-item')}>
                            <Link to={configRoutes.editTime} className={cx('login-btn')} onClick={handleLogin}>
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

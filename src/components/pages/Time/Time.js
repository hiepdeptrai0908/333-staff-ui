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
    const [searchAction, setSearchAction] = useState(sessionStorage.getItem('searchTimeAction') || 'today')

    const [datas, setDatas] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const [loginUsernameValue, setLoginUsernameValue] = useState('')
    const [loginPasswordValue, setLoginPasswordValue] = useState('')
    const [totalTime, setTotalTime] = useState('00:00')

    const contentRef = useRef()
    const dayRef = useRef()
    const monthRef = useRef()
    const yearRef = useRef()
    const loginUserRef = useRef()
    const loginPasswordRef = useRef()
    const loginBtnRef = useRef()
    const [adminAccount, setAdminAccount] = useState({})
    const [searchMonth, setSearchMonth] = useState('')

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
            return
        }
        const fetchApi = fetch(baseURL + searchAction)
        fetchApi.then((response) => response.json()).then((res) => setDatas([...res]))
    }, [searchAction])

    // b???t t???t b???ng chi ti???t
    const handleDetalClick = (e) => {
        const detal = document.querySelector(`.${cx('detal-show')}`)
        if (e.target.classList.contains(cx('detal-show'))) {
            return e.target.classList.remove(cx('detal-show'))
        } else if (detal) {
            detal.classList.remove(cx('detal-show'))
        }
        e.target.classList.add(cx('detal-show'))
    }

    // t??m theo ng??y
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
    }

    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
    })

    const handleLogin = (e) => {
        if (loginUserRef.current.value === '' || loginPasswordRef.current.value === '') {
            e.preventDefault()
            return toast.warning('T??i kho???n, m???t kh???u kh??ng ???????c ????? tr???ng !')
        } else {
            if (loginUsernameValue === adminAccount.username && loginPasswordValue === adminAccount.password) {
                sessionStorage.setItem('isLogin', 'true')
                loginBtnRef.current.click()
            } else {
                e.preventDefault()
                toast.error('????ng nh???p th???t b???i !')
                loginUserRef.current.value = ''
                loginPasswordRef.current.value = ''
                loginUserRef.current.focus()
            }
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>Danh s??ch gi??? l??m</div>
            <div className={cx('search-action')}>
                <div className={cx('action')}>
                    <button
                        className={cx('now-btn', searchAction === 'today' && 'active')}
                        name="today"
                        onClick={handleClick}
                    >
                        H??m nay
                    </button>
                    <button
                        className={cx('now-btn', searchAction === 'online' && 'active')}
                        name="online"
                        onClick={handleClick}
                    >
                        ??ang online
                    </button>
                </div>
                <div className={cx('date')}>
                    <select ref={dayRef} className={cx('date-item')}>
                        <option value="">Ng??y</option>
                        {dateValues.map((date, index) => {
                            return (
                                <option key={index} value={date}>
                                    {date < 10 ? '0' + String(date) : String(date)}
                                </option>
                            )
                        })}
                    </select>
                    <select ref={monthRef} className={cx('date-item')} defaultValue={new Date().getMonth() + 1}>
                        <option value="">Th??ng</option>
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
                        T??m ki???m
                    </button>
                </div>
            </div>
            <div className={cx('content')} ref={contentRef}>
                {datas.length !== 0 ? (
                    <>
                        <table id="list-time" className={cx('styled-table')}>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th></th>
                                    <th>M?? s???</th>
                                    <th>H??? v?? T??n</th>
                                    {searchAction === 'date' && <th>Ng??y</th>}
                                    <th>Gi??? v??o</th>
                                    <th>Gi??? ra</th>
                                    <th>T???ng</th>
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
                                                        <span style={{ color: 'gold' }}>??ang gi???i lao</span>
                                                    ) : (
                                                        <span style={{ color: '#0ef30e' }}>??ang l??m</span>
                                                    ))}
                                            </td>
                                            <td className={cx('table-data')}>
                                                {data.work_total === '00:00' ? '' : data.work_total}
                                            </td>
                                            <td className={cx('table-data', 'detal-btn')}>
                                                <div className={cx('break-btn-box')}>
                                                    <button className={cx('break-btn')} onClick={handleDetalClick}>
                                                        Chi ti???t
                                                    </button>
                                                    <div
                                                        className={cx('break-popover')}
                                                        style={{ right: searchAction === 'date' ? '96px' : '116px' }}
                                                    >
                                                        <div className={cx('popover-group')}>
                                                            <div className={cx('group-title')}>H??? v?? T??n</div>
                                                            <div className={cx('group-data')}>{data.fullname}</div>
                                                        </div>
                                                        <div className={cx('popover-group')}>
                                                            <div className={cx('group-title')}>Gi??? v??o</div>
                                                            <div className={cx('group-data')}>
                                                                {data.time_in}
                                                                <span className={cx('date')}>{data.date_in}</span>
                                                            </div>
                                                        </div>
                                                        <div className={cx('popover-group')}>
                                                            <div className={cx('group-title')}>Gi??? ra</div>
                                                            <div className={cx('group-data')}>
                                                                {data.time_out}
                                                                {data.date_out && (
                                                                    <span className={cx('date')}>{data.date_out}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className={cx('popover-group')}>
                                                            <div className={cx('group-title')}>Gi???i lao l???n 1</div>
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
                                                                            '??ang gi???i lao'
                                                                        )}
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className={cx('popover-group')}>
                                                            <div className={cx('group-title')}>Gi???i lao l???n 2</div>
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
                                                                            'Ch??a k???t th??c gi???i lao'
                                                                        )}
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className={cx('popover-group')}>
                                                            <div className={cx('group-title')}>???????????? (1)</div>
                                                            <div className={cx('group-data')}>
                                                                {data.break_total || '00:00'}
                                                            </div>
                                                        </div>
                                                        <div className={cx('popover-group')}>
                                                            <div className={cx('group-title')}>???????????? (2)</div>
                                                            <div className={cx('group-data')}>{data.work_time}</div>
                                                        </div>
                                                        <div className={cx('popover-group')}>
                                                            <div className={cx('group-title')}>?????????(2-1)</div>
                                                            <div className={cx('group-data')}>{data.work_total}</div>
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
                                T???ng th???i gian th??ng {searchMonth}
                                <span className={cx('total-time-result')}>{totalTime}</span>
                            </div>
                        )}
                    </>
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
                    <div className={cx('heading')}>????ng nh???p quy???n ADMIN</div>
                    <div className={cx('login-group')}>
                        <div className={cx('group-item')}>
                            <label htmlFor="tk" className={cx('item-title')}>
                                T??i kho???n
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
                                M???t kh???u
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
                                ????ng nh???p
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
                T???i file PDF
            </button>
            <ToastContainer />
        </div>
    )
}

export default Time

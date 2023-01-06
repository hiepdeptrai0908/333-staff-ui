import { faArrowsRotate, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { baseURL } from '~/utils'
import styles from './EditTime.module.scss'
import configRoutes from '~/config/routes'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function EditTime() {
    //state
    const timeId = Number(localStorage.getItem('time_id'))
    const [isLogin, setIslogin] = useState(sessionStorage.getItem('isLogin') || false)
    const [isRefresh, setIsRefresh] = useState(false)

    const [staffIdDisabled, setStaffIdDisabled] = useState(true)
    const [fullnameValue, setFullnameValue] = useState('')
    const [staffIdValue, setStaffIdValue] = useState('')

    const [timeInDisabled, setTimeInDisabled] = useState(true)
    const [hourInValue, setHourInValue] = useState('')
    const [minuteInValue, setMinuteInValue] = useState('')

    const [timeOutDisabled, setTimeOutDisabled] = useState(true)
    const [hourOutValue, setHourOutValue] = useState('')
    const [minuteOutValue, setMinuteOutValue] = useState('')

    const [dateInDisabled, setDateInDisabled] = useState(true)
    const [yearInValue, setYearInValue] = useState('')
    const [monthInValue, setMonthInValue] = useState('')
    const [dayInValue, setDayInValue] = useState('')

    const [dateOutDisabled, setDateOutDisabled] = useState(true)
    const [yearOutValue, setYearOutValue] = useState('')
    const [monthOutValue, setMonthOutValue] = useState('')
    const [dayOutValue, setDayOutValue] = useState('')

    const [timeBreakTotalDisabled, setTimeBreakTotalDisabled] = useState(true)
    const [hourBreakTotalValue, setHourBreakTotalValue] = useState('')
    const [minuteBreakTotalValue, setMinuteBreakTotalValue] = useState('')
    const [breakTotalDatabase, setBreakTotalDatabase] = useState('')

    const [breakIn1Value, setBreakIn1Value] = useState('')
    const [breakOut1Value, setBreakOut1Value] = useState('')

    const [breakIn2Value, setBreakIn2Value] = useState('')
    const [breakOut2Value, setBreakOut2Value] = useState('')

    const [dataUpdate, setDataUpdate] = useState({})

    const [count, setCount] = useState(0)

    const checkValue = {
        for: (value) => {
            if (/[0-9]/.test(value)) {
                return value.length < 4 ? '0' + value : value
            }

            return (value = '0000')
        },
        two: (value) => {
            if (/[0-9]/.test(value)) {
                return value.length < 2 ? '0' + value : value
            }

            return (value = '00')
        },
    }

    //ref
    const fullnameRef = useRef()
    const staffIdRef = useRef()
    const hourInRef = useRef()
    const minuteInRef = useRef()

    const yearInRef = useRef()
    const monthInRef = useRef()
    const dayInRef = useRef()

    const yearOutRef = useRef()
    const monthOutRef = useRef()
    const dayOutRef = useRef()

    const hourOutRef = useRef()
    const minuteOutRef = useRef()

    const hourBreakTotalRef = useRef()
    const minuteBreakTotalRef = useRef()

    const convertDatas = {
        time_id: timeId,
        fullname: fullnameValue,
        staff_id: staffIdValue,
        time_in: checkValue.two(hourInValue) + ':' + checkValue.two(minuteInValue),
        time_out: checkValue.two(hourOutValue) + ':' + checkValue.two(minuteOutValue),
        date_in: checkValue.for(yearInValue) + '-' + checkValue.two(monthInValue) + '-' + checkValue.two(dayInValue),
        date_out:
            checkValue.for(yearOutValue) + '-' + checkValue.two(monthOutValue) + '-' + checkValue.two(dayOutValue),
        break_total: checkValue.two(hourBreakTotalValue) + ':' + checkValue.two(minuteBreakTotalValue),
        work_time: '00:00',
        work_total: '00:00',
    }

    useEffect(() => {
        if (isLogin === 'true') {
            toast.success('Đăng nhập thành công !')
            setIslogin('')
            sessionStorage.removeItem('isLogin')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const caculatorWorkTimeValue = () => {
        const dateIn = convertDatas.date_in.split('-')
        const dateOut = convertDatas.date_out.split('-')
        const timeIn = convertDatas.time_in.split(':')
        const timeOut = convertDatas.time_out.split(':')

        const miliSeconds = Math.floor(
            new Date(dateOut[0], dateOut[1], dateOut[2], timeOut[0], timeOut[1]) -
                new Date(dateIn[0], dateIn[1], dateIn[2], timeIn[0], timeIn[1]),
        )

        const second = miliSeconds / 1000

        const minute = (second / 60) % 60

        const hour = Math.floor(second / 60 / 60)

        convertDatas.work_time = checkValue.two(hour) + ':' + checkValue.two(minute)
        const time = {
            hour: String(hour),
            minute: String(minute),
        }
        // const workTime = hour + ':' + minute
        return time
    }

    const calculateWorkTotal = (work, breakTotal) => {
        const d = new Date(Date.now())

        const workTime = work.split(':')
        const breakTime = breakTotal.split(':')

        const hourWork = Number(workTime[0])
        const minuteWork = Number(workTime[1])

        const hourBreak = Number(breakTime[0])
        const minuteBreak = Number(breakTime[1])

        const resultWork = new Date(d.getFullYear(), d.getMonth() + 1, d.getDate(), hourWork, minuteWork)
        const resultBreak = new Date(d.getFullYear(), d.getMonth() + 1, d.getDate(), hourBreak, minuteBreak)
        const resultTime = resultWork - resultBreak
        const hour = String(Math.floor(resultTime / 1000 / 60 / 60) < 0 ? 0 : Math.floor(resultTime / 1000 / 60 / 60))
        const minute = String(
            Math.floor((resultTime / 1000 / 60) % 60) < 0 ? 0 : Math.floor((resultTime / 1000 / 60) % 60),
        )

        const result = checkValue.two(hour) + ':' + checkValue.two(minute)

        convertDatas.work_total = result
        return result
    }

    let datas = {
        fullname: fullnameValue,
        staff_id: staffIdValue,
        time_in: (hourInValue || '--') + ':' + (minuteInValue || '--'),
        time_out: (hourOutValue || '--') + ':' + (minuteOutValue || '--'),
        date_in: (yearInValue || '----') + '-' + (monthInValue || '--') + '-' + (dayInValue || '--'),
        date_out: (yearOutValue || '----') + '-' + (monthOutValue || '--') + '-' + (dayOutValue || '--'),
        break_total: (hourBreakTotalValue || '--') + ':' + (minuteBreakTotalValue || '--'),
        work_time:
            checkValue.two(caculatorWorkTimeValue().hour) + ':' + checkValue.two(caculatorWorkTimeValue().minute),
        work_total: calculateWorkTotal(convertDatas.work_time, convertDatas.break_total),
    }

    const updateData = {
        time_id: convertDatas.time_id,
        fullname: convertDatas.fullname,
        staff_id: convertDatas.staff_id,
        time_in: convertDatas.time_in,
        time_out: convertDatas.time_out === '00:00' ? null : convertDatas.time_out,
        date_in: convertDatas.date_in,
        date_out: convertDatas.date_out === '0000-00-00' ? null : convertDatas.date_out,
        break_total: convertDatas.break_total,
        work_time: datas.work_time,
        work_total: datas.work_total,
        status: convertDatas.time_out === '00:00' ? 'online' : 'offline',
    }

    const styleInput = {
        disabled: { borderColor: 'transparent', backgroundColor: 'transparent', color: 'unset' },
        undisable: { border: 'solid 2px #00ff25' },
    }

    //focus
    useEffect(() => {
        staffIdRef.current.focus()
    }, [staffIdDisabled])

    useEffect(() => {
        yearInRef.current.focus()
    }, [dateInDisabled])

    useEffect(() => {
        hourInRef.current.focus()
    }, [timeInDisabled])

    useEffect(() => {
        hourOutRef.current.focus()
    }, [timeOutDisabled])

    useEffect(() => {
        yearOutRef.current.focus()
    }, [dateOutDisabled])

    useEffect(() => {
        hourBreakTotalRef.current.focus()
    }, [timeBreakTotalDisabled])

    useEffect(() => {
        fetch(baseURL + 'get-time', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                time_id: timeId,
            }),
        })
            .then((response) => response.json())
            // eslint-disable-next-line react-hooks/exhaustive-deps
            .then((datas) => {
                setDataUpdate(datas[0])
                const dateIn = datas[0].date_in.split('-')
                const timeIn = datas[0].time_in.split(':')
                let timeOut
                let dateOut
                if (datas[0].time_out === null || datas[0].date_out === null) {
                    timeOut = '--:--'.split(':')
                    dateOut = '----:--:--'.split(':')
                } else {
                    timeOut = datas[0].time_out.split(':')
                    dateOut = datas[0].date_out.split('-')
                }

                let breakTotal
                if (datas[0].break_total === null) {
                    setBreakTotalDatabase('--:--')
                    breakTotal = '--:--'.split(':')
                } else {
                    setBreakTotalDatabase(datas[0].break_total)
                    breakTotal = datas[0].break_total.split(':')
                }

                let breakIn1
                if (datas[0].break_in1 === null) {
                    breakIn1 = '--:--'
                } else {
                    breakIn1 = datas[0].break_in1
                }

                let breakIn2
                if (datas[0].break_in2 === null) {
                    breakIn2 = '--:--'
                } else {
                    breakIn2 = datas[0].break_in2
                }

                let breakOut1
                if (datas[0].break_out1 === null) {
                    breakOut1 = '--:--'
                } else {
                    breakOut1 = datas[0].break_out1
                }

                let breakOut2
                if (datas[0].break_out2 === null) {
                    breakOut2 = '--:--'
                } else {
                    breakOut2 = datas[0].break_out2
                }

                setFullnameValue(datas[0].fullname)
                setStaffIdValue(datas[0].staff_id)

                setYearInValue(dateIn[0])
                setMonthInValue(dateIn[1])
                setDayInValue(dateIn[2])

                setHourInValue(timeIn[0])
                setMinuteInValue(timeIn[1])

                setYearOutValue(dateOut[0])
                setMonthOutValue(dateOut[1])
                setDayOutValue(dateOut[2])

                setHourOutValue(timeOut[0])
                setMinuteOutValue(timeOut[1])

                setHourBreakTotalValue(breakTotal[0])
                setMinuteBreakTotalValue(breakTotal[1])

                setBreakIn1Value(breakIn1)
                setBreakOut1Value(breakOut1)

                setBreakIn2Value(breakIn2)
                setBreakOut2Value(breakOut2)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRefresh])

    //func
    const handleChanges = {
        fullName: () => {
            setFullnameValue(fullnameRef.current.value)
        },
        staffId: () => {
            setStaffIdValue(staffIdRef.current.value)
        },
        yearIn: () => {
            setYearInValue(yearInRef.current.value)
        },
        monthIn: () => {
            setMonthInValue(monthInRef.current.value)
        },
        dayIn: () => {
            setDayInValue(dayInRef.current.value)
        },
        yearOut: () => {
            setYearOutValue(yearOutRef.current.value)
        },
        monthOut: () => {
            setMonthOutValue(monthOutRef.current.value)
        },
        dayOut: () => {
            setDayOutValue(dayOutRef.current.value)
        },
        hourIn: () => {
            setHourInValue(hourInRef.current.value)
        },
        minuteIn: () => {
            setMinuteInValue(minuteInRef.current.value)
        },
        hourOut: () => {
            setHourOutValue(hourOutRef.current.value)
        },
        minuteOut: () => {
            setMinuteOutValue(minuteOutRef.current.value)
        },
        hourBreakTotal: () => {
            setHourBreakTotalValue(hourBreakTotalRef.current.value)
        },
        minuteBreakTotal: () => {
            setMinuteBreakTotalValue(minuteBreakTotalRef.current.value)
        },
    }

    //click
    const handleStaffIdEdit = (e) => {
        if (e.target.innerHTML === 'Xong') {
            setCount(count + 1)
            console.log(count)
            fetch(baseURL + `search-staff-id/${staffIdRef.current.value}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.length > 0) {
                        setFullnameValue(data[0].fullname)
                    } else {
                        toast.error(`Mã ${staffIdRef.current.value} này không tồn tại !`, {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                        return setStaffIdDisabled(false)
                    }
                })
        }
        staffIdDisabled === true ? setStaffIdDisabled(false) && staffIdRef.current.focus() : setStaffIdDisabled(true)
    }

    const handleDateInEdit = (e) => {
        setCount(count + 1)

        dateInDisabled === true ? setDateInDisabled(false) : setDateInDisabled(true)
    }

    const handleDateOutEdit = (e) => {
        setCount(count + 1)

        dateOutDisabled === true ? setDateOutDisabled(false) : setDateOutDisabled(true)
    }

    const handleTimeInEdit = (e) => {
        setCount(count + 1)

        timeInDisabled === true ? setTimeInDisabled(false) : setTimeInDisabled(true)
    }

    const handleTimeOutEdit = (e) => {
        setCount(count + 1)

        timeOutDisabled === true ? setTimeOutDisabled(false) : setTimeOutDisabled(true)
    }

    const handleTimeBeakTotalEdit = (e) => {
        setCount(count + 1)

        timeBreakTotalDisabled === true ? setTimeBreakTotalDisabled(false) : setTimeBreakTotalDisabled(true)
    }

    const handleRefresh = (e) => {
        setCount(0)
        setIsRefresh(!isRefresh)
        toast.success(`Đã làm mới dữ liệu ...`)
    }

    const handleDeleteData = (e) => {
        // eslint-disable-next-line no-restricted-globals
        if (!confirm('Dữ liệu này không thể khôi phục. Bạn thực sự muốn xoá ?')) {
            e.preventDefault()
            return false
        } else {
            fetch(baseURL + `delete-time/${timeId}`)
        }
    }

    const handleUpdateData = (e) => {
        if (
            staffIdDisabled === true &&
            timeInDisabled === true &&
            timeOutDisabled === true &&
            dateInDisabled === true &&
            dateOutDisabled === true &&
            timeBreakTotalDisabled === true
        ) {
            if (count === 0) {
                e.preventDefault()
                return toast.info('Dữ liệu không thay đổi !')
            }
            fetch(baseURL + 'update-time', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            })

            toast.success('Update thành công !')
            setCount(0)
        } else {
            e.preventDefault()
            return toast.error('Có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu !')
        }
    }

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            {/* <div className={cx('header')}>Chỉnh sửa thời gian</div> */}
            <div className={cx('headding')}>
                {datas.fullname}
                <button className={cx('action-btn', 'refresh-btn')} onClick={handleRefresh}>
                    <FontAwesomeIcon className={cx('refresh-icon')} icon={faArrowsRotate} />
                    Refresh
                </button>
            </div>
            <div className={cx('group')}>
                <div className={cx('group-items')}>
                    <div className={cx('group-item')}>
                        <label className={cx('group-item-title')}>Mã</label>
                        <input
                            className={cx('group-item-input')}
                            ref={staffIdRef}
                            type="text"
                            value={datas.staff_id}
                            onChange={handleChanges.staffId}
                            maxLength={3}
                            disabled={staffIdDisabled}
                            style={staffIdDisabled ? styleInput.disabled : styleInput.undisable}
                        />
                    </div>
                    <button className={cx('action-btn')} onClick={handleStaffIdEdit}>
                        {staffIdDisabled ? 'Sửa' : 'Xong'}
                    </button>
                </div>

                <div className={cx('group-items')}>
                    <div className={cx('group-item')}>
                        <label className={cx('group-item-title')}>Giờ check in</label>
                        <input
                            className={cx('group-item-input', 'group-item-input-time')}
                            ref={hourInRef}
                            type="text"
                            value={hourInValue}
                            onChange={handleChanges.hourIn}
                            maxLength={2}
                            disabled={timeInDisabled}
                            style={timeInDisabled ? styleInput.disabled : styleInput.undisable}
                        />
                        <span className={cx('hyphen-time')}>:</span>
                        <input
                            className={cx('group-item-input', 'group-item-input-time')}
                            ref={minuteInRef}
                            type="text"
                            value={minuteInValue}
                            onChange={handleChanges.minuteIn}
                            maxLength={2}
                            disabled={timeInDisabled}
                            style={timeInDisabled ? styleInput.disabled : styleInput.undisable}
                        />
                    </div>
                    <button className={cx('action-btn')} onClick={handleTimeInEdit}>
                        {timeInDisabled ? 'Sửa' : 'Xong'}
                    </button>
                </div>

                <div className={cx('group-items')}>
                    <div className={cx('group-item')}>
                        <label className={cx('group-item-title')}>Giờ check out</label>
                        <input
                            className={cx('group-item-input', 'group-item-input-time')}
                            ref={hourOutRef}
                            type="text"
                            value={hourOutValue}
                            onChange={handleChanges.hourOut}
                            maxLength={2}
                            disabled={timeOutDisabled}
                            style={timeOutDisabled ? styleInput.disabled : styleInput.undisable}
                        />
                        <span className={cx('hyphen-time')}>:</span>
                        <input
                            className={cx('group-item-input', 'group-item-input-time')}
                            ref={minuteOutRef}
                            type="text"
                            value={minuteOutValue}
                            onChange={handleChanges.minuteOut}
                            maxLength={2}
                            disabled={timeOutDisabled}
                            style={timeOutDisabled ? styleInput.disabled : styleInput.undisable}
                        />
                    </div>
                    <button className={cx('action-btn')} onClick={handleTimeOutEdit}>
                        {timeOutDisabled ? 'Sửa' : 'Xong'}
                    </button>
                </div>

                <div className={cx('group-items')}>
                    <div className={cx('group-item')}>
                        <label className={cx('group-item-title')}>Ngày bắt đầu</label>
                        <input
                            className={cx('group-item-input', 'group-item-input-date')}
                            ref={yearInRef}
                            type="text"
                            value={yearInValue}
                            onChange={handleChanges.yearIn}
                            maxLength={4}
                            disabled={dateInDisabled}
                            style={dateInDisabled ? styleInput.disabled : styleInput.undisable}
                        />
                        <span className={cx('hyphen')}>-</span>
                        <input
                            className={cx('group-item-input', 'group-item-input-date')}
                            ref={monthInRef}
                            type="text"
                            value={monthInValue}
                            onChange={handleChanges.monthIn}
                            maxLength={2}
                            disabled={dateInDisabled}
                            style={dateInDisabled ? styleInput.disabled : styleInput.undisable}
                        />
                        <span className={cx('hyphen')}>-</span>
                        <input
                            className={cx('group-item-input', 'group-item-input-date')}
                            ref={dayInRef}
                            type="text"
                            value={dayInValue}
                            onChange={handleChanges.dayIn}
                            maxLength={2}
                            disabled={dateInDisabled}
                            style={dateInDisabled ? styleInput.disabled : styleInput.undisable}
                        />
                    </div>
                    <button className={cx('action-btn')} onClick={handleDateInEdit}>
                        {dateInDisabled ? 'Sửa' : 'Xong'}
                    </button>
                </div>

                <div className={cx('group-items')}>
                    <div className={cx('group-item')}>
                        <label className={cx('group-item-title')}>Ngày kết thúc</label>
                        <input
                            className={cx('group-item-input', 'group-item-input-date')}
                            ref={yearOutRef}
                            type="text"
                            value={yearOutValue}
                            onChange={handleChanges.yearOut}
                            maxLength={4}
                            disabled={dateOutDisabled}
                            style={dateOutDisabled ? styleInput.disabled : styleInput.undisable}
                        />
                        <span className={cx('hyphen')}>-</span>
                        <input
                            className={cx('group-item-input', 'group-item-input-date')}
                            ref={monthOutRef}
                            type="text"
                            value={monthOutValue}
                            onChange={handleChanges.monthOut}
                            maxLength={2}
                            disabled={dateOutDisabled}
                            style={dateOutDisabled ? styleInput.disabled : styleInput.undisable}
                        />
                        <span className={cx('hyphen')}>-</span>
                        <input
                            className={cx('group-item-input', 'group-item-input-date')}
                            ref={dayOutRef}
                            type="text"
                            value={dayOutValue}
                            onChange={handleChanges.dayOut}
                            maxLength={2}
                            disabled={dateOutDisabled}
                            style={dateOutDisabled ? styleInput.disabled : styleInput.undisable}
                        />
                    </div>
                    <button className={cx('action-btn')} onClick={handleDateOutEdit}>
                        {dateOutDisabled ? 'Sửa' : 'Xong'}
                    </button>
                </div>

                {/* Giải lao */}
                <div className={cx('group-items', 'group-items--break')}>
                    <div className={cx('group-item')}>
                        <label className={cx('group-item-title')}>Thời gian giải lao</label>
                        <div className={cx('break-popover')}>
                            {breakTotalDatabase === datas.break_total ? (
                                <>
                                    <div className={cx('break-popover-item')}>
                                        <p>Lần 1:</p>
                                        <p>{breakIn1Value}</p>
                                        <p>đến</p>
                                        <p>{breakOut1Value}</p>
                                    </div>
                                    <div className={cx('break-popover-item')}>
                                        <p>Lần 2:</p>
                                        <p>{breakIn2Value}</p>
                                        <p>đến</p>
                                        <p>{breakOut2Value}</p>
                                    </div>
                                </>
                            ) : (
                                <p style={{ padding: '14px' }}>Đã có dữ liệu mới !</p>
                            )}
                        </div>
                        <input
                            className={cx('group-item-input', 'group-item-input-time')}
                            ref={hourBreakTotalRef}
                            type="text"
                            value={hourBreakTotalValue}
                            onChange={handleChanges.hourBreakTotal}
                            maxLength={2}
                            disabled={timeBreakTotalDisabled}
                            style={timeBreakTotalDisabled ? styleInput.disabled : styleInput.undisable}
                        />
                        <span className={cx('hyphen-time')}>:</span>
                        <input
                            className={cx('group-item-input', 'group-item-input-time')}
                            ref={minuteBreakTotalRef}
                            type="text"
                            value={minuteBreakTotalValue}
                            onChange={handleChanges.minuteBreakTotal}
                            maxLength={2}
                            disabled={timeBreakTotalDisabled}
                            style={timeBreakTotalDisabled ? styleInput.disabled : styleInput.undisable}
                        />
                    </div>
                    <button className={cx('action-btn')} onClick={handleTimeBeakTotalEdit}>
                        {timeBreakTotalDisabled ? 'Sửa' : 'Xong'}
                    </button>
                </div>

                <div className={cx('group-items')}>
                    <div className={cx('group-item')}>
                        <label className={cx('group-item-title')}>Thời gian làm việc</label>
                        <div className={cx('item-work-time')}>
                            {checkValue.two(caculatorWorkTimeValue().hour) < 0
                                ? '00'
                                : checkValue.two(caculatorWorkTimeValue().hour)}
                            <span className={cx('hyphen-work-time')}>:</span>
                            {checkValue.two(caculatorWorkTimeValue().minute) < 0
                                ? '00'
                                : checkValue.two(caculatorWorkTimeValue().minute)}
                        </div>
                    </div>
                </div>

                <div className={cx('group-items')}>
                    <div className={cx('group-item')}>
                        <label className={cx('group-item-title')}>Trừ giải lao còn</label>
                        <div className={cx('item-work-time')}>
                            {datas.work_total.split(':')[0] < 0 ? '00' : datas.work_total.split(':')[0]}
                            <span className={cx('hyphen-work-time')}>:</span>
                            {datas.work_total.split(':')[1] < 0 ? '00' : datas.work_total.split(':')[1]}
                        </div>
                    </div>
                </div>

                <div className={cx('group-items')}>
                    <div className={cx('group-item')}>
                        <label className={cx('group-item-title')}>Lần chỉnh sửa gần nhất</label>
                        <div className={cx('item-update-time')}>
                            {dataUpdate.update_date && (
                                <div>
                                    <p>{dataUpdate.update_date}</p>
                                    <p>{dataUpdate.update_time}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Link to={configRoutes.time} className={cx('update-btn')} onClick={handleUpdateData}>
                    Update
                </Link>

                <Link to={configRoutes.time} className={cx('delete-btn')} onClick={handleDeleteData}>
                    <FontAwesomeIcon icon={faTrashCan} style={{ paddingRight: '10px' }} />
                    Delete
                </Link>
            </div>
        </div>
    )
}
export default EditTime

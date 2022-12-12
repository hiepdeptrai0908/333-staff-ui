import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { baseURL } from '~/utils'
import styles from './EditTime.module.scss'

const cx = classNames.bind(styles)

function EditTime() {
    //state
    const timeId = Number(localStorage.getItem('time_id'))
    const [isRefresh, setIsRefresh] = useState(false)

    const [fullnameValue, setFullnameValue] = useState('')
    const [staffIdValue, setStaffIdValue] = useState('')
    const [staffIdDisabled, setStaffIdDisabled] = useState(true)

    const [hourInValue, setHourInValue] = useState('')
    const [minuteInValue, setMinuteInValue] = useState('')
    const [timeInDisabled, setTimeInDisabled] = useState(true)

    const [hourOutValue, setHourOutValue] = useState('')
    const [minuteOutValue, setMinuteOutValue] = useState('')
    const [timeOutDisabled, setTimeOutDisabled] = useState(true)

    const [dateInDisabled, setDateInDisabled] = useState(true)
    const [yearInValue, setYearInValue] = useState('')
    const [monthInValue, setMonthInValue] = useState('')
    const [dayInValue, setDayInValue] = useState('')

    const [dateOutDisabled, setDateOutDisabled] = useState(true)
    const [yearOutValue, setYearOutValue] = useState('')
    const [monthOutValue, setMonthOutValue] = useState('')
    const [dayOutValue, setDayOutValue] = useState('')

    const [hourBreakTotalValue, setHourBreakTotalValue] = useState('')
    const [minuteBreakTotalValue, setMinuteBreakTotalValue] = useState('')
    const [timeBreakTotalDisabled, setTimeBreakTotalDisabled] = useState(true)

    const [breakIn1Value, setBreakIn1Value] = useState('')
    const [breakOut1Value, setBreakOut1Value] = useState('')

    const [breakIn2Value, setBreakIn2Value] = useState('')
    const [breakOut2Value, setBreakOut2Value] = useState('')

    const [breakTotalValue, setBreakTotalValue] = useState('')
    const [workTotalValue, setWorkTotalValue] = useState('')

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
    const breakIn1Ref = useRef()
    const breakIn2Ref = useRef()
    const breakOut1Ref = useRef()
    const breakOut2Ref = useRef()
    const breakTotalRef = useRef()
    const work_totalRef = useRef()

    let datas = {
        fullname: fullnameValue,
        staff_id: staffIdValue,
        time_in: (hourInValue || '--') + ':' + (minuteInValue || '--'),
        time_out: (hourOutValue || '--') + ':' + (minuteOutValue || '--'),
        date_in: (yearInValue || '----') + '-' + (monthInValue || '--') + '-' + (dayInValue || '--'),
        date_out: (yearOutValue || '----') + '-' + (monthOutValue || '--') + '-' + (dayOutValue || '--'),
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
                const dateIn = datas[0].date_in.split('-')
                const timeIn = datas[0].time_in.split(':')
                let timeOut
                let dateOut
                if (datas[0].time_out === null) {
                    timeOut = '--:--'.split(':')
                    dateOut = '----:--:--'.split(':')
                } else {
                    timeOut = datas[0].time_out.split(':')
                    dateOut = datas[0].date_out.split('-')
                }

                let breakTotal
                if (datas[0].break_total === null) {
                    breakTotal = '--:--'.split(':')
                } else {
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

                setYearOutValue(dateOut[0])
                setMonthOutValue(dateOut[1])
                setDayOutValue(dateOut[2])

                setHourInValue(timeIn[0])
                setMinuteInValue(timeIn[1])

                setHourOutValue(timeOut[0])
                setMinuteOutValue(timeOut[1])

                setHourBreakTotalValue(breakTotal[0])
                setMinuteBreakTotalValue(breakTotal[1])

                setBreakIn1Value(breakIn1)
                setBreakOut1Value(breakOut1)

                setBreakIn2Value(breakIn2)
                setBreakOut2Value(breakOut2)
            })
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

    const prevFullname = [...fullnameValue]

    //click
    const handleStaffIdEdit = (e) => {
        if (e.target.innerHTML === 'Xong') {
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
        dateInDisabled === true ? setDateInDisabled(false) : setDateInDisabled(true)
    }

    const handleDateOutEdit = (e) => {
        dateOutDisabled === true ? setDateOutDisabled(false) : setDateOutDisabled(true)
    }

    const handleTimeInEdit = (e) => {
        timeInDisabled === true ? setTimeInDisabled(false) : setTimeInDisabled(true)
    }

    const handleTimeOutEdit = (e) => {
        timeOutDisabled === true ? setTimeOutDisabled(false) : setTimeOutDisabled(true)
    }

    const handleTimeBeakTotalEdit = (e) => {
        timeBreakTotalDisabled === true ? setTimeBreakTotalDisabled(false) : setTimeBreakTotalDisabled(true)
    }

    const handleRefresh = (e) => {
        setIsRefresh(!isRefresh)
        toast.success(`Đã làm mới dữ liệu ...`)
    }

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div className={cx('header')}>Chỉnh sửa thời gian</div>
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
            </div>
        </div>
    )
}
export default EditTime

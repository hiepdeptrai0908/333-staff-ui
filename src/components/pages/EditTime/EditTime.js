import classNames from 'classnames/bind'
import { useEffect, useState, useRef } from 'react'
import { baseURL } from '~/utils'
import styles from './EditTime.module.scss'

const cx = classNames.bind(styles)

function EditTime() {
    const timeId = Number(localStorage.getItem('time_id'))
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
    const [yearValue, setYearValue] = useState('')
    const [monthValue, setMonthValue] = useState('')
    const [dayValue, setDayValue] = useState('')

    const [dateOutValue, setDateOutValue] = useState('')
    const [breakIn1Value, setBreakIn1Value] = useState('')
    const [breakIn2Value, setBreakIn2Value] = useState('')
    const [breakTotalValue, setBreakTotalValue] = useState('')
    const [workTotalValue, setWorkTotalValue] = useState('')

    const fullnameRef = useRef()
    const staffIdRef = useRef()
    const hourInRef = useRef()
    const minuteInRef = useRef()

    const yearRef = useRef()
    const monthRef = useRef()
    const dayRef = useRef()

    const hourOutRef = useRef()
    const minuteOutRef = useRef()

    const dateOutRef = useRef()
    const breakIn1Ref = useRef()
    const breakIn2Ref = useRef()
    const breakOut1Ref = useRef()
    const breakOut2Ref = useRef()
    const breakTotalRef = useRef()
    const work_totalRef = useRef()

    let data = {
        fullname: fullnameValue,
        staff_id: staffIdValue,
        date_in: (yearValue || '0000') + '-' + (monthValue || '00') + '-' + (dayValue || '00'),
        time_in: (hourInValue || '00') + ':' + (minuteInValue || '00'),
        time_out: (hourOutValue || '00') + ':' + (minuteOutValue || '00'),
    }

    console.log(data)

    const styleInput = {
        disabled: { borderColor: 'transparent', backgroundColor: 'transparent', color: 'unset' },
        undisable: { border: 'solid 2px #00ff25' },
    }

    useEffect(() => {
        staffIdRef.current.focus()
    }, [staffIdDisabled])

    useEffect(() => {
        yearRef.current.focus()
    }, [dateInDisabled])

    useEffect(() => {
        hourInRef.current.focus()
    }, [timeInDisabled])

    useEffect(() => {
        hourOutRef.current.focus()
    }, [timeOutDisabled])

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
                const date = datas[0].date_in.split('-')
                const timeIn = datas[0].time_in.split(':')
                const timeOut = datas[0].time_out.split(':')
                setFullnameValue(datas[0].fullname)
                setStaffIdValue(datas[0].staff_id)
                setYearValue(date[0])
                setMonthValue(date[1])
                setDayValue(date[2])
                setHourInValue(timeIn[0])
                setMinuteInValue(timeIn[1])
                setHourOutValue(timeOut[0])
                setMinuteOutValue(timeOut[1])
            })
    }, [timeId])

    const handleChanges = {
        fullName: () => {
            setFullnameValue(fullnameRef.current.value)
        },
        staffId: () => {
            setStaffIdValue(staffIdRef.current.value)
        },
        year: () => {
            setYearValue(yearRef.current.value)
        },
        month: () => {
            setMonthValue(monthRef.current.value)
        },
        day: () => {
            setDayValue(dayRef.current.value)
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
    }

    const handleStaffIdEdit = (e) => {
        if (e.target.innerHTML === 'Xong') {
            fetch(baseURL + `search-staff-id/${staffIdRef.current.value}`)
                .then((response) => response.json())
                .then((data) => setFullnameValue(data[0].fullname))
        }
        staffIdDisabled === true ? setStaffIdDisabled(false) && staffIdRef.current.focus() : setStaffIdDisabled(true)
    }

    const handleDateInEdit = (e) => {
        dateInDisabled === true ? setDateInDisabled(false) : setDateInDisabled(true)
    }

    const handleTimeInEdit = (e) => {
        timeInDisabled === true ? setTimeInDisabled(false) : setTimeInDisabled(true)
    }

    const handleTimeOutEdit = (e) => {
        timeOutDisabled === true ? setTimeOutDisabled(false) : setTimeOutDisabled(true)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>Chỉnh sửa thời gian</div>
            <div className={cx('headding')}>{data.fullname}</div>
            <div className={cx('group')}>
                <div className={cx('group-items')}>
                    <div className={cx('group-item')}>
                        <label className={cx('group-item-title')}>Mã</label>
                        <input
                            className={cx('group-item-input')}
                            ref={staffIdRef}
                            type="text"
                            value={data.staff_id}
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
                        <label className={cx('group-item-title')}>Ngày</label>
                        <input
                            className={cx('group-item-input', 'group-item-input-date')}
                            ref={yearRef}
                            type="text"
                            value={yearValue}
                            onChange={handleChanges.year}
                            maxLength={4}
                            disabled={dateInDisabled}
                            style={dateInDisabled ? styleInput.disabled : styleInput.undisable}
                        />
                        <span className={cx('hyphen')}>-</span>
                        <input
                            className={cx('group-item-input', 'group-item-input-date')}
                            ref={monthRef}
                            type="text"
                            value={monthValue}
                            onChange={handleChanges.month}
                            maxLength={2}
                            disabled={dateInDisabled}
                            style={dateInDisabled ? styleInput.disabled : styleInput.undisable}
                        />
                        <span className={cx('hyphen')}>-</span>
                        <input
                            className={cx('group-item-input', 'group-item-input-date')}
                            ref={dayRef}
                            type="text"
                            value={dayValue}
                            onChange={handleChanges.day}
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
                        <label className={cx('group-item-title')}>Giờ vào</label>
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
                        <label className={cx('group-item-title')}>Giờ ra</label>
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
            </div>
        </div>
    )
}
export default EditTime

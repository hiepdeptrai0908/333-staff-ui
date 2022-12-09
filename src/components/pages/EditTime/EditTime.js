import classNames from 'classnames/bind'
import { useEffect, useState, useRef } from 'react'
import { baseURL } from '~/utils'
import styles from './EditTime.module.scss'

const cx = classNames.bind(styles)

function EditTime() {
    const timeId = Number(localStorage.getItem('time_id'))
    const [fullnameValue, setFullnameValue] = useState('')
    const [staffIdValue, setStaffIdValue] = useState('')
    const [timeInValue, setTimeInValue] = useState('')
    const [timeOutValue, setTimeOutValue] = useState('')
    const [dateInValue, setDateInValue] = useState('')
    const [dateOutValue, setDateOutValue] = useState('')
    const [breakIn1Value, setBreakIn1Value] = useState('')
    const [breakIn2Value, setBreakIn2Value] = useState('')
    const [breakTotalValue, setBreakTotalValue] = useState('')
    const [workTotalValue, setWorkTotalValue] = useState('')

    const fullnameRef = useRef()
    const staffIdRef = useRef()
    const timeInRef = useRef()
    const timeOutRef = useRef()
    const dateInRef = useRef()
    const dateOutRef = useRef()
    const breakIn1Ref = useRef()
    const breakIn2Ref = useRef()
    const breakOut1Ref = useRef()
    const breakOut2Ref = useRef()
    const breakTotalRef = useRef()
    const work_totalRef = useRef()

    let data = {
        fullname: fullnameValue,
        staffId: staffIdValue,
    }

    console.log(data)

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
                setFullnameValue(datas[0].fullname)
                setStaffIdValue(datas[0].staff_id)
            })
    }, [timeId])

    const handleChanges = {
        fullName: () => {
            setFullnameValue(fullnameRef.current.value)
        },
        staffId: () => {
            setStaffIdValue(staffIdRef.current.value)
        },
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>Chỉnh sửa thời gian</div>
            <div className={cx('group')}>
                <div className={cx('group-item')}>
                    <label className={cx('group-item-title')}>Họ và Tên</label>
                    <input ref={fullnameRef} type="text" value={data.fullname} onChange={handleChanges.fullName} />
                </div>
                <div className={cx('group-item')}>
                    <label className={cx('group-item-title')}>Mã nhân viên</label>
                    <input ref={staffIdRef} type="text" value={data.staff_id} onChange={handleChanges.staffId} />
                </div>
            </div>
        </div>
    )
}
export default EditTime

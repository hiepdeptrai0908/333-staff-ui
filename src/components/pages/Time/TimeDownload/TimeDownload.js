import className from 'classnames/bind'
import { useRef, useEffect, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot, faDownload, faRightLong, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'

import styles from './TimeDownload.module.scss'
import images from '~/assets/images'
import { baseURL } from '~/utils'
import NoDataImage from '~/components/NoDataImage'
import { toast } from 'react-toastify'

const cx = className.bind(styles)

const dateValues = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
]
const monthValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const yearValues = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]

function TimeDownload() {
    const [searchAction, setSearchAction] = useState(sessionStorage.getItem('searchTimeAction') || 'today')
    const [datas, setDatas] = useState([])
    const contentRef = useRef()
    const dayRef = useRef()
    const monthRef = useRef()
    const yearRef = useRef()

    // get time today
    const date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()

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

            fetch(baseURL + 'time/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchData),
            })
                .then((response) => response.json())
                .then((datas) => {
                    setDatas([...datas])
                })
            return
        }
        const fetchApi = fetch(baseURL + searchAction)
        fetchApi.then((response) => response.json()).then((datas) => setDatas([...datas]))
    }, [searchAction])

    const handleSearchClick = (e) => {
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
        fetch(baseURL + 'time/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchData),
        })
            .then((response) => response.json())
            .then((datas) => {
                setDatas([...datas])
            })
    }

    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
    })
    return (
        <div className={cx('wrapper')}>
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
                <img className={cx('background-image')} alt="background" src={images.logo} />
                <div className={cx('content-heading')}>Danh sách thời gian làm việc</div>
                {datas.length !== 0 ? (
                    <table id="list-time" className={cx('styled-table')}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>コード</th>
                                <th>氏名</th>
                                <th>出勤日</th>
                                <th>出勤</th>
                                <th>退勤</th>
                                <th>休憩</th>
                                <th>合計</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={cx('table-data')} style={{ fontWeight: '600', width: '20px' }}>
                                            {index + 1}
                                        </td>
                                        <td className={cx('table-data')}>{data.staff_id}</td>
                                        <td className={cx('table-data')}>{data.fullname}</td>
                                        <td className={cx('table-data')}>{data.date_in}</td>
                                        <td className={cx('table-data')}>{data.time_in}</td>
                                        <td className={cx('table-data')}>
                                            {data.time_out || <span style={{ color: '#079d07' }}>Đang làm</span>}
                                        </td>
                                        <td className={cx('table-data')}>
                                            {data.break_total === '00:00' ? '' : data.break_total || ''}
                                        </td>
                                        <td className={cx('table-data')}>{data.work_total || '00:00'}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                ) : (
                    <NoDataImage />
                )}
                <div className={cx('download-day')}>
                    <span className={cx('download-day-title')}>Được tải xuống ngày</span>{' '}
                    {day < 10 ? String('0' + day) : day}/{month < 10 ? String('0' + month) : month}/{year} vào lúc{' '}
                    {hour < 10 ? String('0' + hour) : hour}:{minute < 10 ? String('0' + minute) : minute}
                </div>
            </div>
            <button onClick={handlePrint} className={cx('download-btn')}>
                <FontAwesomeIcon className={cx('download-icon')} icon={faDownload} />
                Tải file PDF
            </button>
        </div>
    )
}

export default TimeDownload

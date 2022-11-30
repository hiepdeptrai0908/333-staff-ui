import className from 'classnames/bind'
import { useRef, useEffect, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot, faDownload, faRightLong } from '@fortawesome/free-solid-svg-icons'

import styles from './Time.module.scss'
import images from '~/assets/images'
import { baseURL } from '~/utils'
import NoDataImage from '~/components/NoDataImage'

const cx = className.bind(styles)

const dateValues = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
]
const monthValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const yearValues = [2022, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]

function Time() {
    console.log(images)
    const [show, setShow] = useState('today')
    const contentRef = useRef()

    const handleClick = (e) => {
        const actionElement = document.querySelector(`.${cx('active')}`)
        actionElement.classList.remove(cx('active'))
        e.target.classList.add(cx('active'))
        e.target.name === 'today' ? setShow('today') : setShow('online')
    }

    const [datas, setDatas] = useState([])
    useEffect(() => {
        const fetchApi = fetch(baseURL + show)
        fetchApi.then((response) => response.json()).then((datas) => setDatas([...datas]))
    }, [show])

    const handleDetalClick = (e) => {
        const detal = document.querySelector(`.${cx('detal-show')}`)
        if (detal) {
            detal.classList.remove(cx('detal-show'))
        } else {
            e.target.classList.add(cx('detal-show'))
        }
    }

    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
    })
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
                    <select className={cx('date-item')}>
                        <option>Ngày</option>
                        {dateValues.map((date, index) => {
                            return (
                                <option key={index} value={date}>
                                    {date}
                                </option>
                            )
                        })}
                    </select>
                    <select className={cx('date-item')}>
                        <option>Tháng</option>
                        {monthValues.map((month, index) => {
                            return (
                                <option key={index} value={month}>
                                    {month}
                                </option>
                            )
                        })}
                    </select>
                    <select className={cx('date-item')}>
                        {yearValues.map((year, index) => {
                            return (
                                <option key={index} value={year}>
                                    {year}
                                </option>
                            )
                        })}
                    </select>
                    <button className={cx('date-item', 'date-time-btn')}>Tìm kiếm</button>
                </div>
            </div>
            <div className={cx('content')} ref={contentRef}>
                {datas.length !== 0 ? (
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
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((data, index) => {
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
                                                            <span className={cx('date')}>{data.date_in}</span>
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
                                                                    'Chưa kết thúc giải lao'
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
                                                    <div className={cx('group-data')}>{data.break_total}</div>
                                                </div>
                                                <div className={cx('popover-group')}>
                                                    <div className={cx('group-title')}>合計勤怠 (2)</div>
                                                    <div className={cx('group-data')}>{data.work_time}</div>
                                                </div>
                                                <div className={cx('popover-group')}>
                                                    <div className={cx('group-title')}>時間　(2-1)</div>
                                                    <div className={cx('group-data')}>{data.work_total}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={cx('table-data')}>
                                            <button className={cx('update-btn')}>Edit</button>
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
            <button onClick={handlePrint} className={cx('download-btn')}>
                <FontAwesomeIcon className={cx('download-icon')} icon={faDownload} />
                Tải file PDF
            </button>
        </div>
    )
}

export default Time

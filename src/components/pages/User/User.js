import className from 'classnames/bind'
import { useReactToPrint } from 'react-to-print'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { baseURL } from '~/utils'
import styles from './User.module.scss'
import { useEffect, useState, useRef } from 'react'
import NoDataImage from '~/components/NoDataImage'
const cx = className.bind(styles)

function User() {
    const contentRef = useRef()
    const [datas, setDatas] = useState([])
    useEffect(() => {
        const fetchApi = fetch(baseURL + 'get-accounts')
        fetchApi.then((response) => response.json()).then((datas) => setDatas([...datas]))
    }, [])

    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
    })
    return (
        <div className={cx('wrapper')} ref={contentRef}>
            <div className={cx('header')}>Danh sách nhân viên</div>
            <div className={cx('content')}>
                {datas.length !== 0 ? (
                    <table className={cx('styled-table')}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã số</th>
                                <th>Họ và Tên</th>
                                <th>Giới tính</th>
                                <th>Ngày sinh</th>
                                <th>Số điện thoại</th>
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
                                        <td className={cx('table-data')}>{data.staff_id}</td>
                                        <td className={cx('table-data')}>{data.fullname}</td>
                                        <td className={cx('table-data')}>{data.sex}</td>
                                        <td className={cx('table-data')}>{data.birthday}</td>
                                        <td className={cx('table-data')}>{data.phone_number}</td>
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
                <button onClick={handlePrint} className={cx('download-btn')}>
                    <FontAwesomeIcon className={cx('download-icon')} icon={faDownload} />
                    Tải file PDF
                </button>
            </div>
        </div>
    )
}

export default User

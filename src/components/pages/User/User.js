/* eslint-disable react-hooks/exhaustive-deps */
import className from 'classnames/bind'
import { useReactToPrint } from 'react-to-print'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faClose } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { baseURL } from '~/utils'
import styles from './User.module.scss'
import NoDataImage from '~/components/NoDataImage'
import configRoutes from '~/config/routes'
import Loading from '~/components/Loading'
const cx = className.bind(styles)

function User() {
    const [datas, setDatas] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const [wantToProfileUser, setWantToProfileUser] = useState([])
    const [adminAccount, setAdminAccount] = useState({})
    const [loginUsernameValue, setLoginUsernameValue] = useState('')
    const [loginPasswordValue, setLoginPasswordValue] = useState('')
    const [loading, setLoading] = useState(false)

    const contentRef = useRef()
    const loginUserRef = useRef()
    const loginPasswordRef = useRef()
    const loginBtnRef = useRef()

    useEffect(() => {
        const fetchApi = fetch(baseURL + 'get-accounts')
        fetchApi
            .then((response) => response.json())
            .then((datas) => {
                setLoading(true)
                setDatas([...datas])
            })

        const getAdmin = fetch(baseURL + 'admin-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        })
        getAdmin
            .then((response) => response.json())
            .then((data) => {
                setAdminAccount(data[0])
            })
        setLoading(false)
    }, [])

    const handleLogin = (e) => {
        if (loginUserRef.current.value === '' || loginPasswordRef.current.value === '') {
            e.preventDefault()
            return toast.warning('Tài khoản, mật khẩu không được để trống !')
        } else {
            if (
                (loginUsernameValue === wantToProfileUser[0].username &&
                    loginPasswordValue === wantToProfileUser[0].password) ||
                (loginUsernameValue === adminAccount.username && loginPasswordValue === adminAccount.password)
            ) {
                sessionStorage.setItem('isLogin', 'true')
                loginBtnRef.current.click()
            } else {
                e.preventDefault()
                toast.error('Đăng nhập thất bại !')
                loginUserRef.current.value = ''
                loginPasswordRef.current.value = ''
                loginUserRef.current.focus()
            }
        }
    }

    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
    })
    return (
        <div className={cx('wrapper')} ref={contentRef}>
            <div className={cx('header')}>Danh sách nhân viên</div>
            <div className={cx('content')}>
                {loading ? (
                    datas.length !== 0 ? (
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
                                            <td
                                                className={cx('table-data')}
                                                style={{ fontWeight: '600', width: '20px' }}
                                            >
                                                {index + 1}
                                            </td>
                                            <td className={cx('table-data')}>{data.staff_id}</td>
                                            <td className={cx('table-data')}>{data.fullname}</td>
                                            <td className={cx('table-data')}>{data.sex}</td>
                                            <td className={cx('table-data')}>{data.birthday}</td>
                                            <td className={cx('table-data')}>{data.phone_number}</td>
                                            <td className={cx('table-data')}>
                                                <button
                                                    onClick={(e) => {
                                                        setIsShowModal(!isShowModal)
                                                        localStorage.setItem('userId', JSON.stringify(data.user_id))
                                                        setWantToProfileUser(
                                                            datas.filter((user) => {
                                                                return user.staff_id === data.staff_id
                                                            }),
                                                        )
                                                    }}
                                                    className={cx('info-btn')}
                                                >
                                                    Chi tiết
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <NoDataImage />
                    )
                ) : (
                    <Loading />
                )}

                <div className={cx('modal-wrapper')} style={{ display: isShowModal ? 'flex' : 'none' }}>
                    <div className={cx('modal-box')}>
                        <div className={cx('heading')}>Đăng nhập</div>
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
                                    to={configRoutes.info}
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
        </div>
    )
}

export default User

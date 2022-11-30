import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'

import { Fragment, useRef, useState, useEffect } from 'react'
import styles from './Search.module.scss'
import { baseURL } from '~/utils'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const cx = classNames.bind(styles)

export let userInfo

function Search() {
    const nextBtnClass = 'out-right'
    const [searchValue, setSearchValue] = useState('')
    const [outRightClass, setOutRightClass] = useState(undefined)
    const [user, setUser] = useState({})

    const resetUserTime = 300000
    const inputRef = useRef()

    const handleChange = (e) => {
        const searchValue = e.target.value
        !searchValue.startsWith(' ') && setSearchValue(searchValue)
    }
    const resetUser = () => {
        setTimeout(() => {
            setUser({})
            userInfo = null
        }, resetUserTime)
    }

    const handleClick = () => {
        const fetchApi = fetch(baseURL + `search-staff-id/${searchValue}`)
            .then((response) => response.json())
            .then((data) => {
                userInfo = data[0]
                if (userInfo.staff_id) {
                    toast.success(userInfo.fullname + ' đã đăng nhập thành công.', {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                    resetUser()
                } else {
                    toast.error('Mã nhân viên không đúng !', {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                    setUser({})
                    userInfo = undefined
                }

                return setUser(data[0])
            })
            .catch((error) => {
                toast.error('Mã nhân viên không đúng !', {
                    position: toast.POSITION.TOP_RIGHT,
                })
                setUser({})
                userInfo = undefined
            })

        setSearchValue('')
        inputRef.current.focus()
        return fetchApi
    }

    function ClickFc() {
        setOutRightClass(nextBtnClass)
        setTimeout(() => {
            handleClick()
            setOutRightClass(undefined)
        }, 1500)
    }

    function handleKeypress(e) {
        if (e.charCode === 13) {
            ClickFc()
        }
    }

    return (
        <Fragment>
            <div className={cx('search')}>
                <input
                    id="staff-id"
                    ref={inputRef}
                    value={searchValue}
                    onChange={handleChange}
                    onKeyPress={handleKeypress}
                    className={cx('search-input')}
                    type="number"
                    placeholder="Nhập mã số nhân viên..."
                    autoComplete="off"
                />
                <FontAwesomeIcon
                    id="next-btn"
                    className={cx('search-icon', outRightClass)}
                    onClick={ClickFc}
                    icon={faArrowCircleRight}
                />
                <ToastContainer />
            </div>
            {user.fullname ? (
                <div className={cx('staff-name')}>
                    Xin chào<span>{user.fullname}</span>
                </div>
            ) : (
                <></>
            )}
        </Fragment>
    )
}

export default Search

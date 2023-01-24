import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'

import { Fragment, useContext, useRef, useState } from 'react'
import styles from './Search.module.scss'
import { baseURL } from '~/utils'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserContext from '~/context/UserContext'

const cx = classNames.bind(styles)

function Search() {
    const { userInfo, setUserInfo } = useContext(UserContext)
    const nextBtnClass = 'out-right'
    const [searchValue, setSearchValue] = useState('')
    const [outRightClass, setOutRightClass] = useState(undefined)
    const inputRef = useRef()

    const handleChange = (e) => {
        const searchValue = e.target.value
        !searchValue.startsWith(' ') && setSearchValue(searchValue)
    }

    const handleClick = () => {
        const fetchApi = fetch(baseURL + `search-staff-id/${searchValue}`)
            .then((response) => response.json())
            .then((data) => {
                if (data[0].staff_id) {
                    setUserInfo(data[0])
                    toast.success(data[0].fullname + ' đã đăng nhập thành công.', {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                    setTimeout(() => {
                        setUserInfo(undefined)
                    }, 60 * 1000)
                } else {
                    toast.error('Mã nhân viên không đúng !', {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                    setUserInfo(undefined)
                }
            })
            .catch((error) => {
                toast.error('Mã nhân viên không đúng !', {
                    position: toast.POSITION.TOP_RIGHT,
                })
                setUserInfo(undefined)
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
            {userInfo?.fullname ? (
                <div className={cx('staff-name')}>
                    Xin chào<span>{userInfo.fullname}</span>
                </div>
            ) : (
                <></>
            )}
        </Fragment>
    )
}

export default Search

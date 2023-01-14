import './GlobalStyles.scss'
import images from '~/assets/images'

function GlobalStyles({ children }) {
    const backgroundLink = localStorage.getItem('bg') || 'goldBg'

    const htmlEl = document.getElementsByTagName('html')[0]
    htmlEl.style.backgroundImage = `url('${images[backgroundLink]}')`
    return children
}

export default GlobalStyles

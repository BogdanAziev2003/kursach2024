import { Link } from "react-router-dom"

function Header() {
  return (
    <div className="header">
      <div className="header__main">
        <div className="header__elem">
          <Link to="/">Безработные</Link>
        </div>
        <div className="header__elem">
          <Link to="/vacancy">Вакансии</Link>
        </div>
      </div>
      <div className="header__elem">
        <Link to="/archive">Архив</Link>
      </div>
    </div>
  )
}

export default Header

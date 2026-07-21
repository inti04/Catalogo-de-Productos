import Cart from '../Cart/Cart';
import Nav from '../Nav/Nav';
import Search from '../Search/Search';
import './Header.css';
import logo from '../../assets/icon.png';

const Header = () => {
    return (
        <header className="header">
            <div className="header__logo-container">
                <img className="header__logo" src={logo} alt="logo" />
            </div>           
            <Search /> 
            <Cart />
            <Nav />
        </header>
    );
};

export default Header;
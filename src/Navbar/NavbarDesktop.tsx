import {useCallback} from "react"
import { useGeneralContext } from '../context/GeneralContext';
import './Navbar.css';


function NavbarDesktop() {
  const { isOpen, setIsOpenMenu, mainScroller } = useGeneralContext(); 

   const handleNavLinkClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    
    if (!mainScroller) {
      console.warn("ScrollSmoother not ready yet.");
      return;
    }
    const link = event.currentTarget;
    const target = link.getAttribute('href');
    if (!target || !target.startsWith('#')) return;

     //const offset = parseInt(link.dataset.offset || '0', 10);

      mainScroller.scrollTo(target, true); 


  }, [mainScroller]); 
  return (
    <>
        <nav>
            <a className="nav-link" href="#info-section" onClick={handleNavLinkClick}>about us</a>
            <a className="nav-link" href="#story-section">our story</a>
            <a className="nav-link" href="#team-section">team</a>
            <a className="nav-link" href="#governance-section" data-offset="100">governance</a>
            <a className="schedule" href="https://schedule.swansonreservecapital.com/" target="_blank">
                <img src="/icons/schedule_icon.svg" alt="" loading="lazy" width="12" height="12"/>
                schedule
            </a>
        </nav>
      <button onClick={() => { setIsOpenMenu(!isOpen) }} id="hamburger" aria-label="Open Menu">
            <span></span>
            <span></span>
      </button>
    </>
  );
}

export default NavbarDesktop;
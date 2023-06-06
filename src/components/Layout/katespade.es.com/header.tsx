import * as React from "react";
import LocatorBread from "../../../components/locatorPage/katespade.es.com/LocatorBread";
import { svgIcons } from "../../../assets/svgs/svgIcon";
import { TEMP_SETTINGS } from "../../config/katespade.es.com/globalConfig";
import { Link } from "@yext/pages/components";

type HeaderLink = {
  link: string;
  label: string;
};

type headerProps = {
  headerLinks: HeaderLink[] | undefined;
  title:string
};

const Header = (props: headerProps) => {
  const { headerLinks,title } = props;

  React.useEffect(() => {
    document.body.setAttribute("id", "body");
  });

  const toggle = () => {
    document.body.classList.toggle("menu-opened");
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="mid-nav menu-item">
          <LocatorBread  title={title}/>
          <div className="logo">
            <Link href={TEMP_SETTINGS.URL}>{svgIcons?.mainLogo}</Link>
          </div>
        </div>
        <div className="navbar">
          <div className="mobile-menu-btn lg:hidden">
            <button type="button" onClick={toggle} name="toggle-button">
              <span></span>
              <span></span>
            </button>
          </div>
          <div className="Locator-mobileHero" id="Locator-mobileHero"></div>
          <div className="mid-nav">
            {headerLinks?.map((e: HeaderLink, i: number) => {
              return (
                <div key={i} className="menu-item">
                  <Link key={i} href={e.link} className="">
                    {e.label}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="header-right-link">
         
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;

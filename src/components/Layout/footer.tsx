import * as React from "react";
import { Link } from "@yext/pages/components";
import { svgIcons } from  "../../assets/svgs/svgIcon";
import { Links, footerLinks } from "../../types/Types";

export type footer = {
  footerBottomLinks: Links[];
  footerLinks: footerLinks[];
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  Pintres: string;
  copyrightText: string;
};

const Footer = (props: footer) => {
  const {
    footerLinks,
    footerBottomLinks,
    facebook,
    instagram,
    twitter,
    youtube,
    Pintres,
    copyrightText,
  } = props;

  const myAccountLinks: footerLinks[] = [];
  const otherLinks: footerLinks[] = [];
  for (let i = 0; i < footerLinks.length; i++) {
    if (
      footerLinks[i].sectionHeader === "MY ACCOUNT" ||
      footerLinks[i].sectionHeader === "GIFT CARDS"
    ) {
      myAccountLinks.push(footerLinks[i]);
    } else {
      otherLinks.push(footerLinks[i]);
    }
  }
  return (
    <>
      <hr></hr>
      <div className="subfooter-sec">
        <div className="container">
          <div className="subfooter-inner">
            <div className="subfooter-links">
              <div className="subChild">
                <div className="group-first">
                  {myAccountLinks ? (
                    myAccountLinks.map((item: footerLinks, index: number) => {
                      return (
                        <div key={index} className="quickLinks">
                          <h6>
                            {item.sectionHeader ? item.sectionHeader : ""}
                          </h6>
                          <ul>
                            {item.links
                              ? item.links.map(
                                  (element: Links, indexInner: number) => {
                                    return (
                                      <li key={"inner-" + indexInner}>
                                        <Link
                                          className="footer-2"
                                          href={element.link}
                                        >
                                          {element.label}
                                        </Link>
                                      </li>
                                    );
                                  }
                                )
                              : ""}
                          </ul>
                        </div>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>

                {otherLinks ? (
                  otherLinks.map((item: footerLinks, index: number) => {
                    return (
                      <>
                        <div key={index} className="quickLinks">
                          <h6>
                            {item.sectionHeader ? item.sectionHeader : ""}
                          </h6>
                          <ul>
                            {item.links
                              ? item.links.map(
                                  (element: Links, indexInner: number) => {
                                    return (
                                      <li key={"inner-" + indexInner}>
                                        <Link
                                          className="footer-2"
                                          href={element.link}
                                        >
                                          {element.label}
                                        </Link>
                                      </li>
                                    );
                                  }
                                )
                              : ""}
                          </ul>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
              <div className="social-links">
                <ul className="social-links">
                  <li>
                    <Link href={instagram}>
                      <div className="block">{svgIcons.InstaIcon}</div>
                    </Link>
                  </li>
                  <li>
                    <Link href={facebook}>
                      <div className="block">{svgIcons.fbIcon}</div>
                    </Link>
                  </li>
                  <li>
                    <Link href={twitter}>
                      <div className="block">{svgIcons.twitterIcons}</div>
                    </Link>
                  </li>
                  <li>
                    <Link href={Pintres}>
                      <div className="block PintrestIcons">
                        {svgIcons.PintrestIcons}
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href={youtube}>
                      <div className="block">{svgIcons.youtubeIcons}</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <span></span>
        </div>
      </div>
      <footer className="footer">
        
      <span className="flex footer-company flex-row footerbottomLinks">  
            {footerBottomLinks.map((e, index) => {
            
                return (
                  <Link key={index} className="footer-2 footerbottomLinks" href={e.link}>
                    {e.label}
                  </Link>
                );
            })}
           
         
        <button id="ot-sdk" className="ot-sdk-show-settings footerbottomLinks manage-cookies">{"manage cookies"}</button>
       <br></br> {copyrightText}
      </span>
        
      </footer>
    </>
  );
};
export default Footer;

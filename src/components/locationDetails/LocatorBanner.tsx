import * as React from "react";
import { svgIcons } from "../../assets/svgs/svgIcon";
type BannerProps = {
  locatorTitleH1: string;
  banner: string;
};

const Banner = (props: BannerProps) => {
  const { locatorTitleH1, banner } = props;
  return (
    <>
      <div className="hero mx-auto with-opacity">
        { banner ? <img className="heroBanner" src={banner} alt="hero banner" /> : svgIcons.locatorBanner }
        <div className="hero-content" id="hero-content-store">
          <h1>{locatorTitleH1 ? locatorTitleH1 : " Your Nearest"}</h1>
        </div>
      </div>
    </>
  );
};
export default Banner;

import { ComplexImageType, Image, ImageType } from "@yext/pages/components";
import * as React from "react";

type ServiceData = {
  photo?: ComplexImageType | ImageType;
  title?: {
    label: string;
  };
  description?: string;
  callToAction?: {
    link: string;
    label: string;
  };
};

type Services = {
  allStreamData: ServiceData | null;
};

const AboutGuide = (props: Services) => {
  const { allStreamData } = props;

  return (
    <>
      {allStreamData && (
        <div className="guide_section_main">
          <div className="relative container px-12">
            <ul className="splide__list guide_sec">
              <div className="w-full guide_left">
                {allStreamData?.photo ? (
                  <Image
                    className="max-w-full w-full h-full"
                    placeholder="Image"
                    image={allStreamData.photo}
                  ></Image>
                ) : (
                  <></>
                )}
              </div>
              <div className="w-full guide_right">
                <div className="relative container px-12">
                  <h2>{allStreamData?.title}</h2>
                  <p>{allStreamData?.description}</p>
                  {allStreamData?.title?.label ? (
                    <h2>{allStreamData?.title?.label}</h2>
                  ) : (
                    <></>
                  )}
                  <a
                    className="button"
                    href={allStreamData?.callToAction?.link}
                  >
                    {" "}
                    {allStreamData?.callToAction?.label}
                  </a>
                </div>
              </div>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutGuide;

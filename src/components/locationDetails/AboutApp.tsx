import * as React from "react";
import RtfConverter from "@yext/rtf-converter";

type AboutProps = {
  storeDescriptionTitle: { description: string };
  title: string;
};

const About = (props: AboutProps) => {
  const { storeDescriptionTitle, title } = props;

  return (
    <>
      {storeDescriptionTitle && (
        <div className="container">
          <div className="ab-sec">
            <div className="flex flex-wrap justify-center">
              <div className="About-container">
                <h2 className="title">About kate spade — {title}</h2>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html: RtfConverter.toHTML(
                      storeDescriptionTitle.description
                    ),
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default About;

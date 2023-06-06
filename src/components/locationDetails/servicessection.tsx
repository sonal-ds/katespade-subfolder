import * as React from "react";

interface Service {
  photo?: {
    url: string;
  };
  title?: string;
  description?: string;
  callToAction?: {
    link: string;
    label: string;
  };
}

interface Services {
  card1?: Service;
  card2?: Service;
  card3?: Service;
}

const ServicesSections = (props: Services) => {
  const services: Service[] = [];
  if (props.card1) {
    services.push(props.card1);
  }
  if (props.card2) {
    services.push(props.card2);
  }
  if (props.card3) {
    services.push(props.card3);
  }

  return (
    <>
      {services && services.length ? (
        <div className="services_section_main">
          <div className="relative container">
            <ul className="services_sec">
              {services.map((element: Service, index: number) => {
                if (element && element.photo) {
                  return (
                    <li key={index}>
                      {element && element.photo && (
                        <>
                          <div className="w-full">
                            {!element.photo ? <></> : ""}
                            <img
                              className="max-w-full w-full h-full"
                              alt=""
                              src={
                                element.photo &&
                                element.photo.url &&
                                element.photo.url
                              }
                            ></img>
                          </div>
                          <div className="w-full guide_right">
                            <h2>{element.title ? element.title : ""}</h2>
                            <p>
                              {element.description ? element.description : ""}
                            </p>
                            {element && element.callToAction ? (
                              <a
                                className="button "
                                href={element ? element.callToAction.link : ""}
                              >
                                <h2>
                                  {element ? element.callToAction.label : ""}{" "}
                                </h2>
                              </a>
                            ) : (
                              ""
                            )}
                          </div>
                        </>
                      )}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ServicesSections;

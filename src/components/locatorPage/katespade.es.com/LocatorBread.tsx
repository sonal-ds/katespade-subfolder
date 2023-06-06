import * as React from "react";
import { svgIcons } from "../../../assets/svgs/svgIcon";
import { Link } from "@yext/pages/components";
import { TEMP_SETTINGS } from "../../config/katespade.es.com/globalConfig";
import '../../../types/i18n';
import { useTranslation, withTranslation } from "react-i18next";

const LocatorBread = (props: {title:string}) => {

  const {title} = props;
  const { t } = useTranslation();

  return (
    <div className="location-link">
      <Link href={TEMP_SETTINGS.LOCATOR_PAGE_PATH}>
        {svgIcons.addressIcon}
        <ul>
          <li>{title ? title : t("Store Locator")}</li>
        </ul>
      </Link>
    </div>
  );
};
export default withTranslation()(LocatorBread);

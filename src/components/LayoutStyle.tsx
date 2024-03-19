import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/button.scss";

function LayoutStyle() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h2 style={{ padding: "10px" }}>{t("form_management")}</h2>
      <div className="flex">
        <div className="layoutshape">
          <button className="button circle"></button>
        </div>
        <div className="layoutshape">
        <button className="button rectangle"></button>
        </div>
      </div>
    </div>
  );
}

export default LayoutStyle;

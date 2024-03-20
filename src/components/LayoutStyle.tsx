import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "antd";

import "../styles/button.scss";

function LayoutStyle() {
  const { t } = useTranslation();

  return (
    <div>
      <h2 style={{ padding: "10px", textAlign: "center" }}>
        {t("form_management")}
      </h2>
      {/* control */}
      <Row justify="center" gutter={[16, 16]}>
        <Col>
          <div className="layoutshape gap-1">
            <button className="triangle-left"></button>
            <div className="label">Move Shape</div>
          </div>
        </Col>
        <Col className="flex mt-1">
          <div className="layoutshape-move-position">
            <div className="layoutshape-move-position flex-column">
              <button className="triangle-up gap-1"></button>
              <button className="triangle-down gap-1"></button>
            </div>
            <div className="label">Move position</div>
          </div>
        </Col>
        <Col>
          <div className="layoutshape gap-1">
            <button className="triangle-right"></button>
            <div className="label">Move Shape</div>
          </div>
        </Col>
      </Row>

      {/* display */}
      <Row className="mt-2" justify="center" gutter={[16, 16]}>
        <Col>
          <div className="layoutshape gap-1">
            <button className="button circle"></button>
          </div>
        </Col>
        <Col>
          <div className="layoutshape gap-1">
            <button className="button rectangle"></button>
          </div>
        </Col>
        <Col>
          <div className="layoutshape gap-1">
            <button className="button ellipse"></button>
          </div>
        </Col>
        <Col>
          <div className="layoutshape gap-1">
            <button className="button rhombus"></button>
          </div>
        </Col>
        
      </Row>
    </div>
  );
}

export default LayoutStyle;

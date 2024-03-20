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
            <div className="triangle-left"></div>
            <div className="label">Move Shape</div>
          </div>
        </Col>
        <Col className="flex mt-1">
          <div className="layoutshape-move-position">
            <div className="layoutshape-move-position flex-column">
              <div className="triangle-up gap-1"></div>
              <div className="triangle-down gap-1"></div>
            </div>
            <div className="label">Move position</div>
          </div>
        </Col>
        <Col>
          <div className="layoutshape gap-1">
            <div className="triangle-right"></div>
            <div className="label">Move Shape</div>
          </div>
        </Col>
      </Row>

      {/* display */}
      <Row className="mt-2" justify="center" gutter={[16, 16]}>
        <Col>
          <div className="layoutshape gap-1">
            <div className="button circle"></div>
          </div>
        </Col>
        <Col>
          <div className="layoutshape gap-1">
            <div className="button rectangle"></div>
          </div>
        </Col>
        <Col>
          <div className="layoutshape gap-1">
            <div className="button ellipse"></div>
          </div>
        </Col>
        <Col>
          <div className="layoutshape gap-1">
            <div className="button rhombus"></div>
          </div>
        </Col>

        <Col>
          <div className="layoutshape gap-1">
            <div className="button long-rectangle"></div>
          </div>
        </Col>
        <Col>
          <div className="layoutshape gap-1">
            <div className="pentagon"></div>
          </div>
        </Col>
        <Col>
          <div className="layoutshape gap-1">
            <div className="hexagon "></div>
          </div>
        </Col>
        <Col>
          <div className="layoutshape gap-1">
            <div className="octagon "></div>
          </div>
        </Col>
        
      </Row>
    </div>
  );
}

export default LayoutStyle;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "antd";

import "../styles/button.scss";

function LayoutStyle() {
  const { t } = useTranslation();

  const [shapes, setShapes] = useState([
    "circle",
    "rectangle",
    "ellipse",
    "rhombus",
    "trapezoid",
    "pentagon",
    "hexagon",
    "octagon",
  ]);
  const moveShapeRight = () => {
    setShapes((prevShapes) => {
      if (prevShapes.length > 0) {
        const newShapes = [...prevShapes];
        const lastShape = newShapes.splice(newShapes.length - 1, 1)[0];
        newShapes.unshift(lastShape); // เพิ่มรูปทรงที่ได้รับจากตัวสุดท้ายไปที่ต้น array
        return newShapes;
      }
      return prevShapes;
    });
  };

  const moveShapeLeft = () => {
    setShapes((prevShapes) => {
      if (prevShapes.length > 0) {
        const newShapes = [...prevShapes];
        const firstShape = newShapes.shift(); // ลบรูปทรงตัวแรกและรับค่านั้น
        if (firstShape !== undefined) { 
          newShapes.push(firstShape); // เพิ่มรูปทรงนั้นไปที่สุดท้ายของ array ถ้าไม่ใช่ undefined
        }
        return newShapes;
      }
      return prevShapes;
    });
  };

  const movePosition = () => {
    setShapes((prevShapes) => {
      if (prevShapes.length >= 8) {
        const firstHalf = prevShapes.slice(0, 4);
        const secondHalf = prevShapes.slice(4, 8);
        return [...secondHalf, ...firstHalf]; // สลับตำแหน่งกัน
      }
      return prevShapes;
    });
  };

  const randomizeShapes = () => {
    setShapes((prevShapes) => {
      let randomizedShapes = [...prevShapes];
      for (let i = randomizedShapes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomizedShapes[i], randomizedShapes[j]] = [randomizedShapes[j], randomizedShapes[i]]; 
      }
      return randomizedShapes;
    });
  };

  return (
    <div>
      <h2 style={{ padding: "10px", textAlign: "center" }}>
        {t("form_management")}
      </h2>
      {/* control */}
      <Row justify="center" gutter={[16, 16]}>
        <Col>
          <div onClick={moveShapeLeft} className="layoutshape gap-1">
            <div className="triangle-left"></div>
            <button className="label">{t("move_shape")}</button>
          </div>
        </Col>
        <Col className="flex mt-1">
          <div  onClick={movePosition} className="layoutshape-move-position">
            <div className="layoutshape-move-position flex-column">
              <div className="triangle-up gap-1"></div>
              <div className="triangle-down gap-1"></div>
            </div>
            <div className="label">{t("move_position")}</div>
          </div>
        </Col>
        <Col>
          <div onClick={moveShapeRight} className="layoutshape gap-1">
            <div className="triangle-right"></div>
            <div className="label">{t("move_shape")}</div>
          </div>
        </Col>
      </Row>

      {/* display shapes */}
      <Row className="mt-5 pb-5" gutter={[16, 16]}>
        {shapes.map((shape, index) => (
          <Col key={index} xs={8} lg={6}>
            <div onClick={randomizeShapes} className={`layoutshape gap-1`}>
              <div className={`${shape}`}></div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default LayoutStyle;

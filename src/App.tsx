import React from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Menu, Space, Card, Row, Col } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

function App() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const changeLanguage = ({ key }: any) => {
    i18n.changeLanguage(key);
  };

  const menu = (
    <Menu onClick={changeLanguage}>
      <Menu.Item key="en">English</Menu.Item>
      <Menu.Item key="th">ไทย</Menu.Item>
    </Menu>
  );

  return (
    <>
      <div style={{ textAlign: "right", padding: "10px" }}>
        <Dropdown overlay={menu} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()} style={{ cursor: "pointer" }}>
            <Space>
              <GlobalOutlined />
              {i18n.language.toUpperCase()}
            </Space>
          </a>
        </Dropdown>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          gap: "1rem", 
          flexWrap: "wrap", 
        }}
      >
        <Card style={{ width: 300, textAlign: "left" }}>
          <Row gutter={[0, 16]}>
            <Col span={24}>{t("test_1")}</Col>
          </Row>
          <Row gutter={[0, 16]}>
            <Col span={24}>{t("web_management")}</Col>
          </Row>
        </Card>
        <Card style={{ width: 300, textAlign: "left" }}>
          <Row gutter={[0, 16]}>
            <Col span={24}>{t("test_2")}</Col>
          </Row>
          <Row gutter={[0, 16]}>
            <Col span={24}>{t("api_connection")}</Col>
          </Row>
        </Card>
        <Card style={{ width: 300, textAlign: "left" }}>
          <Row gutter={[0, 16]}>
            <Col span={24}>{t("test_3")}</Col>
          </Row>
          <Row gutter={[0, 16]}>
            <Col span={24}>{t("form_management")}</Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default App;

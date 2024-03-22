import React, { useRef } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Checkbox,
  Radio,
  Row,
  Col,
} from "antd";
import { useDispatch } from "react-redux";
import { addData } from "../features/formSlice";
import { PersonFormData } from "../types";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const FormManagement: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values: PersonFormData) => {
    console.log(values);

    dispatch(addData(values));
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <h2 className="ml-4">{t("form_management")}</h2>
      <div className="container">
        <Form
          form={form}
          onFinish={onFinish}
          onReset={onReset}
          autoComplete="off"
        >
          <Row gutter={24}>
            <Col span={5}>
              <Form.Item
                name="prefix"
                label="คำนำหน้า"
                rules={[
                  { required: true, message: "Please select your prefix!" },
                ]}
              >
                <Select placeholder="Select a prefix">
                  <Option value="mr">นาย</Option>
                  <Option value="ms">นางสาว</Option>
                  <Option value="mrs">นาง</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                name="firstName"
                label="ชื่อจริง"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="lastName"
                label="นามสกุล"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* แถว 2 */}
          <Row gutter={24}>
            <Col span={5}>
              <Form.Item
                label="วันเกิด"
                name="birthdate"
                rules={[
                  { required: true, message: "Please select your birthdate!" },
                ]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="สัญชาติ"
                name="nationality"
                rules={[
                  {
                    required: true,
                    message: "Please select your nationality!",
                  },
                ]}
              >
                <Select placeholder="Select a nationality">
                  <Option value="thai">ไทย</Option>
                  {/* เพิ่มรหัสประเทศอื่นๆ */}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* แถว 3 */}
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="เลขบัตรประชาชน"
                name={["idCard", "part1"]}
                rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
                style={{ marginBottom: 0 }}
              >
                <Row gutter={8}>
                  <Col span={2}>
                    <Form.Item>
                      <Input maxLength={1} style={{ textAlign: "center" }} />
                    </Form.Item>
                  </Col>
                  <span style={{ margin: "0 8px" }}>-</span>
                  <Col span={4}>
                    <Form.Item
                      name={["idCard", "part2"]}
                      rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
                      noStyle
                    >
                      <Input maxLength={4} style={{ textAlign: "center" }} />
                    </Form.Item>
                  </Col>
                  <span style={{ margin: "0 8px" }}>-</span>
                  <Col span={4}>
                    <Form.Item
                      name={["idCard", "part3"]}
                      rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
                      noStyle
                    >
                      <Input maxLength={5} style={{ textAlign: "center" }} />
                    </Form.Item>
                  </Col>
                  <span style={{ margin: "0 8px" }}>-</span>
                  <Col span={3}>
                    <Form.Item
                      name={["idCard", "part4"]}
                      rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
                      noStyle
                    >
                      <Input maxLength={2} style={{ textAlign: "center" }} />
                    </Form.Item>
                  </Col>
                  <span style={{ margin: "0 8px" }}>-</span>
                  <Col span={2}>
                    <Form.Item
                      name={["idCard", "part5"]}
                      rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
                      noStyle
                    >
                      <Input maxLength={1} style={{ textAlign: "center" }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
          {/* แถวที่ 4 */}
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name="gender"
                label="เพศ"
                rules={[
                  { required: true, message: "Please select your gender!" },
                ]}
              >
                <Radio.Group>
                  <Radio value="male">ชาย</Radio>
                  <Radio value="female">หญิง</Radio>
                  <Radio value="unspecified">ไม่ระบุ</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          {/* แถวที่ 5 */}
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item
                label="หมายเลขโทรศัพท์"
                name="phoneCountryCode"
                rules={[{ required: true, message: "กรุณาเลือกรหัสประเทศ!" }]}
              >
                <Select>
                  <Option value="+66">+66</Option>
                  <Option value="+77">+77</Option>
                  {/* เพิ่มรหัสประเทศอื่นๆ */}
                </Select>
              </Form.Item>
            </Col>
            <span style={{ margin: "0" }}>-</span>
            <Col span={8}>
              <Form.Item
                name="phoneNumber"
                rules={[
                  { required: true, message: "กรุณากรอกหมายเลขโทรศัพท์!" },
                ]}
              >
                <Input placeholder="หมายเลขโทรศัพท์" />
              </Form.Item>
            </Col>
          </Row>
          {/* แถวที่ 6 */}
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item name="passport" label="หนังสือเดินทาง">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* แถวที่ 7 */}
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item
                name="salary"
                rules={[{ required: true, message: "กรุณากรอกเงินเดือน!" }]}
                style={{ marginBottom: 0 }}
                label="เงินเดือนที่คาดหวัง"
              >
                <Form.Item>
                  <Input type="number" />
                </Form.Item>
              </Form.Item>
            </Col>
            <Col style={{ paddingLeft: "20%" }}>
              <Button
                onClick={onReset}
                type="default"
                htmlType="reset"
                style={{ marginRight: "20px" }}
              >
                ล้างข้อมูล
              </Button>
              <Button htmlType="submit">ส่งข้อมูล</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default FormManagement;

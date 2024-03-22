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

const { Option } = Select;

const FormManagement: React.FC = () => {
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
    <div className="container">
      <Form
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        onReset={onReset}
      >
        <Form.Item label="คำนำหน้า" style={{ marginBottom: 0 }}>
          <Row gutter={24}>
            <Col span={4}>
              <Form.Item
                name="prefix"
                rules={[
                  { required: true, message: "Please select your prefix!" },
                ]}
                style={{ marginBottom: "1rem" }} // เพิ่ม padding ด้านล่าง
              >
                <Select placeholder="Select a prefix">
                  <Option value="mr">นาย</Option>
                  <Option value="ms">นางสาว</Option>
                  <Option value="mrs">นาง</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="ชื่อจริง"
                name="firstName"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="นามสกุล"
                name="lastName"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="วันเกิด" style={{ marginBottom: 0 }}>
          <Row gutter={24}>
            <Col span={4}>
              <Form.Item
                name="birthdate"
                rules={[
                  { required: true, message: "Please select your birthdate!" },
                ]}
                style={{ marginBottom: "1rem" }} // เพิ่ม padding ด้านล่าง
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="สัญชาติ"
                name="nationality"
                rules={[
                  {
                    required: true,
                    message: "Please select your nationality!",
                  },
                ]}
                style={{ marginBottom: "1rem" }} // เพิ่ม padding ด้านล่าง
              >
                <Select placeholder="Select a nationality">
                  <Option value="thai">ไทย</Option>
                  {/* เพิ่มรหัสประเทศอื่นๆ */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="เลขบัตรประชาชน">
          <Form.Item
            name={["idCard", "part1"]}
            noStyle
            rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
          >
            <Input
              style={{ width: "15%", textAlign: "center" }}
              maxLength={1}
            />
          </Form.Item>
          <span style={{ margin: "0 8px" }}>-</span>
          <Form.Item
            name={["idCard", "part2"]}
            noStyle
            rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
          >
            <Input
              style={{ width: "20%", textAlign: "center" }}
              maxLength={4}
            />
          </Form.Item>
          <span style={{ margin: "0 8px" }}>-</span>
          <Form.Item
            name={["idCard", "part3"]}
            noStyle
            rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
          >
            <Input
              style={{ width: "25%", textAlign: "center" }}
              maxLength={5}
            />
          </Form.Item>
          <span style={{ margin: "0 8px" }}>-</span>
          <Form.Item
            name={["idCard", "part4"]}
            noStyle
            rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
          >
            <Input
              style={{ width: "15%", textAlign: "center" }}
              maxLength={2}
            />
          </Form.Item>
          <span style={{ margin: "0 8px" }}>-</span>
          <Form.Item
            name={["idCard", "part5"]}
            noStyle
            rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
          >
            <Input
              style={{ width: "10%", textAlign: "center" }}
              maxLength={1}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="gender"
          label="เพศ"
          rules={[{ required: true, message: "Please select your gender!" }]}
        >
          <Radio.Group>
            <Radio value="male">ชาย</Radio>
            <Radio value="female">หญิง</Radio>
            <Radio value="unspecified">ไม่ระบุ</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="หมายเลขโทรศัพท์">
          <Row gutter={24}>
            <Col span={4}>
              <Form.Item
                name="phoneCountryCode"
                noStyle
                rules={[{ required: true, message: "กรุณาเลือกรหัสประเทศ!" }]}
              >
                <Select >
                  <Option value="+66">+66</Option>
                  <Option value="+77">+77</Option>
                  {/* เพิ่มรหัสประเทศอื่นๆ */}
                </Select>
              </Form.Item>
            </Col>
            <span style={{ margin: "0" }}>-</span>
            <Col span={12}>
              <Form.Item
                name="phoneNumber"
                noStyle
                rules={[
                  { required: true, message: "กรุณากรอกหมายเลขโทรศัพท์!" },
                ]}
              >
                <Input placeholder="หมายเลขโทรศัพท์" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item name="passport" label="หนังสือเดินทาง">
          <Row gutter={24}>
            <Col span={8}>
              <Input />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="เงินเดือน" style={{ marginBottom: 0 }}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name="salary"
                rules={[{ required: true, message: "กรุณากรอกเงินเดือน!" }]}
                style={{ marginBottom: 0 }}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col style={{ paddingLeft:"20%"}}>
              <Button
                onClick={onReset}
                type="default"
                htmlType="reset"
                style={{ marginRight: "10px" }}
              >
                ล้างข้อมูล
              </Button>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit">
                ส่งข้อมูล
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormManagement;

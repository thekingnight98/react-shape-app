import React from "react";
import { Form, Input, Button, Select, DatePicker, Checkbox, Row, Col } from 'antd';
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
        wrapperCol={{ span: 6 }}
        onFinish={onFinish}
        onReset={onReset}

      >
        <Form.Item
          name="prefix"
          label="คำนำหน้า"
          rules={[{ required: true, message: 'Please select your prefix!' }]}
        >
          <Select placeholder="Select a prefix">
            <Option value="mr">นาย</Option>
            <Option value="ms">นางสาว</Option>
            <Option value="mrs">นาง</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="firstName"
          label="ชื่อจริง"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="นามสกุล"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="birthdate"
          label="วันเกิด"
          rules={[{ required: true, message: 'Please select your birthdate!' }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="nationality"
          label="สัญชาติ"
          rules={[{ required: true, message: 'Please select your nationality!' }]}
        >
          <Select placeholder="Select a nationality">
            <Option value="thai">ไทย</Option>
            {/* Add more nationality options here */}
          </Select>
        </Form.Item>

        <Form.Item
          name="idCard"
          label="เลขบัตรประชาชน"
          rules={[
            { required: true, message: 'Please input your ID card number!' },
            { len: 13, message: 'ID card number must be 13 digits!' },
          ]}
        >
          <Input maxLength={13} />
        </Form.Item>

        <Form.Item
          name="gender"
          label="เพศ"
          rules={[{ required: true, message: 'Please select your gender!' }]}
        >
          <Checkbox.Group>
            <Row>
              <Col span={7}><Checkbox value="male">ชาย</Checkbox></Col>
              <Col span={7}><Checkbox value="female">หญิง</Checkbox></Col>
              <Col span={10}><Checkbox value="unspecified">ไม่ระบุ</Checkbox></Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          name="phoneCountryCode"
          label="รหัสประเทศ"
          rules={[{ required: true, message: 'Please select your country code!' }]}
        >
          <Select>
            <Option value="+66">+66 Thailand</Option>
            {/* เพิ่มรหัสประเทศอื่นๆ */}
          </Select>
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="หมายเลขโทรศัพท์"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input addonBefore={<Form.Item name="phoneCountryCode" noStyle><Select defaultValue="+66" style={{ width: 90 }}><Option value="+66">+66</Option></Select></Form.Item>} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="passport"
          label="หนังสือเดินทาง"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="salary"
          label="เงินเดือน"
          rules={[{ required: true, message: 'Please input your salary!' }]}
        >
          <Input type="number" addonAfter="THB" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button onClick={onReset} type="default" htmlType="reset" style={{ marginRight: '10px' }}>
            ล้างข้อมูล
          </Button>
          <Button type="primary" htmlType="submit">
            ส่งข้อมูล
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};


export default FormManagement;

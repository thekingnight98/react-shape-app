import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Radio,
  Row,
  Col,
  Table,
  Space,
} from "antd";
import { useDispatch } from "react-redux";
import { addData, deleteData, editData } from "../features/formSlice";
import { PersonFormData } from "../types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

interface TableDataType {
  key: number;
  name: string;
  gender: "male" | "female" | "unspecified";
  phoneCountryCode: string;
  phoneNumber: string;
  nationality: string;
  birthdate: string;
  idCard: string;
  passport: string;
  salary: number;
}

const FormManagement: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    // clear error require when change language
    const handleLanguageChange = () => {
      form.resetFields();
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n, form]);

  const dispatch = useDispatch();

  const [tableData, setTableData] = useState<TableDataType[]>([]);

  const onFinish = (values: PersonFormData) => {
    const formattedBirthdate = moment.isMoment(values.birthdate)
      ? values.birthdate.format("YYYY-MM-DD")
      : values.birthdate;

    const newData = {
      key: Date.now(),
      name: `${values.prefix} ${values.firstName} ${values.lastName}`,
      gender: values.gender,
      phoneCountryCode: values.phoneCountryCode,
      phoneNumber: values.phoneNumber,
      nationality: values.nationality,
      birthdate: formattedBirthdate,
      idCard: values.idCard,
      passport: values.passport,
      salary: values.salary,
    };

    setTableData([...tableData, newData]);
    dispatch(addData({ ...values, birthdate: formattedBirthdate }));
    form.resetFields();
  };

  const handleDelete = (key: number) => {
    const dataSource = [...tableData];
    const updatedData = dataSource.filter((item) => item.key !== key);
    setTableData(updatedData);
    dispatch(deleteData(key));
    localStorage.setItem("tableData", JSON.stringify(updatedData));
  };

  const handleEdit = (editedData: PersonFormData) => {
    dispatch(editData(editedData));
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "PhoneNumber", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Nationality", dataIndex: "nationality", key: "nationality" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: { key: any }) => (
        <Space size="middle">
          <Button onClick={() => handleDelete(record.key)} type="link">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    // โหลดข้อมูลจาก Local Storage และกำหนดให้กับ state เมื่อคอมโพเนนต์ถูกโหลด
    const loadData = localStorage.getItem("tableData");
    if (loadData) {
      setTableData(JSON.parse(loadData));
    }
  }, []);

  useEffect(() => {
    // อัพเดท Local Storage ทุกครั้งที่ tableData มีการเปลี่ยนแปลง
    if (tableData.length > 0) {
      localStorage.setItem("tableData", JSON.stringify(tableData));
    }
  }, [tableData]);

  return (
    <div className="mb-4 mx-4">
      <div className="flex justify-between">
        <h2 className="ml-4">{t("form_management")}</h2>
        <Button onClick={() => navigate("/")}>หน้าหลัก</Button>
      </div>
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
                label={t("prefix")}
                rules={[{ required: true, message: `${t("error_prefix")}` }]}
              >
                <Select placeholder="Select a prefix">
                  <Option value="mr">{t("mr")}</Option>
                  <Option value="ms">{t("ms")}</Option>
                  <Option value="mrs">{t("mrs")}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                name="firstName"
                label={t("firstName")}
                rules={[{ required: true, message: t("error_firstName") }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="lastName"
                label={t("lastName")}
                rules={[{ required: true, message: t("error_lastName") }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* แถว 2 */}
          <Row gutter={24}>
            <Col span={5}>
              <Form.Item
                label={t("birthdate")}
                name="birthdate"
                rules={[{ required: true, message: t("error_birthdate") }]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t("nationality")}
                name="nationality"
                rules={[
                  {
                    required: true,
                    message: t("error_nationality"),
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
                label={t("idCard")}
                name={["idCard", "part1"]}
                rules={[{ required: true, message: t("error_nationality") }]}
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
                      rules={[
                        { required: true, message: t("error_nationality") },
                      ]}
                      noStyle
                    >
                      <Input maxLength={4} style={{ textAlign: "center" }} />
                    </Form.Item>
                  </Col>
                  <span style={{ margin: "0 8px" }}>-</span>
                  <Col span={4}>
                    <Form.Item
                      name={["idCard", "part3"]}
                      rules={[
                        { required: true, message: t("error_nationality") },
                      ]}
                      noStyle
                    >
                      <Input maxLength={5} style={{ textAlign: "center" }} />
                    </Form.Item>
                  </Col>
                  <span style={{ margin: "0 8px" }}>-</span>
                  <Col span={3}>
                    <Form.Item
                      name={["idCard", "part4"]}
                      rules={[
                        { required: true, message: t("error_nationality") },
                      ]}
                      noStyle
                    >
                      <Input maxLength={2} style={{ textAlign: "center" }} />
                    </Form.Item>
                  </Col>
                  <span style={{ margin: "0 8px" }}>-</span>
                  <Col span={2}>
                    <Form.Item
                      name={["idCard", "part5"]}
                      rules={[
                        { required: true, message: t("error_nationality") },
                      ]}
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
                label={t("gender")}
                rules={[{ required: true, message: t("error_gender") }]}
              >
                <Radio.Group>
                  <Radio value="male">{t("gender_male")}</Radio>
                  <Radio value="female">{t("gender_female")}</Radio>
                  <Radio value="unspecified">{t("gender_unspecified")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          {/* แถวที่ 5 */}
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item
                label={t("phoneCountryCode")}
                name="phoneCountryCode"
                rules={[
                  { required: true, message: t("error_phoneCountryCode") },
                ]}
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
                rules={[{ required: true, message: t("error_phoneNumber") }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          {/* แถวที่ 6 */}
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item name="passport" label={t("passport")}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* แถวที่ 7 */}
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item
                name="salary"
                rules={[{ required: true, message: t("error_salary") }]}
                style={{ marginBottom: 0 }}
                label={t("salary")}
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
                {t("reset_button")}
              </Button>
              <Button htmlType="submit">{t("submit_button")}</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="pb-5">
        <Table columns={columns} dataSource={tableData} />
      </div>
    </div>
  );
};

export default FormManagement;

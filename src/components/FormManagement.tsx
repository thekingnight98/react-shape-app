import React, { useState, useEffect } from "react";
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
  Checkbox,
  Card,
  InputNumber,
} from "antd";
import { useDispatch } from "react-redux";
import { addData, deleteData, deleteMultipleData } from "../features/formSlice";
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

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [tableData, setTableData] = useState<TableDataType[]>([]);

  // เกี่ยวกับ select check_box
  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
  const handleDeleteSelected = () => {
    const newData = tableData.filter(
      (item) => !selectedRowKeys.includes(item.key)
    );
    setTableData(newData);
    setSelectedRowKeys([]);

    localStorage.setItem("tableData", JSON.stringify(newData));

    dispatch(deleteMultipleData(selectedRowKeys));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // เกี่ยวกับ select check_box

  // form action ต่างๆ
  const onFinish = (values: PersonFormData) => {
    const formattedBirthdate = moment.isMoment(values.birthdate)
      ? values.birthdate.format("YYYY-MM-DD")
      : values.birthdate;

    const newData = {
      key: Date.now(),
      name: `${values.firstName} ${values.lastName}`,
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

  const onReset = () => {
    form.resetFields();
  };
  // form action ต่างๆ

  // table
  const columns = [
    {
      title: `${t("name")}`,
      dataIndex: "name",
      key: "name",
      sorter: (a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name),
    },
    {
      title: `${t("gender")}`,
      dataIndex: "gender",
      key: "gender",
      sorter: (a: { gender: string }, b: { gender: any }) =>
        a.gender.localeCompare(b.gender),
    },
    {
      title: `${t("phoneNumber")}`,
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: (a: { phoneNumber: string }, b: { phoneNumber: any }) =>
        a.phoneNumber.localeCompare(b.phoneNumber),
    },
    {
      title: `${t("nationality")}`,
      dataIndex: "nationality",
      key: "nationality",
      sorter: (a: { nationality: string }, b: { nationality: any }) =>
        a.nationality.localeCompare(b.nationality),
    },
    {
      title: `${t("action")}`,
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
  // end table

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
        <Button onClick={() => navigate("/")}>{t("home_page")}</Button>
      </div>
      <Card className="container">
        <Form
          form={form}
          onFinish={onFinish}
          onReset={onReset}
          autoComplete="off"
        >
          <Row gutter={24}>
            <Col span={4}>
              <Form.Item
                name="prefix"
                label={t("prefix")}
                rules={[{ required: true, message: `${t("error_prefix")}` }]}
              >
                <Select placeholder="Select a prefix">
                  <Option value={t("mr")}>{t("mr")}</Option>
                  <Option value={t("ms")}>{t("ms")}</Option>
                  <Option value={t("mrs")}>{t("mrs")}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
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
                  <Option value={t("thai")}>{t("thai")}</Option>
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
                rules={[{ required: true, message: t("error_idCard") }]}
                style={{ marginBottom: 0 }}
              >
                <Row gutter={8}>
                  <Col span={2}>
                    <Form.Item>
                      <InputNumber maxLength={1} 
                      style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <span style={{ margin: "0 8px" }}>-</span>
                  <Col span={4}>
                    <Form.Item
                      name={["idCard", "part2"]}
                      rules={[
                        { required: true, message: t("error_idCard") },
                      ]}
                      noStyle
                    >
                      <InputNumber maxLength={4} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <span style={{ margin: "0 8px" }}>-</span>
                  <Col span={4}>
                    <Form.Item
                      name={["idCard", "part3"]}
                      rules={[
                        { required: true, message: t("error_idCard") },
                      ]}
                      noStyle
                    >
                      <InputNumber maxLength={5} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <span style={{ margin: "0 8px" }}>-</span>
                  <Col span={3}>
                    <Form.Item
                      name={["idCard", "part4"]}
                      rules={[
                        { required: true, message: t("error_idCard") },
                      ]}
                      noStyle
                    >
                      <InputNumber maxLength={2} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <span style={{ margin: "0 8px" }}>-</span>
                  <Col span={2}>
                    <Form.Item
                      name={["idCard", "part5"]}
                      rules={[
                        { required: true, message: t("error_idCard") },
                      ]}
                      noStyle
                    >
                      <InputNumber maxLength={1} style={{ width: "100%" }} />
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
                  <Radio value={t("gender_male")}>{t("gender_male")}</Radio>
                  <Radio value={t("gender_female")}>{t("gender_female")}</Radio>
                  <Radio value={t("gender_unspecified")}>
                    {t("gender_unspecified")}
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          {/* แถวที่ 5 */}
          <Row gutter={24}>
            <Col span={4}>
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
               <InputNumber maxLength={10} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          {/* แถวที่ 6 */}
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item name="passport" label={t("passport")}>
              <InputNumber style={{ width: "100%" }} />
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
      </Card>
      <div className="pb-5 mt-5 ">
        <Space style={{ marginBottom: 16 }}>
          <Checkbox
            onChange={(e) => {
              if (e.target.checked) {
                const allKeys = tableData.map((item) => item.key);
                setSelectedRowKeys(allKeys);
              } else {
                setSelectedRowKeys([]);
              }
            }}
          >
            {t("select_all")}
          </Checkbox>
          <Button
            onClick={handleDeleteSelected}
            disabled={!selectedRowKeys.length}
          >
            {t("delete")}
          </Button>
        </Space>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default FormManagement;

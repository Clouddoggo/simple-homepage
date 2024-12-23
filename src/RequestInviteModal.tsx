import React, { useState } from "react";
import { Button, Form, Input, message, Modal, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";

interface RequestInviteModalProps {
  visible: boolean;
  onSubmitSuccess: () => void;
  onClose: () => void;
}

export const RequestInviteModal = ({
  visible,
  onClose,
  onSubmitSuccess,
}: RequestInviteModalProps) => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = async (values: { name: string; email: string }) => {
    const { name, email } = values;

    setErrorMessage(undefined);
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
        { name, email },
      );

      if (response.status === 200) {
        message.success("Request submitted successfully!");
        onSubmitSuccess();
      } else {
        throw new Error(response.data.errorMessage);
      }
    } catch (error) {
      const errorMsg =
        (axios.isAxiosError(error)
          ? error.response?.data?.errorMessage
          : (error as Error).message) || "Something went wrong";
      setErrorMessage(errorMsg);
      message.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={
        <Typography.Title level={4} style={{ textAlign: "center" }}>
          Request an invite
        </Typography.Title>
      }
      open={visible}
      onCancel={onClose}
      onClose={onClose}
      footer={null}
      afterClose={() => form.resetFields()}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => handleSubmit(values)}
      >
        <Form.Item
          label="Full name"
          name="name"
          rules={[
            { required: true, message: "Please enter your full name" },
            {
              min: 3,
              message: "Your full name must have at least 3 characters",
            },
          ]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          hasFeedback
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
          validateDebounce={300}
        >
          <Input placeholder="johndoe@example.com" />
        </Form.Item>
        <Form.Item
          label="Confirm Email"
          name="confirm_email"
          hasFeedback
          dependencies={["email"]}
          rules={[
            { required: true, message: "Please confirm your email" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("email") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The emails that you entered do not match!"),
                );
              },
            }),
          ]}
          validateDebounce={300}
        >
          <Input placeholder="johndoe@example.com" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block loading={isLoading}>
          {isLoading ? "Submitting, please wait" : "Submit"}
        </Button>
      </Form>
      <br />
      {errorMessage && (
        <Typography.Text type="danger" style={{ textAlign: "center" }}>
          {errorMessage}
        </Typography.Text>
      )}
    </Modal>
  );
};

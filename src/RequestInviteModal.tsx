import React, { useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: { name: string; email: string }) => {
    const { name, email } = values;

    setIsLoading(true); // Set loading to true when the request starts

    try {
      // Make the POST request to the backend
      const response = await axios.post(
        "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
        { name, email },
      );

      if (response.status === 200) {
        message.success("Request submitted successfully!");
        onSubmitSuccess();
      }
    } catch (error: any) {
      // Handle error (server returns 400 or other errors)
      const errorMsg = error.response?.data?.message || "Something went wrong";
      message.error(errorMsg);
    } finally {
      setIsLoading(false); // Set loading to false when request is finished
    }
  };

  return (
    <Modal
      title="Request an invite"
      open={visible}
      onCancel={onClose}
      onClose={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => handleSubmit(values)}
      >
        <Form.Item
          label="Full name"
          fieldId="name"
          rules={[
            { required: true },
            { min: 3, message: "Full name must have at least 3 characters" },
          ]}
        >
          <Input placeholder="Please enter your full name" />
        </Form.Item>
        <Form.Item
          label="Email"
          fieldId="email"
          hasFeedback
          rules={[
            { required: true },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Please enter your email" />
        </Form.Item>
        <Form.Item
          label="Confirm Email"
          hasFeedback
          rules={[
            { required: true },
            { type: "email", message: "Please enter a valid email" },
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
        >
          <Input placeholder="Please confirm your email" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block loading={isLoading}>
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

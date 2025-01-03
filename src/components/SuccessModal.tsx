import React from "react";
import { SmileTwoTone } from "@ant-design/icons";
import { Button, Modal, Typography } from "antd";

const { Title, Paragraph } = Typography;

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

export const SuccessModal = ({ visible, onClose }: SuccessModalProps) => {
  return (
    <Modal open={visible} closable={false} footer={null}>
      <Title level={1} style={{ textAlign: "center" }}>
        You're invited! <SmileTwoTone />
      </Title>
      <Paragraph>
        You will be one of the first to experience Broccoli & Co. when we
        launch.
      </Paragraph>
      <Button onClick={onClose} block variant="outlined">
        Great!
      </Button>
    </Modal>
  );
};

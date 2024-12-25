import React, { useState } from "react";
import { RequestInviteModal } from "./RequestInviteModal";
import { Layout, Typography, Button, Space } from "antd";
import { SuccessModal } from "./SuccessModal";
import "./App.css";

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const App = () => {
  const [isRequestModalVisible, setIsRequestModalVisible] =
    useState<boolean>(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] =
    useState<boolean>(false);

  return (
    <>
      <Layout className="page-container">
        <Header className="fixed-header">
          <Title style={{ color: "white", margin: 0, padding: 8 }}>
            Broccoli & Co.
          </Title>
        </Header>
        <Content className="page-content">
          <Space direction="vertical">
            <Title level={1}>A better way to enjoy everyday.</Title>
            <Paragraph>Be the first to know when we launch.</Paragraph>
            <Button
              type="primary"
              onClick={() => setIsRequestModalVisible(true)}
            >
              Request an invite
            </Button>
          </Space>
        </Content>
        <Footer className="fixed-footer">
          © Broccoli & Co. 2024 All Rights Reserved.
        </Footer>
      </Layout>

      <RequestInviteModal
        visible={isRequestModalVisible}
        onSubmitSuccess={() => {
          setIsRequestModalVisible(false);
          setIsSuccessModalVisible(true);
        }}
        onClose={() => setIsRequestModalVisible(false)}
      />
      <SuccessModal
        visible={isSuccessModalVisible}
        onClose={() => setIsSuccessModalVisible(false)}
      />
    </>
  );
};

export default App;

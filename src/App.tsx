import React, { useState } from "react";
import "./App.css";
import { RequestInviteModal } from "./RequestInviteModal";
import { Layout, Typography, Button } from "antd";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SuccessModal } from "./SuccessModal";
const { Title, Paragraph } = Typography;

const App = () => {
  const [isRequestModalVisible, setIsRequestModalVisible] =
    useState<boolean>(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] =
    useState<boolean>(false);

  return (
    <Layout>
      <Header />
      <Layout.Content
        style={{
          padding: "50px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Title level={1}>A better way to enjoy everyday.</Title>
          <Paragraph>Be the first to know when we launch.</Paragraph>
          <Button
            type="primary"
            variant="outlined"
            onClick={() => setIsRequestModalVisible(true)}
          >
            Request an invite
          </Button>
        </div>
      </Layout.Content>
      <Footer />
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
    </Layout>
  );
};

export default App;

import React from "react";
import { Layout, Typography } from "antd";
const { Title } = Typography;

export const Header = () => (
  <Layout.Header
    style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 10 }}
  >
    <Title style={{ color: "white", margin: 0 }}>Broccoli & Co.</Title>
  </Layout.Header>
);

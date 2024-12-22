import React from "react";
import { Layout } from "antd";

export const Footer = () => (
  <Layout.Footer
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      textAlign: "center",
    }}
  >
    © Broccoli & Co. 2024 All Rights Reserved.
  </Layout.Footer>
);

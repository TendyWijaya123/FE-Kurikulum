// components/FloatingButton.js
import React from 'react';
import { Button, Tooltip } from 'antd';
import { MessageOutlined } from '@ant-design/icons';


const FloatingButton = ({ onClick }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        zIndex: 9999,
      }}
    >
      <Tooltip title="Kirim Pesan?" placement="left">
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<MessageOutlined />}
          onClick={onClick}
        />
      </Tooltip>
    </div>
  );
};

export default FloatingButton;

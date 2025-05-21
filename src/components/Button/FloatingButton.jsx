// components/FloatingButton.js
import React from 'react';
import { Button, Tooltip } from 'antd';
import { MessageOutlined } from '@ant-design/icons';


const FloatingButton = ({ onClick, count = 0 }) => {
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
        >
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </Button>
      </Tooltip>
    </div>
  );
};

export default FloatingButton;

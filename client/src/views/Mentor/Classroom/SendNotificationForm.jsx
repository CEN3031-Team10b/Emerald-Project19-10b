import React, { useState } from 'react';
import { Button, Input, Form, message } from 'antd';

const SendNotificationForm = ({ studentIds }) => {
  const [notification, setNotification] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/notifications/send-targeted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: notification,
          studentIds: studentIds,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      message.success('Notification sent successfully!');
      setNotification('');
    } catch (error) {
      message.error(`Failed to send notification: ${error.message}`);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Notification Message">
        <Input.TextArea
          rows={4}
          value={notification}
          onChange={(e) => setNotification(e.target.value)}
          placeholder="Enter your notification message"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send Notification
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SendNotificationForm;

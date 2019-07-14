import React from "react";
import { Form, Button, Input } from "antd";

const CommentForm = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <Input.TextArea
        rows={4}
        onChange={onChange}
        value={value}
        placeholder="Type your thought."
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Comment
      </Button>
    </Form.Item>
  </div>
);

export default CommentForm;

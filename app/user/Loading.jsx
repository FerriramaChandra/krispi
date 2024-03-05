'use client';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export default function Loading() {
  return  (
  <div className="p-60 flex flex-col justify-center gap-3 text-4xl text-center font-medium text-primary">
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 80,
          }}
          spin
        />
      }
    />
  </div>
  )
}

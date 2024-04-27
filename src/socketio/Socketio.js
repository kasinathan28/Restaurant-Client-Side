import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { SOCKET_URL } from '../url/BASEURL';

const SocketComponent = () => {
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('Connected to server.');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server.');
    });

    socket.on('orderStatusUpdated', ({ orderId, status }) => {
      console.log('Order status updated:', orderId, status);
      if (orderId === "662d33ecb251bb7a7202e0a9") {
        setOrderStatus(status);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <p>Socket Connection</p>
      {orderStatus && <p>Order status updated: {orderStatus}</p>}
    </div>
  );
};

export default SocketComponent;

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { SOCKET_URL } from '../url/BASEURL';

const SocketComponent = ({ orderId, onOrderStatusUpdated }) => {
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('Connected to server.');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server.');
    });

    socket.on('orderStatusUpdated', ({ orderId: updatedOrderId, status }) => {
      console.log('Order status updated:', updatedOrderId, status);
      if (updatedOrderId === orderId) {
        setOrderStatus(status);
        onOrderStatusUpdated(status);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [orderId, onOrderStatusUpdated]);


};

export default SocketComponent;

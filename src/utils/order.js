export const isDone = (status) => {return (status && status) === 'done' ? { color: '#00cccc' } : undefined};

export const getOrderStatus = (status) => {
  if (status === 'created') {
    return 'Создан';
  } else if (status === 'pending') {
    return 'Готовится';
  } else if (status === 'done') {
    return 'Выполнен';
  }
};
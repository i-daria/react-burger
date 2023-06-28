export const isDone = (status: string): { color: string } | undefined => {return (status && status) === 'done' ? { color: '#00cccc' } : undefined};

export const getOrderStatus = (status: string): string | undefined=> {
  if (status === 'created') {
    return 'Создан';
  } else if (status === 'pending') {
    return 'Готовится';
  } else if (status === 'done') {
    return 'Выполнен';
  }
};
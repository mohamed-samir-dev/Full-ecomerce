export const getStatusStyle = (status: string) => {
  const styles = {
    pending: 'bg-gradient-to-r from-amber-400 to-orange-500',
    read: 'bg-gradient-to-r from-blue-400 to-blue-600',
    replied: 'bg-gradient-to-r from-green-400 to-green-600'
  };
  return styles[status as keyof typeof styles];
};

export const getStatusLabel = (status: string, isArabic: boolean) => {
  if (!isArabic) return status;
  const labels = {
    pending: 'قيد الانتظار',
    read: 'مقروءة',
    replied: 'تم الرد'
  };
  return labels[status as keyof typeof labels];
};

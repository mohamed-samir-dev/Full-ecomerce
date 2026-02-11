import { STATUS_COLORS, STATUS_LABELS } from '../constants';

export const getStatusStyle = (status: string) => {
  const color = STATUS_COLORS[status as keyof typeof STATUS_COLORS];
  return color ? `bg-gradient-to-r ${color}` : '';
};

export const getStatusLabel = (status: string, isArabic: boolean) => {
  const label = STATUS_LABELS[status as keyof typeof STATUS_LABELS];
  return label ? (isArabic ? label.ar : label.en) : status;
};

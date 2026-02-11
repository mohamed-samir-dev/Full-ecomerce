export const getApprovalStyle = (isApproved: boolean) => {
  return isApproved 
    ? 'bg-gradient-to-r from-green-400 to-green-600' 
    : 'bg-gradient-to-r from-amber-400 to-orange-500';
};

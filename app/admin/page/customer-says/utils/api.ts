const getAuthToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export const fetchTestimonials = async () => {
  const token = getAuthToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer-say/all`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  return data;
};

export const updateApproval = async (id: string, isApproved: boolean) => {
  const token = getAuthToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer-say/${id}/approval`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ isApproved })
  });
  return res;
};

export const deleteTestimonial = async (id: string) => {
  const token = getAuthToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer-say/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res;
};

export default async (action = '', props = {}) => {
    const res = await fetch(
      '/api',
      {
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify({ action, props })
      })
      
    return await res.json();
};
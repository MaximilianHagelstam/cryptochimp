import { useEffect } from 'react';

const Buy = () => {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/buy`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        symbol: 'ada',
        quantity: 2
      })
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  }, []);

  return <p>James</p>;
};

export default Buy;

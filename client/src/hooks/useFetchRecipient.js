import { useContext, useEffect, useState } from 'react';
import { baseUrl, getRequest } from '../utils/services';

export const useFetchRecipient = ({ chat, user }) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members.find((id) => id !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (!recipientId) return null;
        const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
        if (response.error) {
          setError(response);
        } else {
          setRecipientUser(response.user);
        }
      } catch (error) {
        setError({ error: 'An error occurred while fetching the recipient user.' });
      }
    };

    getUser();
  }, [recipientId]);

  useEffect(() => {
//    console.log('recipient user in hook', recipientUser);
  }, [recipientUser]); // Now you can log recipientUser after it's updated

  return { recipientUser, error };
};

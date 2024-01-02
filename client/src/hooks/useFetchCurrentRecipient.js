import { useContext, useEffect, useState } from 'react';
import { baseUrl, getRequest } from '../utils/services';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
export const useFetchCurrentRecipient = ({ chat, user1 }) => {

    const {currentChat} = useContext(ChatContext)
    const { user} = useContext(AuthContext)
  const [recipientUser1, setRecipientUser1] = useState(null);
  const [error, setError] = useState(null);

  const recipientId1 = currentChat?.members.find((id) => id !== user?._id);
  useEffect(() => {
    const getUser = async () => {
      try {
        if (!recipientId1) return null;
        const response = await getRequest(`${baseUrl}/users/find/${recipientId1}`);
        if (response.error) {
          setError(response);
        } else {
          setRecipientUser1(response.user);
        }
      } catch (error) {
        setError({ error: 'An error occurred while fetching the recipient user.' });
      }
    };

    getUser();
  }, [recipientId1]);

  useEffect(() => {
//    console.log('recipient user in hook', recipientUser1);
  }, [recipientUser1]); // Now you can log recipientUser after it's updated

  return { recipientUser1, error };
};

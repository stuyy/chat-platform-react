import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getConversationById } from '../api';

export function useConversationGuard() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const controller = new AbortController();

  useEffect(() => {
    console.log('Fetching Conversation');
    setLoading(true);
    getConversationById(parseInt(id!))
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [id]);

  return { loading, error };
}

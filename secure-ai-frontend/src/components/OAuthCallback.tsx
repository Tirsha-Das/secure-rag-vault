import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api/config';
import { saveAuth } from '../utils/token';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      if (error) {
        console.error('OAuth error:', error);
        navigate('/?error=oauth_failed');
        return;
      }

      if (!code) {
        navigate('/?error=no_code');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/oauth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('OAuth authentication failed');
        }

        const data = await response.json();
        
        if (data.token && data.user) {
          saveAuth(data.token, data.user);
          navigate('/profile');
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        navigate('/?error=auth_failed');
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <p>Authenticating with Google...</p>
    </div>
  );
};

export default OAuthCallback;

import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    // checkWindowPermission();
  }, []);

  const checkWindowPermission = async () => {
    try {
      let permission = await navigator.permissions.query({ name: 'window-management' });
      setStatus(permission.state);
      permission.addEventListener('change', (e) => {
        console.log(e);
      });
      if (permission.state === 'prompt' || permission.state === 'granted') {
        let screenDetails = await window.getScreenDetails().catch((e) => {
          console.log('Failed ', e);
        });
        if (screenDetails) {
          screenDetails.addEventListener('screenschange', (e) => {
            console.log('screenschange', e);
          });
        }
      }
    } catch (e) {
      console.log('Catch: ', e);
    }
  };
  return (
    <div className="App">
      <button onClick={() => checkWindowPermission()}>Click for Permission</button>
      <span className="status">
        Window Management Permission Status is <b className="statusBold">{status}</b>
      </span>
    </div>
  );
}

export default App;

import { useEffect } from 'react';
import './App.css';
import Routes from './Routes'
import storage from './lib/storage';
import * as userActions from './redux/modules/user';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => {
  const dispatch = useDispatch()
  const initializeUserInfo = async () => {
    const loggedInfo = storage.get('loggedInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.

    if(!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.
    
    dispatch(userActions.setLoggedInfo(loggedInfo))
    // access token 을 사용해서 로그인 정보가 맞는지 확인하는 코드
    // try {
    //     await dispatch(userActions.checkStatus())
    // } catch (e) {
    //     storage.remove('loggedInfo');
    //     alert('로그인 정보가 만료되었습니다.')
    //     window.location.href = '/login';
    // }
  }

  useEffect(()=> {
    initializeUserInfo()
  }, [])
  

  return (
    <Routes />
  );
}

export default App;
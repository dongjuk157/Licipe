import React from 'react'
import storage from '../../lib/storage'
import { useDispatch, useSelector } from 'react-redux'
import * as userActions from '../../redux/modules/user'

const Logout = () => {
  const dispatch = useDispatch()
  
  const user = useSelector((state) => state.user).toJS()
  const onLogout = async () => {
    try {
      await dispatch(userActions.logout())
    } catch (e) {
      console.log(e)
    }
    storage.remove('loggedInfo')
    window.location.href = '/' // 홈페이지로 새로고침
  }
  onLogout()
  return (
    <>
    </>
  )
}

export default Logout
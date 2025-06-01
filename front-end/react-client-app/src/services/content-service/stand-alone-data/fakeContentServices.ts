import type { User } from '../../../utils/types/data-types';
import fakeUserResponse from './fakeContentData.json'


export function fakeGetUser (): Promise<User> {
  return new Promise(res => {
    setTimeout(()=>{
  console.log('just returning base user');
      res(fakeUserResponse)
  }, 1500)
  })
  }
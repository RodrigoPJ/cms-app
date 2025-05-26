export function postLogIn(name: string, password: string){
  return new Promise<boolean>((res)=>{
    console.log('connecting to serrver....');
    setTimeout(()=>{
      console.log(`${name} with ${password} is now logged in` );
      res(true)
    }, 1500)
  })
}

export function postLogout(){
  return new Promise<boolean>((res)=>{
    console.log('connecting to serrver....');
    setTimeout(()=>{
      console.log(`now logged out` );
      res(true)
    }, 1500)
  })
}


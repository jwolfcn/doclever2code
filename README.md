# doclever2code
easily generate api code by doclever


Exp:


- From this:


![image text](https://github.com/jwolfcn/doclever2code/blob/master/assets/case1%402x.png)


- To Code:


```
/**
* 用户登录
* @param {String} account 用户名
* @param {String} password 密码
* @param {String} activationCode 激活码
*/
export function functionName({ account, password, activationCode }) {
  return request({
    url: '/auth/login',
    method: 'post',
    params: { account, password, activationCode }
  })
}
```
# Usage
1. Turn to doclever page of APIs
2. Open the nodes(the target APIs you wanna convert) of tree on the left
3. Paste the script to console of Devtool then you will get the code file

# Compatibility
Test well in Chrome Version 73.0.3683.86

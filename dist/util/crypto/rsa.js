"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const crypto=require("crypto"),constants=require("constants"),DEFAULT_RSA_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAL/m3nZB08ilDyCW\npCHFFgKIvBBWXeJnLsQWLZLAxkqlQXB8Hf81Kb2xYjfox6mA46lbUi7gkBs93JTz\nDRnaXq9DnNRrU+FPQsAJ8Li/xNSP05iIuvjMATRj6pxS/t8IQLv2i5eWM8kp1mG+\nJDuTuHIOSiUtHus1lVaDDZBbQh3rAgMBAAECgYBn4D2dP8a2/nnwxvozeW6PkppS\nMZ4CVp4e8G5c2NK9RzTkAZtvMMTWdLVY1D13yFfzrYYP7+ixhkvnqKT30JedT+zH\nFxVQJ4kK4aZnS9Gh1YFihrC5GMT5Ij+3+iExh4eP8l83tSS3uPwvJpGqpbF1M4Wq\nrZWFxeGcJhikNv8wcQJBAPiwHenVQUIX5YzuGuVfhMnDoOSWwz97qtN4OPhaD3w/\nJgNkgcBCqB9CQYe5qyJMkKMEX+QoFPiLdbdCNnwrCvMCQQDFi1Ip2zscOCLBS+Ym\n8KltubehsXw1NeQmRDsPH5tJwJH5XWFqyl0iToBi+oHXfvRA/FXrpeyxWy1io6Mi\nam8pAkEAjFQs/QbWJSqA4K53RNlKf+PBBVxBXrA069FaLGH9fPnRRHbRdKDoZ4Mm\noSTW+arErwhH5+HqO3nOehOF1TkgmwJAIM0LbYvLetoPW01BAAJB/8gwp5aS6zrx\nkTEPJWm4HTzugBtzS4oigMnMI6M44BFieU/s7F32uVRMau6E7fgCUQJATn6r8eWZ\nl3WDJWd+jC1bIDIy2f/VBc0ABxvhUgxX1TvhzzfCgPX9DPNOmrmmkgpW5rENeaxN\ntc8jY8jiIeWKlA==\n-----END PRIVATE KEY-----",DEFAULT_RSA_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/5t52QdPIpQ8glqQhxRYCiLwQ\nVl3iZy7EFi2SwMZKpUFwfB3/NSm9sWI36MepgOOpW1Iu4JAbPdyU8w0Z2l6vQ5zU\na1PhT0LACfC4v8TUj9OYiLr4zAE0Y+qcUv7fCEC79ouXljPJKdZhviQ7k7hyDkol\nLR7rNZVWgw2QW0Id6wIDAQAB\n-----END PUBLIC KEY-----",DEFAULT_RSA_KEY_SIZE=1024,splitBuffer=(t,n)=>{let r=t.length,e=0;const A=[];for(;r>0;){const p=r>n?n:r,c=e*n;A.push(t.slice(c,c+p)),r-=n,e++}return A};exports.privateEncrypt=((t,n,r)=>encrypt(t,!0,n||DEFAULT_RSA_PRIVATE_KEY,r||1024)),exports.publicDecrypt=((t,n,r)=>decrypt(t,!1,n||DEFAULT_RSA_PUBLIC_KEY,r||1024)),exports.publicEncrypt=((t,n,r)=>encrypt(t,!1,n||DEFAULT_RSA_PRIVATE_KEY,r||1024)),exports.privateDecrypt=((t,n,r)=>decrypt(t,!0,n||DEFAULT_RSA_PRIVATE_KEY,r||1024));const encrypt=(t,n,r,e)=>{const A=Buffer.from(t,"utf8"),p=splitBuffer(A,e/8-11),c=[];return p.forEach(t=>{c.push(n?crypto.privateEncrypt({key:r,padding:constants.RSA_PKCS1_PADDING},t):crypto.publicEncrypt({key:r,padding:constants.RSA_PKCS1_PADDING},t))}),Buffer.concat(c).toString("base64")},decrypt=(t,n,r,e)=>{const A=Buffer.from(t,"base64"),p=splitBuffer(A,e/8),c=[];return p.forEach(t=>{c.push(n?crypto.privateDecrypt({key:r,padding:constants.RSA_PKCS1_PADDING},t):crypto.publicDecrypt({key:r,padding:constants.RSA_PKCS1_PADDING},t))}),Buffer.concat(c).toString("utf8")};
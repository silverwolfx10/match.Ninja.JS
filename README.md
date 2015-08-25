### $match

Recupera os matches quando a correspondência de uma string contra uma Expressão Regular a funcao curry

```javascript
Ninja(['$match'], function ($match) {
 console.log($match('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', /[A-E]/gi));
});
```

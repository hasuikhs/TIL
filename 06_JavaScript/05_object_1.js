const me = {
    name : '한석',   // key가 한 단어일 때
    'phone number' : '01012345678', // key가 여러 단어일 때
    Products : {
        cup : 'cup',
        phone : 'phone'
    }
}

me.name     //"한석"
me['name']  //"한석"
me['phone number']  // "01012345678"
me.Products     // {cup: "cup", phone: "phone"}
me.Products.cup // "cup"
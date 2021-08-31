# ExcelJS

- JavaScript에서 Excel을 다루는 라이브러리

```bash
$ npm install exceljs
```

- front에서 사용하고 싶다면 해당 `exceljs.min.js` 만 뽑아서 script에 걸어줌
- front에서 file 다운로드까지 구현하고 싶다면 `FileSaver.min.js` 파일을 구해서 걸어야함

## 1. file 생성 & sheet 설정

```javascript
const workbook = new Workbook();
const sheet = workbook.addWorksheet('my sheet');
```

- 여러 sheet를 생성하고 sheet의 순서를 정할때

  ```javascript
  const secondSheet = workbook.addWorksheet('second sheet');
  const firstSheet = workbook.addWorksheet('first sheet');
  secondSheet.orderNo = 2;
  firstSheet.orderNo = 1;
  ```

  - `orderNo`를 정해준 시점에서 뒤에 나올 sheet의 순서를 따로 정해주지 않으면 정해진 `orderNo` 부터 시작
  - 위에서 `firstSheet.orderNo = 1`이 없으면 `orderNo`는 3으로 정해짐

## 2. header가 있는 excel

```javascript
sheet.columns = [
    { header: 'Id', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'accNo', key: 'acc_no', width: 10}
];

// header에서 정해준 key값에 맞게 row의 각 열의 key값도 맞춰주면 상관없이 들어감
sheet.addRow({'id': 1, 'name': 'test', 'acc_no': 123});
```

## 3. Style

```javascript
let percentFmtKey = ['ctr', 'conv_rate'];
let wonDollarKey = ['cpc', 'cost', 'm_rvn'];

sheet.eachRow({ includeEmpty: true }, function(row, rowNum) {
   row.eachCell(function(cell, colNum) {
       // header
       if (rowNum == 1) {
           cell.font = {
               bold: true
           };
           cell.alignment = {
               horizontal: 'center'
           };
           cell.fill = {
               type: 'pattern',
               pattern: 'solid',
               fgColor: {
                   argb: 'EAEAEA'
               }
           }
       } else {
           if (percentFmtKey.includes(cell['_column']['_key'])) {
               cell.numFmt = '#,##0.00%;;-';
               cell.alignment = {
                   horizontal: 'right'
               };
           } else if (wonDollarKey.includes(cell['_column']['_key'])) {
               cell.numFmt = '￦ #,##0;;-';
               cell.alignment = {
                   horizontal: 'right'
               }
           } else {
               cell.numFmt = '#,##0;;-';
               cell.alignment = {
                   horizontal: 'right'
               }
           }
       }
       
       cell.border = {
           top: {style: 'thin'},
           left: {style: 'thin'},
           bottom: {style: 'thin'},
           right: {style: 'thin'}
       }
   });
});
```

## file 다운로드

```javascript
let fileName = 'test.xlsx';

saveFile(fileName, workbook);

async function saveFile(fileName, workbook) {
    const xls64 = await workbook.xlsx.writeBuffer({
        base64: true
    });
    await saveAs(
    	new Blob([xls64], {
            type: 'application/vnd.openxmlformats-officdocument.spreadsheetml.sheet'
        }),
        fileName
    );
}
```


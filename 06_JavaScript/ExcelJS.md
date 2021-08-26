# ExcelJS

- JavaScript에서 Excel을 다루는 라이브러리

```bash
$ npm install exceljs
```

- front에서 사용하고 싶다면 해당 `exceljs.min.js` 만 뽑아서 script에 걸어줌
- front에서 file 다운로드까지 구현하고 싶다면 `FileSaver.min.js` 파일을 구해서 걸어야함

## 1. file 생성 & sheet 생성

```javascript
const workbook = new Workbook();
const sheet = workbook.addWorksheet('my sheet');
```

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


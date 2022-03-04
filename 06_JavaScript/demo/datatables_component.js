function CustomTable({
  targetId,               // table 태그 아이디
  keyColums,              // 키 컬럼
  indicatorColumns,       // 지표 컬럼
  etcConfig,              // 기타 설정 { dom, }
  requestOption,          // ajax 옵션 { func, url } // 키 변경시 필요
  drawCallback,           // drawCallback 함수 { clickEvent }
  initComplete,           // initComplete 함수 { clickEvent }
  createdRow,             // createdRow 함수
}) {
  if (!new.target) {
    throw new Error('Create table using new operator.');
  }

  const $target = document.querySelector(`#${targetId}`);
  $target.style.width = '100%';

  this.state = [];
  this.isFirst = true;

  this.setKeyColums = nextKeyColumns => {
    if (
      (keyColums.map(item => item.title).join('#_#') !== nextKeyColumns.map(item => item.title).join('#_#'))
      || (keyColums.map(item => item.title).sort().join('#_#') !== nextKeyColumns.map(item => item.title).sort().join('#_#'))
    ) {
      console.log('키가 바뀜');
    }

    keyColums = nextKeyColumns;

    // 변화시 
    this.renderFrame();
  }

  this.setIndicatorColumns = nextIndicatorColums => {
    indicatorColumns = nextIndicatorColums;

    this.renderFrame();
  }


  this.setState = nextState => {
    this.state = nextState;

    this.render(destroy = true);
  }

  this.setDrawCallbackEvent = () => {
    $target.addEventListener('click', drawCallback?.clickEvent);
  }

  this.setInitCompleteEvent = () => {
    $target.addEventListener('click', initComplete?.clickEvent);
  }

  // 테이블을 그리는 함수 config가 변화 될때마다 바뀌어야 함
  this.renderFrame = async () => {
    if ($target.childElementCount) {
      // 해당 부분이 기존 datatables라면 먼저 destroy
      if ($.fn.DataTable.isDataTable($target)) {
        $($target).DataTable().destroy();
      }
      $target.innerHTML = '';
    }

    $target.insertAdjacentHTML(
      'afterbegin',
      `<thead>
        <tr>
          ${[...keyColums, ...indicatorColumns].map(item => `
            <td style="text-align: center !important; ${item.orderable === false ? 'background-image: none !important;' : ''}" >${item.title}</td>
          `).join('')}
        </tr>
      </thead>`
    );

    this.renderDataTable(destroy = true);
  }

  this.renderDataTable = (destroy = false) => {
    if (destroy) {
      $($target).DataTable().destroy();
    }

    $($target).DataTable({
      dom: etcConfig?.dom || 'Bfltip',
      paging: this.state.length > 10 ? true : false,
      pageLength: 10,
      lengthChange: true,
      lengthMenu: [
        [10, 20, 50, 100, 200, -1],
        ['10개씩 보기', '20개씩 보기', '50개씩 보기', '100개씩 보기', '200개씩 보기', '전체 보기']
      ],
      language: {
        info: '조회된 항목수 _TOTAL_',
        infoFiltered: '',
        infoEmpty: '조회된 항목수 없음',
        search: '<div class="input-group">_INPUT_<span class="input-group-addon"><i class="fa fa-search"></i></span></div>',
        searchPlaceholder: '검색',
        lengthMenu: '_MENU_',
        zeroRecords: '검색된 데이터가 없습니다.',
        emptyTable: '데이터가 없습니다.'
      },
      columns: [...keyColums, ...indicatorColumns],
      data: this.state,
      responsive: true,
      drawCallback: () => this.isFirst && this.setDrawCallbackEvent(),
      initComplete: () => this.isFirst && this.setInitCompleteEvent(),
      createdRow: () => createdRow
    });
  }

  this.renderFrame();
  this.isFirst = false;
}

function makeToLimitDigitsString(number, fraction = 0) {
  let result;

  if (isNaN(Number(number))) {
    result = number;
  } else {
    result = Number(number).toLocaleString(undefined, {
      minimumFractionDigits: fraction,
      maximumFractionDigits: fraction
    });
  }

  return result;
}

function demoAsyncFunc(data, waitSec = 2) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, waitSec * 1_000);
  });
}
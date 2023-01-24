function CustomTable({
  targetId, // table 태그 아이디
  dimensionColumns = [], // 키 컬럼 or 기본 컬럼 지정
  metricColumns = [], // 지표 컬럼
  etcConfig, // 기타 설정 { dom, loadingBar, defaultOrder, exportColumns, excelFileTitle tableEvent(length, search, page) }
  requestOption, // ajax 옵션 { func, url, sendData, handler } // 키 변경시 필요
  drawCallback, // drawCallback 함수 { clickEvent }
  initComplete, // initComplete 함수 { clickEvent }
  createdRow, // createdRow 함수
}) {
  if (!new.target) {
    throw new Error("Create table using new operator.");
  }

  this.$target = document.querySelector(`#${targetId}`);

  this.curPageNo = undefined;
  this.curPageLength = undefined;

  this.state = [];
  this.isFirst = true;

  this.dimensionColumnConfig = {
    ad_provider: {
      title: "광고매체사",
      className: "tl",
      data: "ad_provider",
    },
    ad_platform: {
      title: "광고플랫폼",
      className: "tl",
      data: "ad_platform",
    },
    ad_program: {
      title: "광고상품",
      className: "tl",
      data: "ad_program",
    },
    stat_date: {
      title: "일자",
      className: "tl",
      width: "60px",
      data: "stat_date",
    },
    campaign: {
      title: "캠페인",
      className: "tl",
      data: "campaign",
    },
    adgroup: {
      title: "광고그룹",
      className: "tl",
      data: "adgroup",
    },
    keyword: {
      title: "키워드/소재",
      className: "tl",
      data: "keyword",
    },
  };

  this.metricColumnConfig = {
    m_impr: {
      title: "노출수",
      data: "m_impr",
      searchable: false,
      width: 200,
      render: (data) => (!data ? `-` : `${makeToLimitDigitsString(data)}`),
    },
    m_click: {
      title: "클릭수",
      data: "m_click",
      searchable: false,
      width: 100,
      render: (data) => (!data ? `-` : `${makeToLimitDigitsString(data)}`),
    },
    m_ctr: {
      title: "CTR",
      data: "m_ctr",
      searchable: false,
      width: 100,
      render: (data) =>
        !data ? `-` : `${makeToLimitDigitsString(data * 100, 2)}%`,
    },
    m_cpc: {
      title: "CPC",
      data: "m_cpc",
      searchable: false,
      width: 120,
      render: (data) => (!data ? `-` : `₩ ${makeToLimitDigitsString(data, 2)}`),
    },
    m_cost: {
      title: "광고비",
      data: "m_cost",
      searchable: false,
      width: 150,
      render: (data) => (!data ? `-` : `₩ ${makeToLimitDigitsString(data)}`),
    },
    m_conv: {
      title: "전환수",
      data: "m_conv",
      searchable: false,
      width: 100,
      render: (data) => (!data ? `-` : `${makeToLimitDigitsString(data)}`),
    },
    m_crt: {
      title: "전환율",
      data: "m_crt",
      searchable: false,
      width: 100,
      render: (data) =>
        !data ? `-` : `${makeToLimitDigitsString(data * 100, 2)}%`,
    },
    m_rvn: {
      title: "매출액",
      data: "m_rvn",
      searchable: false,
      width: 200,
      render: (data) => (!data ? `-` : `₩ ${makeToLimitDigitsString(data)}`),
    },
    m_roas: {
      title: "ROAS",
      data: "m_roas",
      searchable: false,
      width: 100,
      render: (data) =>
        !data ? `-` : `${makeToLimitDigitsString(data * 100)}%`,
    },
  };

  // 분석 차원이 바뀌는 경우
  this.setDimensionColumns = async (nextDimensionColumns) => {
    if (etcConfig?.loading) {
      etcConfig.loading.style.display = "block";
      document.body.style.cursor = "progress";
    }

    await sleepTime(100);

    if (
      // 바뀐 dimension이 기존 dimension과 다를 경우(순서, 개수)
      nextDimensionColumns.length > 0 &&
      (dimensionColumns.map((item) => item) !==
        nextDimensionColumns.map((item) => item) ||
        dimensionColumns.map((item) => item).sort() !==
          nextDimensionColumns.map((item) => item).sort())
    ) {
      // ajax 함수 데이터 가져오는 부분
      if (requestOption) {
        await requestOption.func(
          requestOption.url,
          {
            dimension: nextDimensionColumns.map((item) => item).join(","),
            client_seq: $("#report_client_select").val(),
            psDate: $("#reportrange")
              .data("daterangepicker")
              .startDate.format("YYYY-MM-DD"),
            peDate: $("#reportrange")
              .data("daterangepicker")
              .endDate.format("YYYY-MM-DD"),
            device: $("#select_device").val()
              ? $("#select_device").val().join(",")
              : "",
            ad_type: $("#select_ad_type").val()
              ? $("#select_ad_type").val().join(",")
              : "",
            ...requestOption.sendData.split(",").reduce(
              (a, v) => ({
                ...a,
                [v]: $(`#select_${v}`).val()
                  ? $(`#select_${v}`).val().join(",")
                  : "",
              }),
              {}
            ),
          },
          (data, param) => (this.state = data),
          null,
          false // 동기 처리
        );
      }
    }

    dimensionColumns = nextDimensionColumns;

    this.renderFrame();
  };

  // 분석 지표가 바뀌는 경우
  this.setMetricColumns = (nextMetricColumns) => {
    metricColumns = nextMetricColumns;

    this.renderFrame();
  };

  // 데이터만 바뀌는 경우 filter
  this.setState = async (nextState) => {
    if (etcConfig?.loading) {
      etcConfig.loading.style.display = "block";
      document.body.style.cursor = "progress";
    }

    this.setPageOption();
    await sleepTime(100);

    this.state = nextState;

    this.renderDataTable((destroy = true));

    this.applyPageOption();
  };

  this.setDrawCallbackEvent = () => {
    drawCallback?.default();
    this.isFirst &&
      this.$target.addEventListener("click", drawCallback?.clickEvent);
  };

  this.setInitCompleteEvent = () => {
    this.$target.addEventListener("click", initComplete?.clickEvent);
    this.$target.addEventListener("change", initComplete?.changeEvent);
  };

  // 테이블 프레임 그리는 함수 config가 변화될 때마다 바뀌어야 함
  this.renderFrame = () => {
    let isDestroy = false;
    if (this.$target.childElementCount) {
      // 해당 부분이 기존 datatables라면 먼저 destroy
      if ($.fn.DataTable.isDataTable(this.$target)) {
        $(this.$target).DataTable().destroy();
        isDestroy = true;
      }
      this.$target.innerHTML = "";
    }

    if (!dimensionColumns?.length) {
      if (etcConfig?.loading) {
        etcConfig.loading.style.display = "none";
        document.body.style.cursor = "auto";
      }

      return this.$target.insertAdjacentHTML(
        "beforeend",
        `<div class="empty-block">
          <h4 class="tc font13 mt0">분석 차원을 1개 이상 선택해주세요.</h4>
        </div>`
      );
    }

    this.$target.insertAdjacentHTML(
      "afterbegin",
      `<thead>
        <tr>
          ${[
            ...dimensionColumns.map(
              (item) => this.dimensionColumnConfig[item] || item
            ),
            ...metricColumns.map(
              (item) => this.metricColumnConfig[item] || item
            ),
          ]
            .map(
              (item) => `
                <th
                  class="${
                    this.dimensionColumnConfig?.[item.data]
                      ? "th-dim"
                      : this.metricColumnConfig?.[item.data]
                      ? "th-met"
                      : ""
                  }"
                  style="text-align: center !important; ${
                    item.orderable === false
                      ? "background-image: none !important;"
                      : ""
                  }"
                >
                  ${item.title}
                </th>
              `
            )
            .join("")}
        </tr>
      </thead>`
    );

    this.renderDataTable((destroy = isDestroy));
  };

  // 테이블 랜더링 전 후 유지하기 위한 함수
  this.setPageOption = () => {
    this.curPageNo = $(this.$target).DataTable().page();
    this.curPageLength = $(this.$target).DataTable().page.len();
  };

  // 테이블 랜더링 전 후 유지하기 위한 함수
  this.applyPageOption = () => {
    this.curPageLength &&
      $(this.$target).DataTable().page.len(this.curPageLength).draw();
    this.curPageNo &&
      $(this.$target).DataTable().page(this.curPageNo).draw("page");
  };

  this.renderDataTable = (destroy = false) => {
    if (destroy) {
      $(this.$target).DataTable().destroy();
    }

    $(this.$target)
      .DataTable({
        autoWidth: false,
        dom: etcConfig?.dom || "Bfltip",
        paging: this.state.length > 10 ? true : false,
        pageLength: 10,
        lengthChange: true,
        lengthMenu: [
          [10, 20, 50, 100, 200, -1],
          [
            "10개씩 보기",
            "20개씩 보기",
            "50개씩 보기",
            "100개씩 보기",
            "200개씩 보기",
            "전체 보기",
          ],
        ],
        buttons: [
          {
            extend: "excel",
            tag: "a",
            text: '<button type="button" id="btn-excel" class="btn btn-default btn-sm mr5"><span>Excel</span></button>',
            filename: etcConfig?.excelFileTitle || "table",
            title: "",
            exportOptions: {
              columns: etcConfig?.exportColumns || undefined,
            },
          },
        ],
        language: {
          info: "조회된 항목수 _TOTAL_",
          infoFiltered: "",
          infoEmpty: "조회된 항목수 없음",
          search:
            '<div class="input-group">_INPUT_<span class="input-group-addon"><i class="fa fa-search"></i></span></div>',
          searchPlaceholder: "검색",
          lengthMenu: "_MENU_",
          zeroRecords: "검색된 데이터가 없습니다.",
          emptyTable: "데이터가 없습니다.",
        },
        columns: [
          ...dimensionColumns.map((item, index) => {
            let result = this.dimensionColumnConfig[item]
              ? _.cloneDeep(this.dimensionColumnConfig[item])
              : item;

            if (metricColumns.length && index == dimensionColumns.length - 1) {
              result.className += " last-dim";
            }

            return result;
          }),
          ...metricColumns.map((item) => this.metricColumnConfig[item]),
        ],
        data: this.state,
        order: etcConfig?.defaultOrder || [[0, "asc"]],
        ordering: etcConfig?.ordering === false ? false : true,
        drawCallback: () => this.setDrawCallbackEvent(),
        initComplete: () => this.isFirst && this.setInitCompleteEvent(),
        createdRow: () => createdRow,
      })
      .on("page.dt", etcConfig?.tableEvent)
      .on("search.dt", etcConfig?.tableEvent)
      .on("length.dt", etcConfig?.tableEvent);

    if (etcConfig?.loading) {
      etcConfig.loading.style.display = "none";
      document.body.style.cursor = "auto";
    }
  };

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
      maximumFractionDigits: fraction,
    });
  }

  return result;
}

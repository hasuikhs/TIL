# 03_04 탐색(Search)

## 1. 선형 탐색

- 데이터가 마구잡이로 나열되어 있어도 적용 가능
- 작업이 단순해서 배열의 앞에서부터 순서대로 데이터를 확인
- 데이터 수가 많고 대상 데이터가 배열 뒤에 있는 경우와 없는 경우 시간이 오래 걸림
- 시간 복잡도는 **_O_(_n_)**

## 2. 이진 탐색

- 데이터가 정렬된 경우에만 적용 가능

- 가운데 데이터와 대상 데이터를 비교해서 왼쪽 또는 오른쪽으로 이동을 반복

- 시간 복잡도는 **_O_(log _n_)**

  ![image-20200220132829422](03_04_탐색(Search).assets/image-20200220132829422.png)
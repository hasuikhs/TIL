import { add } from '../src/calc';

// describe: 테스트 단위를 묶는 가장 큰 단위
// 테스트 시 describe에 설명된 내용으로 테스트 단위를 크게 분류
describe("test add function", () => {
    
    let temp: number;
    // it()이 실행할 때마다 실행해주는 전처리기
    beforeEach(() => {
        temp = 1;
    });

    // it()가 종료될 때마다 실행하는 후처리기
    afterEach(() => {
        temp = 0;
    });

    it('test1', () => {
        expect(temp).toBe(1);
    });

    it('test2', () => {
        expect(temp).toBe(1);
    })

    // // test(), it(): 기본 테스트
    // it("should return 15 for add(10, 5)", () => {
    //     // expect 안에 테스트할 변수나 값을 넣음 이후 toBe나 toEqual을 이용해 예측 값과 비교
    //     // toBe는 단순 비교, toEqual은 배열이나 객체 내부까지 깊은 비교
    //     expect(add(10, 5)).toBe(15);
    // })

    // it("should return 5 for add(2, 3)", () => {
    //     expect(add(2, 3)).toBe(5);
    // })
})
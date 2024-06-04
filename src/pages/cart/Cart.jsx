import { PageContainer } from '../../components/PageContainer';
import CustomButton from '../../components/ui/CustomButton';

function Cart() {
  return (
    <PageContainer>
      <div>
        <ul className="tw-flex tw-gap-10">
          <li>장바구니</li>
          <li>주문</li>
          <li>완료</li>
        </ul>
      </div>
      {/*todo 컴포넌트 나누기 */}
      <header className="title tw-h-24 tw-flex tw-items-center">
        <h1 className="tw-font-semibold tw-text-2xl">장바구니</h1>
      </header>
      <div
        className="tw-relative tw-grid tw-grid-cols-12 tw-mt-5 tw-gap-x-5 tw-max-w-[1440px] tw-min-h-[4000px] h-[4000px]">
        <div className="main content tw-col-span-9 tw-bg-red-100">

          {/* todo 컴포넌트 나누기 */}
          <div className="detailslayout tw-min-h-[1000px]">
            <header className="tw-flex tw-bg-gray-400 md:tw-min-h-14">

            </header>
            <div>

            </div>
          </div>
        </div>
        <div className="tw-col-span-3 tw-relative">
          <div className="tw-absolute tw-top-0 tw-right-0 tw-w-full">
            <div className="cartInfo tw-relative tw-min-h-96 tw-min-w-full">
              <div
                className="tw-relative tw-m-5 tw-p-5 tw-border tw-border-solid tw-rounded-[25px] tw-border-gray-500/70">
                <div
                  className="tw-flex tw-justify-between  tw-min-h-[100px] tw-w-full tw-border-solid tw-border-0 tw-border-b tw-border-gray-500/70">
                  <div className="tw-flex tw-flex-col tw-gap-3">
                    <div>주문금액</div>
                    <div>배송비</div>
                    <div>할인 금액</div>
                  </div>
                  <div className="tw-flex tw-flex-col tw-items-end tw-gap-3">
                    <div>40,000원</div>
                    <div>0원</div>
                    <div>-4000원</div>
                  </div>
                </div>
                <div className="cartBottom tw-flex tw-justify-between tw-pt-3">
                  <div>총주문 금액</div>
                  <div>40000원</div>
                </div> {/*CartBottom End */}
                <div className="tw-flex tw-justify-center tw-mt-5">
                  <CustomButton color='success' size="large" text="주문하기"></CustomButton>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Cart;

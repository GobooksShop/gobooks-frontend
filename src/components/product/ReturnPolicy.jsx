import React from 'react';
import { Typography, Divider, Box } from '@mui/material';

function ReturnPolicy() {
  return (
      <Box className="tw-p-4 tw-md:p-8 tw-mt-10">
        <Typography variant="h5" gutterBottom>
          교환/반품/품절 안내
        </Typography>
        <Divider sx={{ my:3 }}/>

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          반품/교환 방법
        </Typography>
        <Typography variant="body2" gutterBottom>
          마이페이지 &gt; 주문관리 &gt; 주문/배송내역 &gt; 주문조회 &gt; 반품/교환 신청
        </Typography>
        <Typography variant="body2" gutterBottom>
          [1:1 상담 &gt; 반품/교환/환불] 또는 고객센터 (1544-1900)
        </Typography>

        <Divider sx={{ my:2 }}/>

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          반품/교환가능 기간
        </Typography>
        <Typography variant="body2" gutterBottom>
          변심반품의 경우 수령 후 7일 이내,
        </Typography>
        <Typography variant="body2" gutterBottom>
          상품의 결함 및 계약내용과 다를 경우 문제점 발견 후 30일 이내
        </Typography>

        <Divider sx={{ my:2 }}/>

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          반품/교환비용
        </Typography>
        <Typography variant="body2" gutterBottom>
          변심 혹은 구매착오로 인한 반품/교환은 반송료 고객 부담
        </Typography>

        <Divider sx={{ my:2 }}/>

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          반품/교환 불가 사유
        </Typography>
        <Typography variant="body2" gutterBottom>
          1) 소비자의 책임 있는 사유로 상품 등이 손실 또는 훼손된 경우 (단지 확인을 위한 포장 훼손은 제외)
        </Typography>
        <Typography variant="body2" gutterBottom>
          2) 소비자의 사용, 포장 개봉에 의해 상품 등의 가치가 현저히 감소한 경우
        </Typography>
        <Typography variant="body2" gutterBottom>
          3) 복제가 가능한 상품 등의 포장을 훼손한 경우
        </Typography>
        <Typography variant="body2" gutterBottom>
          4) 소비자의 요청에 따라 개별적으로 주문 제작되는 상품의 경우 ((1)해외주문도서)
        </Typography>
        <Typography variant="body2" gutterBottom>
          5) 디지털 컨텐츠인 ebook, 오디오북 등을 1회이상 ‘다운로드’를 받았거나 ‘바로보기’로 열람한 경우
        </Typography>
        <Typography variant="body2" gutterBottom>
          6) 시간의 경과에 의해 재판매가 곤란한 정도로 가치가 현저히 감소한 경우
        </Typography>
        <Typography variant="body2" gutterBottom>
          7) 전자상거래 등에서의 소비자보호에 관한 법률이 정하는 소비자 청약철회 제한 내용에 해당되는 경우
        </Typography>
        <Typography variant="body2" gutterBottom>
          8) 세트상품 일부만 반품 불가 (필요시 세트상품 반품 후 낱권 재구매)
        </Typography>

        <Divider sx={{ my:2 }}/>

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          상품 품절
        </Typography>
        <Typography variant="body2" gutterBottom>
          공급사(출판사) 재고 사정에 의해 품절/지연될 수 있으며, 품절 시 관련 사항에 대해서는 이메일과 문자로 안내드리겠습니다.
        </Typography>

        <Divider sx={{ my:2 }}/>

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          소비자 피해보상 환불 지연에 따른 배상
        </Typography>
        <Typography variant="body2" gutterBottom>
          1) 상품의 불량에 의한 교환, A/S, 환불, 품질보증 및 피해보상 등에 관한 사항은 소비자분쟁 해결 기준 (공정거래위원회 고시)에 준하여 처리됨
        </Typography>
        <Typography variant="body2" gutterBottom>
          2) 대금 환불 및 환불지연에 따른 배상금 지급 조건, 절차 등은 전자상거래 등에서의 소비자 보호에 관한 법률에 따라 처리함
        </Typography>

      </Box>
  );
}

export default ReturnPolicy;

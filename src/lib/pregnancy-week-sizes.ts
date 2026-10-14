/**
 * Kích thước ước lượng của bé theo tuần (spec 009) — bảng NHỎ tách riêng
 * khỏi nội dung tuần đầy đủ (`pregnancy-weeks-t*.ts`) vì dashboard import
 * nó ở client; nội dung đầy đủ chỉ page server dùng.
 *
 * Số liệu là trung bình tham khảo (babycenter / NHS, làm tròn): tới tuần 20
 * đo đầu–mông (CRL), từ tuần 21 đo đầu–gót. Ví dụ trái cây chọn loại quen
 * ở Việt Nam. Tuần 1–3 chưa có phôi (tính từ ngày đầu kỳ kinh cuối).
 */
export interface WeekSize {
  week: number;
  /** So sánh trái cây — '' khi chưa có phôi. */
  fruit: string;
  emoji: string;
  lengthCm: number | null;
  weightG: number | null;
  /** 'crl' = đầu–mông, 'heel' = đầu–gót, 'none' = chưa đo được. */
  measure: 'none' | 'crl' | 'heel';
  /** Một câu cho dashboard. */
  headline: string;
}

export const WEEK_SIZES: readonly WeekSize[] = [
  {
    week: 1,
    fruit: '',
    emoji: '🌙',
    lengthCm: null,
    weightG: null,
    measure: 'none',
    headline:
      'Tuần đầu của kỳ kinh cuối — bé chưa hình thành, cơ thể mẹ đang chuẩn bị.',
  },
  {
    week: 2,
    fruit: '',
    emoji: '🌱',
    lengthCm: null,
    weightG: null,
    measure: 'none',
    headline:
      'Tuần rụng trứng — thời điểm thụ thai thường rơi vào cuối tuần này.',
  },
  {
    week: 3,
    fruit: 'hạt bụi li ti',
    emoji: '✨',
    lengthCm: null,
    weightG: null,
    measure: 'none',
    headline:
      'Trứng đã thụ tinh, đang chia tế bào và tìm đường về làm tổ trong tử cung.',
  },
  {
    week: 4,
    fruit: 'hạt mè',
    emoji: '🌰',
    lengthCm: 0.1,
    weightG: null,
    measure: 'crl',
    headline: 'Phôi làm tổ xong, que thử có thể lên hai vạch mờ.',
  },
  {
    week: 5,
    fruit: 'hạt đậu xanh',
    emoji: '🫘',
    lengthCm: 0.3,
    weightG: null,
    measure: 'crl',
    headline:
      'Ống thần kinh bắt đầu hình thành — acid folic quan trọng nhất lúc này.',
  },
  {
    week: 6,
    fruit: 'hạt đậu đen',
    emoji: '🫘',
    lengthCm: 0.6,
    weightG: null,
    measure: 'crl',
    headline: 'Tim bé bắt đầu đập, có thể thấy trên siêu âm đầu dò.',
  },
  {
    week: 7,
    fruit: 'quả việt quất',
    emoji: '🫐',
    lengthCm: 1.3,
    weightG: null,
    measure: 'crl',
    headline: 'Mầm tay chân nhú ra, não phát triển rất nhanh.',
  },
  {
    week: 8,
    fruit: 'hạt đậu đỏ',
    emoji: '🫘',
    lengthCm: 1.6,
    weightG: 1,
    measure: 'crl',
    headline: 'Ngón tay ngón chân có màng, bé bắt đầu cử động nhẹ.',
  },
  {
    week: 9,
    fruit: 'quả nho',
    emoji: '🍇',
    lengthCm: 2.3,
    weightG: 2,
    measure: 'crl',
    headline: 'Đuôi phôi biến mất, bé chính thức là thai nhi từ tuần sau.',
  },
  {
    week: 10,
    fruit: 'quả quất',
    emoji: '🍊',
    lengthCm: 3.1,
    weightG: 4,
    measure: 'crl',
    headline:
      'Các cơ quan chính đã có đủ, giờ là giai đoạn lớn lên và hoàn thiện.',
  },
  {
    week: 11,
    fruit: 'quả sung',
    emoji: '🟣',
    lengthCm: 4.1,
    weightG: 7,
    measure: 'crl',
    headline:
      'Bé biết nuốt và đá chân; mốc siêu âm độ mờ da gáy bắt đầu từ tuần này.',
  },
  {
    week: 12,
    fruit: 'quả chanh',
    emoji: '🍋',
    lengthCm: 5.4,
    weightG: 14,
    measure: 'crl',
    headline: 'Phản xạ xuất hiện; nguy cơ sảy thai giảm rõ sau mốc này.',
  },
  {
    week: 13,
    fruit: 'quả chanh dây',
    emoji: '🟡',
    lengthCm: 7.4,
    weightG: 23,
    measure: 'crl',
    headline: 'Khép lại tam cá nguyệt 1 — ốm nghén thường dịu dần.',
  },
  {
    week: 14,
    fruit: 'quả đào',
    emoji: '🍑',
    lengthCm: 8.7,
    weightG: 43,
    measure: 'crl',
    headline: 'Bé biết nhăn mặt, nheo mắt; mẹ bước vào giai đoạn dễ chịu nhất.',
  },
  {
    week: 15,
    fruit: 'quả táo',
    emoji: '🍎',
    lengthCm: 10.1,
    weightG: 70,
    measure: 'crl',
    headline: 'Bé cảm nhận được ánh sáng dù mắt còn nhắm.',
  },
  {
    week: 16,
    fruit: 'quả bơ',
    emoji: '🥑',
    lengthCm: 11.6,
    weightG: 100,
    measure: 'crl',
    headline: 'Có thể bắt đầu cảm thấy thai máy nhẹ như bong bóng.',
  },
  {
    week: 17,
    fruit: 'quả lê',
    emoji: '🍐',
    lengthCm: 13,
    weightG: 140,
    measure: 'crl',
    headline: 'Bé tích mỡ, xương chắc dần — canxi quan trọng từ đây.',
  },
  {
    week: 18,
    fruit: 'quả ớt chuông',
    emoji: '🫑',
    lengthCm: 14.2,
    weightG: 190,
    measure: 'crl',
    headline: 'Tai bé đã nghe được — nói chuyện với bé được rồi.',
  },
  {
    week: 19,
    fruit: 'quả xoài',
    emoji: '🥭',
    lengthCm: 15.3,
    weightG: 240,
    measure: 'crl',
    headline: 'Lớp sáp trắng (vernix) bảo vệ da bé bắt đầu hình thành.',
  },
  {
    week: 20,
    fruit: 'quả chuối',
    emoji: '🍌',
    lengthCm: 16.4,
    weightG: 300,
    measure: 'crl',
    headline: 'Nửa chặng đường! Tuần của siêu âm hình thái học.',
  },
  {
    week: 21,
    fruit: 'củ cà rốt',
    emoji: '🥕',
    lengthCm: 26.7,
    weightG: 360,
    measure: 'heel',
    headline: 'Thai máy rõ hơn; bé nuốt nước ối để tập tiêu hóa.',
  },
  {
    week: 22,
    fruit: 'quả đu đủ nhỏ',
    emoji: '🧡',
    lengthCm: 27.8,
    weightG: 430,
    measure: 'heel',
    headline: 'Mặt bé đã đủ nét: môi, mí mắt, lông mày.',
  },
  {
    week: 23,
    fruit: 'quả bưởi',
    emoji: '🍈',
    lengthCm: 28.9,
    weightG: 500,
    measure: 'heel',
    headline: 'Phổi bắt đầu tạo chất hoạt diện (surfactant) để sau này tự thở.',
  },
  {
    week: 24,
    fruit: 'bắp ngô',
    emoji: '🌽',
    lengthCm: 30,
    weightG: 600,
    measure: 'heel',
    headline:
      'Mốc "có khả năng sống" nếu sinh non; tuần tầm soát tiểu đường thai kỳ.',
  },
  {
    week: 25,
    fruit: 'bông súp lơ',
    emoji: '🥦',
    lengthCm: 34.6,
    weightG: 660,
    measure: 'heel',
    headline: 'Bé phản ứng với giọng nói quen, da bớt nhăn nhờ mỡ.',
  },
  {
    week: 26,
    fruit: 'quả dưa leo',
    emoji: '🥒',
    lengthCm: 35.6,
    weightG: 760,
    measure: 'heel',
    headline: 'Mắt bé bắt đầu mở; nhịp ngủ – thức rõ dần.',
  },
  {
    week: 27,
    fruit: 'bắp cải nhỏ',
    emoji: '🥬',
    lengthCm: 36.6,
    weightG: 875,
    measure: 'heel',
    headline: 'Khép lại tam cá nguyệt 2 — bé biết nấc, biết mút tay.',
  },
  {
    week: 28,
    fruit: 'quả cà tím',
    emoji: '🍆',
    lengthCm: 37.6,
    weightG: 1005,
    measure: 'heel',
    headline: 'Vào tam cá nguyệt 3; bắt đầu đếm cử động thai mỗi ngày.',
  },
  {
    week: 29,
    fruit: 'quả bí hồ lô',
    emoji: '🎃',
    lengthCm: 38.6,
    weightG: 1150,
    measure: 'heel',
    headline: 'Não phát triển mạnh, bé đạp mạnh hơn hẳn.',
  },
  {
    week: 30,
    fruit: 'quả bắp cải',
    emoji: '🥬',
    lengthCm: 39.9,
    weightG: 1320,
    measure: 'heel',
    headline: 'Bé tăng khoảng 200 g mỗi tuần từ đây.',
  },
  {
    week: 31,
    fruit: 'quả dừa',
    emoji: '🥥',
    lengthCm: 41.1,
    weightG: 1500,
    measure: 'heel',
    headline: 'Bé xoay đầu nhiều, có thể đã quay đầu xuống.',
  },
  {
    week: 32,
    fruit: 'củ sắn (củ đậu)',
    emoji: '🤍',
    lengthCm: 42.4,
    weightG: 1700,
    measure: 'heel',
    headline: 'Móng tay móng chân đủ; tuần siêu âm tăng trưởng.',
  },
  {
    week: 33,
    fruit: 'quả dứa',
    emoji: '🍍',
    lengthCm: 43.7,
    weightG: 1920,
    measure: 'heel',
    headline:
      'Xương sọ còn mềm để chui qua ống sinh; hệ miễn dịch nhận kháng thể từ mẹ.',
  },
  {
    week: 34,
    fruit: 'quả dưa lưới',
    emoji: '🍈',
    lengthCm: 45,
    weightG: 2150,
    measure: 'heel',
    headline: 'Phổi gần hoàn thiện; chuẩn bị giỏ đồ đi sinh được rồi.',
  },
  {
    week: 35,
    fruit: 'quả dưa mật',
    emoji: '🍈',
    lengthCm: 46.2,
    weightG: 2380,
    measure: 'heel',
    headline:
      'Thận và gan đã hoạt động; tuần xét nghiệm liên cầu khuẩn nhóm B.',
  },
  {
    week: 36,
    fruit: 'quả đu đủ lớn',
    emoji: '🧡',
    lengthCm: 47.4,
    weightG: 2620,
    measure: 'heel',
    headline:
      'Bé thường tụt xuống khung chậu — mẹ dễ thở hơn, đi tiểu nhiều hơn.',
  },
  {
    week: 37,
    fruit: 'quả bí đao',
    emoji: '🥒',
    lengthCm: 48.6,
    weightG: 2860,
    measure: 'heel',
    headline: 'Đủ tháng sớm: sinh từ tuần này bé đã sẵn sàng.',
  },
  {
    week: 38,
    fruit: 'quả bí ngô nhỏ',
    emoji: '🎃',
    lengthCm: 49.8,
    weightG: 3080,
    measure: 'heel',
    headline: 'Bé rụng dần lớp lông tơ, tích mỡ cuối cùng.',
  },
  {
    week: 39,
    fruit: 'quả dưa hấu nhỏ',
    emoji: '🍉',
    lengthCm: 50.7,
    weightG: 3290,
    measure: 'heel',
    headline: 'Đủ tháng: có thể chuyển dạ bất cứ lúc nào.',
  },
  {
    week: 40,
    fruit: 'quả dưa hấu',
    emoji: '🍉',
    lengthCm: 51.2,
    weightG: 3460,
    measure: 'heel',
    headline: 'Tuần dự sinh! Chỉ khoảng 5% bé sinh đúng ngày, đừng sốt ruột.',
  },
  {
    week: 41,
    fruit: 'quả dưa hấu to',
    emoji: '🍉',
    lengthCm: 51.5,
    weightG: 3600,
    measure: 'heel',
    headline: 'Quá ngày dự sinh — bác sĩ sẽ theo dõi sát nước ối và tim thai.',
  },
  {
    week: 42,
    fruit: 'quả bí ngô lớn',
    emoji: '🎃',
    lengthCm: 51.7,
    weightG: 3700,
    measure: 'heel',
    headline:
      'Thai già tháng — thường được khởi phát chuyển dạ trong tuần này.',
  },
];

/** Tra theo tuần; ngoài 1..42 → undefined (caller kẹp bằng clampGuideWeek). */
export function weekSize(week: number): WeekSize | undefined {
  return WEEK_SIZES.find((item) => item.week === week);
}

/** '~7,4 cm · ~23 g' / '~0,3 cm' / '' — gọn cho thẻ kích thước. */
export function formatSize(size: WeekSize): string {
  const parts: string[] = [];
  if (size.lengthCm !== null) {
    parts.push(`~${size.lengthCm.toLocaleString('vi-VN')} cm`);
  }
  if (size.weightG !== null) {
    parts.push(
      size.weightG >= 1000
        ? `~${(size.weightG / 1000).toLocaleString('vi-VN', { maximumFractionDigits: 2 })} kg`
        : `~${size.weightG} g`
    );
  }
  return parts.join(' · ');
}

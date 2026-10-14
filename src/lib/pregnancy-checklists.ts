/**
 * Sáu checklist mẫu cho khu /be-yeu-dotro/ (spec 009, AC-17). Trạng thái tick
 * lưu ở Firestore `pregnancyChecklist/<list.id>` theo `item.id` — vì vậy
 * `id` của list và item là HỢP ĐỒNG: đổi id là mất tick cũ; thêm item mới
 * cứ thêm id mới. Client (trang checklist + dashboard) import file này.
 */
export interface ChecklistItem {
  id: string;
  text: string;
  /** Giải thích ngắn, hiện mờ dưới item. */
  note?: string;
}

export interface ChecklistGroup {
  title: string;
  items: ChecklistItem[];
}

export interface Checklist {
  id: string;
  title: string;
  emoji: string;
  intro: string;
  groups: ChecklistGroup[];
}

export const CHECKLISTS: readonly Checklist[] = [
  {
    id: 't1',
    title: 'Tam cá nguyệt 1',
    emoji: '🌱',
    intro: 'Tuần 1–13: xác nhận thai, đặt nền nếp và không bỏ lỡ mốc sàng lọc.',
    groups: [
      {
        title: 'Sức khỏe',
        items: [
          {
            id: 't1-folic',
            text: 'Uống acid folic 400 mcg mỗi ngày (vitamin bầu có sẵn)',
          },
          {
            id: 't1-first-visit',
            text: 'Khám thai lần đầu tuần 6–10, nghe tim thai',
            note: 'Mốc chốt ngày dự sinh — nhập lại vào Cài đặt nếu bác sĩ sửa.',
          },
          { id: 't1-bloods', text: 'Xét nghiệm máu, nước tiểu cơ bản lần đầu' },
          {
            id: 't1-nt',
            text: 'Siêu âm độ mờ da gáy + Double test / NIPT (tuần 11–13t6n)',
          },
          {
            id: 't1-meds',
            text: 'Rà soát thuốc đang dùng với bác sĩ (kể cả thực phẩm chức năng)',
          },
          { id: 't1-dentist', text: 'Khám răng một lần' },
        ],
      },
      {
        title: 'Sinh hoạt',
        items: [
          {
            id: 't1-quit',
            text: 'Bỏ rượu, thuốc lá; cà phê dưới 200 mg caffeine/ngày',
          },
          {
            id: 't1-food-safety',
            text: 'Đọc danh sách thực phẩm nên tránh trong Cẩm nang dinh dưỡng',
          },
          {
            id: 't1-sleep',
            text: 'Ngủ sớm hơn 1 tiếng, ngủ trưa ngắn nếu được',
          },
          {
            id: 't1-nausea-kit',
            text: 'Chuẩn bị "bộ chống nghén": bánh quy mặn, gừng, chanh, nước lọc',
          },
        ],
      },
      {
        title: 'Nhà mình',
        items: [
          {
            id: 't1-tell',
            text: 'Thống nhất lúc nào báo tin cho gia đình, công ty',
          },
          {
            id: 't1-insurance',
            text: 'Kiểm tra BHYT / bảo hiểm thai sản, nơi đăng ký khám',
          },
          {
            id: 't1-journal',
            text: 'Chụp ảnh bụng đầu tiên, viết ghi chú đầu tiên trong Nhật ký',
          },
        ],
      },
    ],
  },
  {
    id: 't2',
    title: 'Tam cá nguyệt 2',
    emoji: '🌼',
    intro:
      'Tuần 14–27: giai đoạn khỏe nhất — tranh thủ khám đủ mốc và chuẩn bị dần.',
    groups: [
      {
        title: 'Sức khỏe',
        items: [
          {
            id: 't2-anatomy',
            text: 'Siêu âm hình thái học (tuần 18–22) — bố đi cùng',
          },
          {
            id: 't2-triple',
            text: 'Triple test tuần 15–18 nếu lỡ sàng lọc tam cá nguyệt 1',
          },
          { id: 't2-tetanus1', text: 'Tiêm uốn ván mũi 1 (từ tuần 20)' },
          {
            id: 't2-ogtt',
            text: 'Tầm soát tiểu đường thai kỳ OGTT (tuần 24–28)',
          },
          {
            id: 't2-iron',
            text: 'Kiểm tra sắt / thiếu máu, bổ sung theo kết quả',
          },
          { id: 't2-kick', text: 'Ghi lại ngày cảm nhận thai máy đầu tiên' },
        ],
      },
      {
        title: 'Sinh hoạt',
        items: [
          {
            id: 't2-exercise',
            text: 'Vận động đều: đi bộ / bơi / yoga bầu 20–30 phút hầu hết các ngày',
          },
          { id: 't2-side-sleep', text: 'Tập ngủ nghiêng trái với gối ôm' },
          { id: 't2-skin', text: 'Dưỡng ẩm da bụng, chống nắng mỗi ngày' },
          { id: 't2-bra', text: 'Mua áo ngực, quần bầu thoải mái' },
          { id: 't2-shoes', text: 'Đổi giày đế thấp, rộng hơn nửa số' },
        ],
      },
      {
        title: 'Chuẩn bị',
        items: [
          {
            id: 't2-hospital',
            text: 'Chọn bệnh viện / bác sĩ sinh, tìm hiểu gói sinh',
          },
          { id: 't2-class', text: 'Đăng ký lớp tiền sản' },
          {
            id: 't2-shopping-list',
            text: 'Lập danh sách đồ sơ sinh, bắt đầu mua dần',
          },
          {
            id: 't2-leave',
            text: 'Tìm hiểu chế độ thai sản (mẹ) và nghỉ phép (bố) ở chỗ làm',
          },
          { id: 't2-name', text: 'Nghĩ tên gọi ở nhà cho bé' },
        ],
      },
    ],
  },
  {
    id: 't3',
    title: 'Tam cá nguyệt 3',
    emoji: '🎈',
    intro: 'Tuần 28–42: theo dõi sát, chuẩn bị sinh và tuần đầu có bé.',
    groups: [
      {
        title: 'Sức khỏe',
        items: [
          {
            id: 't3-kick-count',
            text: 'Đếm cử động thai mỗi ngày (10 lần / 2 giờ)',
          },
          {
            id: 't3-tetanus2',
            text: 'Tiêm uốn ván mũi 2 (cách mũi 1 ≥ 1 tháng, trước sinh ≥ 1 tháng)',
          },
          {
            id: 't3-tdap',
            text: 'Hỏi tiêm ho gà (Tdap) tuần 27–36, cúm nếu đang mùa',
          },
          {
            id: 't3-growth',
            text: 'Siêu âm tăng trưởng + ngôi thai (tuần 30–32)',
          },
          { id: 't3-gbs', text: 'Xét nghiệm GBS (tuần 35–37)' },
          { id: 't3-weekly', text: 'Khám hàng tuần từ tuần 36' },
          {
            id: 't3-signs',
            text: 'Thuộc dấu hiệu chuyển dạ thật (5-1-1, vỡ ối, ra máu) và dấu hiệu tiền sản giật',
          },
        ],
      },
      {
        title: 'Chuẩn bị sinh',
        items: [
          {
            id: 't3-plan',
            text: 'Bàn kế hoạch sinh với bác sĩ: sinh thường/mổ, giảm đau, da kề da, kẹp rốn muộn',
          },
          {
            id: 't3-bag',
            text: 'Soạn xong giỏ đồ đi sinh trước tuần 36 (xem checklist riêng)',
          },
          {
            id: 't3-papers',
            text: 'Gom giấy tờ: CCCD, thẻ BHYT, sổ khám thai, kết quả xét nghiệm',
          },
          {
            id: 't3-route',
            text: 'Thử đường đến bệnh viện, lưu số taxi/grab, người đưa đi dự phòng',
          },
          {
            id: 't3-contacts',
            text: 'Danh sách liên lạc khi chuyển dạ, ai trông nhà / thú cưng',
          },
          {
            id: 't3-leave-date',
            text: 'Chốt ngày nghỉ thai sản của mẹ, lịch nghỉ của bố',
          },
        ],
      },
      {
        title: 'Nhà cửa',
        items: [
          {
            id: 't3-nursery',
            text: 'Sắp góc ngủ cho bé (nôi/cũi, nệm phẳng, không gối)',
          },
          {
            id: 't3-wash',
            text: 'Giặt, phơi quần áo, khăn sơ sinh bằng xà phòng dịu nhẹ',
          },
          { id: 't3-car-seat', text: 'Lắp ghế ô tô cho bé (nếu có xe)' },
          {
            id: 't3-freeze',
            text: 'Nấu và cấp đông vài bữa cho tuần đầu sau sinh',
          },
          {
            id: 't3-help',
            text: 'Sắp xếp người hỗ trợ tuần đầu (ông bà, người giúp việc theo giờ)',
          },
        ],
      },
    ],
  },
  {
    id: 'hospital-bag',
    title: 'Giỏ đồ đi sinh',
    emoji: '🧳',
    intro:
      'Soạn xong trước tuần 36, để chỗ dễ lấy; bố biết chỗ để và biết gì trong đó.',
    groups: [
      {
        title: 'Giấy tờ',
        items: [
          { id: 'bag-id', text: 'CCCD của mẹ (và bố), thẻ BHYT' },
          {
            id: 'bag-records',
            text: 'Sổ khám thai, kết quả xét nghiệm, siêu âm gần nhất',
          },
          {
            id: 'bag-insurance',
            text: 'Thẻ bảo hiểm tư nhân / thông tin gói sinh (nếu có)',
          },
          {
            id: 'bag-cash',
            text: 'Tiền mặt + thẻ, số điện thoại bệnh viện, người thân',
          },
        ],
      },
      {
        title: 'Cho mẹ',
        items: [
          {
            id: 'bag-mom-clothes',
            text: '2–3 bộ quần áo rộng cài nút trước (cho bú), áo khoác mỏng',
          },
          {
            id: 'bag-mom-underwear',
            text: 'Quần lót dùng một lần, băng vệ sinh sau sinh (loại dài, thấm hút tốt)',
          },
          { id: 'bag-mom-bra', text: 'Áo ngực cho bú + miếng lót thấm sữa' },
          {
            id: 'bag-mom-toiletries',
            text: 'Đồ vệ sinh cá nhân, son dưỡng, dây buộc tóc',
          },
          { id: 'bag-mom-slippers', text: 'Dép đi trong viện, tất ấm' },
          {
            id: 'bag-mom-snacks',
            text: 'Đồ ăn nhẹ, bình nước có ống hút, sữa',
          },
          { id: 'bag-mom-phone', text: 'Điện thoại, sạc dây dài, tai nghe' },
          {
            id: 'bag-mom-home-outfit',
            text: 'Bộ đồ mặc về nhà (vẫn cỡ như lúc 6 tháng bầu)',
          },
        ],
      },
      {
        title: 'Cho bé',
        items: [
          {
            id: 'bag-baby-clothes',
            text: '3–5 bộ body/áo sơ sinh, mũ, bao tay, bao chân',
          },
          { id: 'bag-baby-swaddle', text: 'Khăn quấn, chăn mỏng' },
          {
            id: 'bag-baby-diapers',
            text: 'Tã sơ sinh (1 gói nhỏ), khăn ướt không mùi, khăn sữa',
          },
          {
            id: 'bag-baby-home-outfit',
            text: 'Bộ đồ về nhà + ghế ô tô nếu đi xe',
          },
          {
            id: 'bag-baby-bottle',
            text: 'Bình sữa nhỏ + sữa công thức dự phòng (hỏi bệnh viện có cung cấp không)',
          },
        ],
      },
      {
        title: 'Cho bố',
        items: [
          { id: 'bag-dad-clothes', text: 'Quần áo thay 1–2 bộ, đồ vệ sinh' },
          { id: 'bag-dad-snacks', text: 'Đồ ăn, nước, sạc dự phòng' },
          {
            id: 'bag-dad-camera',
            text: 'Máy ảnh / điện thoại trống bộ nhớ để chụp khoảnh khắc đầu',
          },
          { id: 'bag-dad-pillow', text: 'Gối, chăn mỏng cho đêm trực' },
        ],
      },
    ],
  },
  {
    id: 'newborn-shopping',
    title: 'Đồ sơ sinh cần sắm',
    emoji: '🍼',
    intro:
      'Mua vừa đủ cho 0–3 tháng; bé lớn rất nhanh. Ưu tiên an toàn hơn đẹp.',
    groups: [
      {
        title: 'Quần áo',
        items: [
          {
            id: 'nb-bodysuits',
            text: '6–8 body / áo sơ sinh cài lệch (size 0–3 tháng)',
          },
          { id: 'nb-sleepsuits', text: '4–6 bộ liền thân có bàn chân' },
          { id: 'nb-hats', text: 'Mũ, bao tay, tất (vài đôi)' },
          { id: 'nb-swaddles', text: '3–4 khăn quấn / nhộng chũn' },
          { id: 'nb-bibs', text: 'Yếm, khăn sữa (10–20 cái)' },
        ],
      },
      {
        title: 'Ngủ',
        items: [
          {
            id: 'nb-crib',
            text: 'Nôi/cũi đạt chuẩn, nệm phẳng vừa khít',
            note: 'Không gối, không chăn dày, không thú bông trong cũi.',
          },
          { id: 'nb-sheets', text: '2–3 ga trải cũi' },
          { id: 'nb-sleepsack', text: 'Túi ngủ sơ sinh (thay chăn)' },
          { id: 'nb-night-light', text: 'Đèn ngủ ánh sáng ấm, dịu' },
        ],
      },
      {
        title: 'Tắm & vệ sinh',
        items: [
          { id: 'nb-tub', text: 'Chậu tắm + lưới/ghế đỡ' },
          { id: 'nb-towels', text: '2–3 khăn tắm có mũ' },
          {
            id: 'nb-wash',
            text: 'Sữa tắm gội sơ sinh không mùi, pH trung tính',
          },
          { id: 'nb-diapers', text: 'Tã sơ sinh (2 gói) + size S (1 gói)' },
          { id: 'nb-wipes', text: 'Khăn ướt không mùi / bông + nước ấm' },
          { id: 'nb-cream', text: 'Kem chống hăm' },
          {
            id: 'nb-cord-care',
            text: 'Gạc rốn, cồn 70° hoặc theo hướng dẫn bệnh viện',
          },
          { id: 'nb-nail', text: 'Bấm/dũa móng tay sơ sinh' },
          { id: 'nb-nasal', text: 'Nước muối sinh lý, dụng cụ hút mũi' },
        ],
      },
      {
        title: 'Bú',
        items: [
          { id: 'nb-nursing-pillow', text: 'Gối cho bú' },
          { id: 'nb-pump', text: 'Máy hút sữa + túi trữ sữa (nếu định hút)' },
          { id: 'nb-bottles', text: '2–3 bình sữa cổ rộng, núm size 0' },
          {
            id: 'nb-sterilizer',
            text: 'Nồi/máy tiệt trùng hoặc nồi luộc riêng',
          },
          { id: 'nb-formula', text: 'Một hộp sữa công thức dự phòng' },
        ],
      },
      {
        title: 'Đi lại & sức khỏe',
        items: [
          { id: 'nb-car-seat', text: 'Ghế ô tô sơ sinh (nếu có xe)' },
          { id: 'nb-carrier', text: 'Địu sơ sinh hoặc xe đẩy nằm được' },
          { id: 'nb-thermometer', text: 'Nhiệt kế điện tử' },
          {
            id: 'nb-first-aid',
            text: 'Hạ sốt theo cân nặng (hỏi bác sĩ), vitamin D3 giọt',
          },
          { id: 'nb-diaper-bag', text: 'Túi đựng đồ bé khi ra ngoài' },
        ],
      },
    ],
  },
  {
    id: 'postpartum-week1',
    title: 'Tuần đầu sau sinh',
    emoji: '🏡',
    intro:
      'Bảy ngày đầu: ưu tiên bé bú đủ, mẹ nghỉ đủ, và biết khi nào cần gọi bác sĩ.',
    groups: [
      {
        title: 'Cho bé',
        items: [
          {
            id: 'pp-feeds',
            text: 'Bú 8–12 lần/ngày, không để bé ngủ quá 3–4 tiếng không bú',
          },
          {
            id: 'pp-diapers',
            text: 'Theo dõi tã: từ ngày 5 có ≥ 6 tã ướt/ngày',
          },
          {
            id: 'pp-jaundice',
            text: 'Quan sát vàng da mỗi ngày dưới ánh sáng tự nhiên',
          },
          { id: 'pp-cord', text: 'Giữ rốn khô, sạch tới khi rụng (7–14 ngày)' },
          {
            id: 'pp-sleep-safe',
            text: 'Bé luôn nằm ngửa khi ngủ, mặt phẳng, không gối',
          },
          {
            id: 'pp-checkup',
            text: 'Khám sơ sinh / tái khám theo hẹn bệnh viện (thường ngày 3–7)',
          },
          {
            id: 'pp-vaccines',
            text: 'Xác nhận bé đã tiêm viêm gan B (24 giờ đầu) và BCG',
          },
          {
            id: 'pp-screening',
            text: 'Lấy máu gót chân sàng lọc sơ sinh (48–72 giờ)',
          },
        ],
      },
      {
        title: 'Cho mẹ',
        items: [
          {
            id: 'pp-rest',
            text: 'Ngủ khi bé ngủ; giao việc nhà cho bố và người thân',
          },
          {
            id: 'pp-lochia',
            text: 'Theo dõi sản dịch: đỏ → hồng → vàng nhạt, không hôi',
          },
          {
            id: 'pp-wound',
            text: 'Chăm vết khâu / vết mổ theo hướng dẫn, giữ khô',
          },
          {
            id: 'pp-eat-drink',
            text: 'Ăn đủ bữa, uống 2–3 lít nước/ngày (nhất là khi cho bú)',
          },
          {
            id: 'pp-mood',
            text: 'Để ý tâm trạng: buồn thoáng qua là bình thường, kéo dài quá 2 tuần cần hỗ trợ',
          },
          {
            id: 'pp-postpartum-visit',
            text: 'Đặt lịch tái khám sau sinh (tuần 1–2 và tuần 6)',
          },
        ],
      },
      {
        title: 'Giấy tờ',
        items: [
          { id: 'pp-birth-cert', text: 'Lấy giấy chứng sinh ở bệnh viện' },
          {
            id: 'pp-registration',
            text: 'Đăng ký khai sinh + BHYT + hộ khẩu cho bé (trong 60 ngày)',
          },
          { id: 'pp-maternity-claim', text: 'Nộp hồ sơ hưởng chế độ thai sản' },
        ],
      },
    ],
  },
];

export function checklistById(id: string): Checklist | undefined {
  return CHECKLISTS.find((list) => list.id === id);
}

/** Tổng số mục mẫu của một list (không tính mục tự do). */
export function templateItemCount(list: Checklist): number {
  return list.groups.reduce((sum, group) => sum + group.items.length, 0);
}

/** Tập id mục mẫu của list — để đếm tiến độ bỏ qua id lạ (mục đã gỡ). */
export function templateItemIds(list: Checklist): Set<string> {
  return new Set(list.groups.flatMap((group) => group.items.map((i) => i.id)));
}

/**
 * Dữ liệu cẩm nang dinh dưỡng (spec 009, AC-10): thực phẩm theo ba nhóm kèm
 * LÝ DO, vi chất, cấu trúc bữa ăn theo tam cá nguyệt, tăng cân theo BMI.
 * Nguồn: Hướng dẫn quốc gia CSSKSS (Bộ Y tế), NHS "Foods to avoid",
 * ACOG Nutrition During Pregnancy, FDA/EPA về thủy ngân trong cá, IOM 2009.
 *
 * `aliases` để ô tìm món bắt được cách gọi khác ("sashimi" → cá sống).
 * Chỉ page server import; client chỉ lọc DOM đã render.
 */
export type FoodGroup = 'eat' | 'limit' | 'avoid';

export interface Food {
  id: string;
  name: string;
  group: FoodGroup;
  reason: string;
  aliases?: string[];
}

export const FOOD_GROUPS: {
  id: FoodGroup;
  label: string;
  emoji: string;
  hint: string;
}[] = [
  {
    id: 'eat',
    label: 'Nên ăn',
    emoji: '✅',
    hint: 'Ăn đều, ưu tiên mỗi ngày.',
  },
  {
    id: 'limit',
    label: 'Hạn chế',
    emoji: '⚠️',
    hint: 'Được, nhưng ít và đúng cách.',
  },
  { id: 'avoid', label: 'Tránh', emoji: '🚫', hint: 'Bỏ hẳn trong thai kỳ.' },
];

export const FOODS: readonly Food[] = [
  // ---- nên ăn -------------------------------------------------------------
  {
    id: 'salmon',
    name: 'Cá hồi, cá mòi, cá cơm, cá basa (nấu chín)',
    group: 'eat',
    reason: 'Giàu DHA cho não bé, ít thủy ngân; 2 bữa/tuần.',
    aliases: ['cá béo', 'cá nhỏ', 'omega 3'],
  },
  {
    id: 'lean-meat',
    name: 'Thịt nạc bò, heo, gà nấu chín kỹ',
    group: 'eat',
    reason: 'Đạm và sắt heme dễ hấp thu — phòng thiếu máu.',
    aliases: ['thịt bò', 'thịt heo', 'thịt gà'],
  },
  {
    id: 'eggs',
    name: 'Trứng chín kỹ',
    group: 'eat',
    reason: 'Choline cho não bé, đạm chất lượng cao; lòng đỏ phải chín.',
    aliases: ['trứng gà', 'trứng vịt', 'trứng luộc'],
  },
  {
    id: 'dairy',
    name: 'Sữa, sữa chua, phô mai cứng tiệt trùng',
    group: 'eat',
    reason: 'Canxi + đạm; 2–3 phần/ngày. Chọn loại ghi "tiệt trùng".',
    aliases: ['yogurt', 'phô mai', 'sữa tươi tiệt trùng'],
  },
  {
    id: 'tofu-beans',
    name: 'Đậu hũ, đậu lăng, đậu đen, đậu xanh',
    group: 'eat',
    reason: 'Đạm thực vật, folate, chất xơ, sắt.',
    aliases: ['đậu phụ', 'các loại đậu'],
  },
  {
    id: 'leafy-greens',
    name: 'Rau lá xanh đậm (cải bó xôi, cải xoăn, rau muống, mồng tơi) nấu chín',
    group: 'eat',
    reason: 'Folate, sắt, canxi, chất xơ — rửa kỹ, nấu chín.',
    aliases: ['rau xanh', 'rau cải', 'spinach'],
  },
  {
    id: 'broccoli',
    name: 'Bông cải xanh, súp lơ, bắp cải',
    group: 'eat',
    reason: 'Vitamin C, K, folate, chất xơ chống táo bón.',
    aliases: ['súp lơ xanh'],
  },
  {
    id: 'sweet-potato',
    name: 'Khoai lang, bí đỏ, cà rốt',
    group: 'eat',
    reason: 'Beta-carotene (tiền vitamin A an toàn), chất xơ, no lâu.',
    aliases: ['bí ngô'],
  },
  {
    id: 'citrus',
    name: 'Cam, quýt, bưởi, ổi, kiwi, dâu',
    group: 'eat',
    reason: 'Vitamin C giúp hấp thu sắt từ thực vật; ổi rất giàu C.',
    aliases: ['trái cây', 'hoa quả'],
  },
  {
    id: 'banana',
    name: 'Chuối',
    group: 'eat',
    reason: 'Kali giảm chuột rút, vitamin B6 giảm nghén, dễ tiêu.',
  },
  {
    id: 'avocado',
    name: 'Bơ',
    group: 'eat',
    reason: 'Chất béo tốt, folate, kali; làm bữa phụ no lâu.',
  },
  {
    id: 'ripe-papaya',
    name: 'Đu đủ chín',
    group: 'eat',
    reason: 'Vitamin A, C, chất xơ. Khác hẳn đu đủ xanh (xem mục Tránh).',
  },
  {
    id: 'nuts',
    name: 'Óc chó, hạnh nhân, hạt điều, hạt chia, mè',
    group: 'eat',
    reason: 'Omega-3 thực vật, magie, đạm; một nắm nhỏ/ngày.',
    aliases: ['các loại hạt'],
  },
  {
    id: 'whole-grains',
    name: 'Gạo lứt, yến mạch, bánh mì nguyên cám, khoai',
    group: 'eat',
    reason: 'Tinh bột chậm, chất xơ, vitamin B — ổn định đường huyết.',
    aliases: ['ngũ cốc nguyên hạt', 'cơm'],
  },
  {
    id: 'shrimp',
    name: 'Tôm, cua, mực nấu chín kỹ',
    group: 'eat',
    reason: 'Đạm, kẽm, iod, ít thủy ngân — phải chín hoàn toàn.',
    aliases: ['hải sản nấu chín'],
  },
  {
    id: 'water',
    name: 'Nước lọc 2–2,5 lít/ngày',
    group: 'eat',
    reason: 'Tăng thể tích máu, nước ối; giảm táo bón và nhiễm trùng tiểu.',
    aliases: ['uống nước'],
  },
  {
    id: 'dragon-fruit',
    name: 'Thanh long, táo, lê, nho (rửa sạch)',
    group: 'eat',
    reason: 'Nước, chất xơ, vitamin; nho ăn vừa vì nhiều đường.',
  },
  {
    id: 'seaweed',
    name: 'Rong biển, muối iod',
    group: 'eat',
    reason:
      'Iod cho tuyến giáp và não bé; rong biển ăn vừa phải (không quá 1–2 lần/tuần).',
  },

  // ---- hạn chế ------------------------------------------------------------
  {
    id: 'coffee',
    name: 'Cà phê, trà đặc, nước tăng lực nhẹ',
    group: 'limit',
    reason:
      'Tối đa 200 mg caffeine/ngày (≈ 1 ly cà phê phin hoặc 2 ly trà); quá mức tăng nguy cơ nhẹ cân.',
    aliases: ['caffeine', 'cafe', 'trà sữa'],
  },
  {
    id: 'canned-tuna',
    name: 'Cá ngừ đóng hộp, cá ngừ vây vàng',
    group: 'limit',
    reason: 'Thủy ngân trung bình: tối đa 1–2 hộp (≈ 150 g)/tuần.',
    aliases: ['cá ngừ'],
  },
  {
    id: 'liver',
    name: 'Gan, pa tê gan nấu chín',
    group: 'limit',
    reason:
      'Vitamin A dạng retinol rất cao — nhiều có thể gây dị tật; tối đa 1 bữa nhỏ/tuần, tránh hẳn 3 tháng đầu.',
    aliases: ['gan heo', 'gan gà'],
  },
  {
    id: 'shellfish',
    name: 'Nghêu, sò, ốc, hến (nấu chín kỹ)',
    group: 'limit',
    reason:
      'Dễ nhiễm khuẩn/ký sinh nếu chưa chín; ăn chín kỹ, nguồn sạch, không ăn thường xuyên.',
    aliases: ['hải sản có vỏ', 'ốc'],
  },
  {
    id: 'sweets',
    name: 'Bánh kẹo, nước ngọt, trà sữa, chè',
    group: 'limit',
    reason:
      'Đường nhanh → tăng cân nhiều, nguy cơ tiểu đường thai kỳ; thỉnh thoảng một phần nhỏ.',
    aliases: ['đồ ngọt', 'nước ngọt có gas'],
  },
  {
    id: 'processed',
    name: 'Mì gói, xúc xích, đồ hộp, snack',
    group: 'limit',
    reason:
      'Nhiều muối, chất bảo quản, ít dinh dưỡng; nếu ăn thêm rau và đạm thật.',
    aliases: ['đồ ăn chế biến sẵn', 'mì tôm'],
  },
  {
    id: 'fried',
    name: 'Đồ chiên rán, nhiều dầu mỡ',
    group: 'limit',
    reason: 'Gây ợ nóng, đầy bụng, tăng cân nhanh.',
  },
  {
    id: 'coconut-water',
    name: 'Nước dừa',
    group: 'limit',
    reason:
      'Tốt (điện giải) từ tam cá nguyệt 2, 1 trái/ngày là đủ; 3 tháng đầu uống ít vì tính mát, dễ đầy bụng.',
    aliases: ['dừa'],
  },
  {
    id: 'pineapple',
    name: 'Dứa (thơm)',
    group: 'limit',
    reason:
      'Không gây sảy thai như lời đồn, nhưng nhiều bromelain + acid dễ ợ nóng, tiêu chảy; ăn chín, vài miếng.',
    aliases: ['thơm', 'khóm'],
  },
  {
    id: 'longan-lychee',
    name: 'Nhãn, vải, mít, sầu riêng',
    group: 'limit',
    reason:
      'Rất nhiều đường, dễ nóng trong, tăng đường huyết; vài quả mỗi lần.',
  },
  {
    id: 'herbs-vn',
    name: 'Rau răm, ngải cứu, rau ngót sống, tía tô liều cao',
    group: 'limit',
    reason:
      'Lượng gia vị bình thường vô hại; dùng nhiều/ép nước uống đều đặn 3 tháng đầu có liên quan co bóp tử cung.',
    aliases: ['rau thơm'],
  },
  {
    id: 'bitter-melon',
    name: 'Khổ qua (mướp đắng)',
    group: 'limit',
    reason:
      'Lượng vừa trong bữa ăn được; ăn nhiều/uống nước ép có thể hạ đường huyết, kích thích tử cung.',
    aliases: ['mướp đắng'],
  },
  {
    id: 'bamboo',
    name: 'Măng tươi',
    group: 'limit',
    reason: 'Chứa cyanide tự nhiên — phải luộc kỹ, bỏ nước; ăn ít.',
  },
  {
    id: 'ginseng',
    name: 'Nhân sâm, thuốc bắc, thảo dược không rõ',
    group: 'limit',
    reason:
      'Thiếu dữ liệu an toàn, một số làm tăng huyết áp/co bóp; chỉ dùng khi bác sĩ sản đồng ý.',
    aliases: ['thuốc nam', 'thuốc bắc', 'sâm'],
  },
  {
    id: 'fresh-juice',
    name: 'Nước ép, sinh tố bán sẵn',
    group: 'limit',
    reason:
      'Nguy cơ nhiễm khuẩn nếu chưa tiệt trùng và để lâu; tự ép uống ngay thì ổn.',
    aliases: ['nước mía', 'sinh tố'],
  },
  {
    id: 'salt',
    name: 'Muối, nước mắm, đồ muối chua',
    group: 'limit',
    reason: 'Dưới 5 g muối/ngày; ăn mặn tăng phù và huyết áp.',
    aliases: ['dưa muối', 'cà muối', 'kim chi'],
  },

  // ---- tránh --------------------------------------------------------------
  {
    id: 'alcohol',
    name: 'Rượu, bia, cocktail (mọi lượng)',
    group: 'avoid',
    reason:
      'Không có ngưỡng an toàn; gây hội chứng rượu bào thai, ảnh hưởng não bé vĩnh viễn.',
    aliases: ['cồn', 'đồ uống có cồn'],
  },
  {
    id: 'high-mercury',
    name: 'Cá kiếm, cá mập, cá thu vua, cá ngừ mắt to, cá kình',
    group: 'avoid',
    reason: 'Thủy ngân cao, tích lũy làm hại hệ thần kinh bé.',
    aliases: ['cá lớn', 'thủy ngân', 'cá thu'],
  },
  {
    id: 'raw-seafood',
    name: 'Sushi, sashimi, gỏi cá, hàu sống, tôm sống',
    group: 'avoid',
    reason:
      'Vi khuẩn Listeria, Vibrio, ký sinh trùng — mẹ bầu dễ nhiễm và bệnh nặng hơn.',
    aliases: ['cá sống', 'hải sản sống', 'đồ sống'],
  },
  {
    id: 'raw-meat',
    name: 'Thịt tái, bò tái, nem chua, tiết canh, thịt chua',
    group: 'avoid',
    reason:
      'Toxoplasma, Listeria, Salmonella, liên cầu lợn — có thể gây sảy thai, dị tật.',
    aliases: ['thịt sống', 'bò tái', 'tiết canh', 'phở tái'],
  },
  {
    id: 'raw-eggs',
    name: 'Trứng sống, lòng đào, sốt mayonnaise tự làm, tiramisu, trứng chần',
    group: 'avoid',
    reason:
      'Salmonella; trứng phải chín cả lòng đỏ. Mayonnaise công nghiệp đã tiệt trùng thì được.',
    aliases: ['trứng lòng đào', 'ốp la lòng đào', 'kem trứng'],
  },
  {
    id: 'soft-cheese',
    name: 'Phô mai mềm chưa tiệt trùng (brie, camembert, feta, blue cheese)',
    group: 'avoid',
    reason:
      'Listeria — nhiễm khi mang thai có thể gây sảy thai, thai lưu. Loại ghi "tiệt trùng" hoặc nấu chín thì được.',
    aliases: ['phô mai mềm', 'phô mai xanh'],
  },
  {
    id: 'raw-milk',
    name: 'Sữa tươi chưa tiệt trùng, sữa bò/dê vắt trực tiếp',
    group: 'avoid',
    reason: 'Listeria, E. coli, Brucella.',
    aliases: ['sữa bò tươi', 'sữa dê'],
  },
  {
    id: 'deli-meat',
    name: 'Thịt nguội, pa tê lạnh, xúc xích chưa hâm nóng',
    group: 'avoid',
    reason: 'Listeria sống được trong tủ lạnh; hâm nóng bốc hơi mới an toàn.',
    aliases: ['jambon', 'giò chả để lạnh'],
  },
  {
    id: 'sprouts',
    name: 'Rau mầm sống (giá đỗ sống, mầm cải)',
    group: 'avoid',
    reason:
      'Hạt nảy mầm trong môi trường ấm ẩm dễ nhiễm E. coli, Salmonella; xào chín thì ổn.',
    aliases: ['giá sống'],
  },
  {
    id: 'green-papaya',
    name: 'Đu đủ xanh, đu đủ ương',
    group: 'avoid',
    reason:
      'Nhựa (latex) và papain gây co bóp tử cung, nhất là 3 tháng đầu. Đu đủ chín hẳn thì tốt.',
    aliases: ['gỏi đu đủ', 'nộm đu đủ'],
  },
  {
    id: 'tobacco',
    name: 'Thuốc lá, thuốc lá điện tử, khói thuốc thụ động',
    group: 'avoid',
    reason: 'Nhẹ cân, sinh non, nhau bong non; bố hút thì ra ngoài và thay áo.',
    aliases: ['hút thuốc', 'vape'],
  },
  {
    id: 'energy-drinks',
    name: 'Nước tăng lực, thực phẩm chức năng giảm cân',
    group: 'avoid',
    reason: 'Caffeine + chất kích thích liều cao, không kiểm soát được.',
    aliases: ['red bull', 'sting'],
  },
  {
    id: 'leftovers',
    name: 'Thức ăn để ngoài quá 2 giờ, cơm nguội để qua đêm không hâm',
    group: 'avoid',
    reason: 'Vi khuẩn sinh độc tố; hâm nóng kỹ hoặc bỏ.',
    aliases: ['đồ ăn thừa'],
  },
  {
    id: 'sprouted-potato',
    name: 'Khoai tây mọc mầm hoặc vỏ xanh',
    group: 'avoid',
    reason: 'Solanine gây ngộ độc.',
  },
  {
    id: 'unknown-supplements',
    name: 'Thuốc, vitamin liều cao tự mua (nhất là vitamin A, E liều cao)',
    group: 'avoid',
    reason: 'Quá liều vitamin A gây dị tật; chỉ dùng vitamin bầu theo bác sĩ.',
    aliases: ['vitamin a', 'thực phẩm chức năng'],
  },
];

export interface Micronutrient {
  id: string;
  name: string;
  dose: string;
  when: string;
  why: string;
  sources: string;
}

export const MICRONUTRIENTS: readonly Micronutrient[] = [
  {
    id: 'folate',
    name: 'Acid folic (B9)',
    dose: '400 mcg/ngày (bác sĩ có thể kê 4–5 mg nếu nguy cơ cao)',
    when: 'Trước thụ thai 1–3 tháng → hết tuần 12; vitamin bầu thường duy trì cả thai kỳ.',
    why: 'Phòng dị tật ống thần kinh (nứt đốt sống, vô sọ) — ống thần kinh khép lại ở tuần 5–6.',
    sources: 'Rau lá xanh đậm, đậu, cam, bơ, ngũ cốc bổ sung.',
  },
  {
    id: 'iron',
    name: 'Sắt',
    dose: '30–60 mg sắt nguyên tố/ngày theo chỉ định (Bộ Y tế: 60 mg + 400 mcg folic suốt thai kỳ tới sau sinh 1 tháng)',
    when: 'Cả thai kỳ, nhất là từ tam cá nguyệt 2.',
    why: 'Thể tích máu tăng 50%; thiếu máu gây mệt, sinh non, nhẹ cân.',
    sources:
      'Thịt đỏ, gan (ít), đậu, rau xanh; uống cùng vitamin C, cách canxi/sữa/trà 2 giờ.',
  },
  {
    id: 'calcium',
    name: 'Canxi',
    dose: '1.000–1.200 mg/ngày',
    when: 'Cả thai kỳ, tăng rõ từ tuần 20.',
    why: 'Xương răng của bé; thiếu thì bé "rút" từ xương mẹ → chuột rút, loãng xương sau này.',
    sources:
      '2–3 phần sữa/sữa chua/phô mai, cá nhỏ ăn xương, đậu hũ, rau xanh; viên bổ sung chia nhỏ ≤ 500 mg/lần.',
  },
  {
    id: 'dha',
    name: 'DHA (omega-3)',
    dose: '200–300 mg DHA/ngày',
    when: 'Cả thai kỳ, quan trọng nhất tam cá nguyệt 3 (não bé lớn nhanh).',
    why: 'Phát triển não và võng mạc; có thể giảm nguy cơ sinh non.',
    sources:
      'Cá béo ít thủy ngân 2 bữa/tuần, hạt óc chó, chia; hoặc viên dầu cá/tảo.',
  },
  {
    id: 'iodine',
    name: 'Iod',
    dose: '220 mcg/ngày (250 mcg theo WHO)',
    when: 'Cả thai kỳ và cho con bú.',
    why: 'Hormone tuyến giáp của mẹ và bé — thiếu ảnh hưởng trí tuệ bé.',
    sources: 'Muối iod, hải sản, trứng, sữa; vitamin bầu có iod.',
  },
  {
    id: 'vitd',
    name: 'Vitamin D',
    dose: '600 IU (15 mcg)/ngày; nhiều bác sĩ kê 1.000–2.000 IU',
    when: 'Cả thai kỳ.',
    why: 'Hấp thu canxi, miễn dịch; thiếu liên quan tiền sản giật, tiểu đường thai kỳ.',
    sources: 'Nắng sáng 10–15 phút, trứng, cá béo, sữa bổ sung.',
  },
  {
    id: 'choline',
    name: 'Choline',
    dose: '450 mg/ngày',
    when: 'Cả thai kỳ.',
    why: 'Phát triển não và tủy sống, ít có trong vitamin bầu.',
    sources: '2 quả trứng chín ≈ 300 mg; thịt, đậu nành, bông cải.',
  },
];

export interface MealPlan {
  trimester: 1 | 2 | 3;
  title: string;
  energy: string;
  points: string[];
  sample: string[];
}

export const MEAL_PLANS: readonly MealPlan[] = [
  {
    trimester: 1,
    title: 'Tam cá nguyệt 1 — ăn được là tốt rồi',
    energy: 'Chưa cần thêm năng lượng; ưu tiên đủ chất và giữ được bữa.',
    points: [
      'Chia 5–6 bữa nhỏ; không để bụng đói quá 3 tiếng (đói làm nghén nặng hơn).',
      'Mỗi bữa có một nguồn đạm (trứng, đậu hũ, thịt nạc, sữa chua).',
      'Đồ nguội, nhạt, khô (bánh mì, cơm nắm, trái cây lạnh) thường dễ vào hơn đồ nóng nhiều mùi.',
      'Uống nước từng ngụm cả ngày; nước gừng, chanh ấm giúp giảm buồn nôn.',
      'Acid folic + iod là ưu tiên số một; sắt có thể hoãn tới khi đỡ nghén nếu gây nôn.',
    ],
    sample: [
      'Sáng: cháo yến mạch sữa + chuối, hoặc bánh mì trứng.',
      'Phụ: sữa chua + hạt; vài cái bánh quy mặn.',
      'Trưa: cơm + cá kho + rau luộc + canh.',
      'Phụ: trái cây (ổi, cam) + một nắm hạt.',
      'Tối: bún/phở nhà nấu, nhiều rau, thịt chín kỹ.',
      'Trước ngủ: ly sữa ấm hoặc sữa đậu nành.',
    ],
  },
  {
    trimester: 2,
    title: 'Tam cá nguyệt 2 — xây nền cho bé lớn',
    energy:
      'Thêm khoảng 300–350 kcal/ngày ≈ một bữa phụ đàng hoàng (không phải "ăn cho hai người").',
    points: [
      'Đĩa ăn: ½ rau củ + trái cây, ¼ đạm, ¼ tinh bột nguyên cám.',
      'Canxi 2–3 phần sữa/ngày; sắt từ thịt đỏ 3–4 bữa/tuần kèm rau giàu vitamin C.',
      'Cá béo ít thủy ngân 2 bữa/tuần cho DHA.',
      'Chất xơ 25–30 g/ngày + 2–2,5 lít nước để chống táo bón.',
      'Theo dõi cân: tăng 0,4–0,5 kg/tuần là hợp lý với BMI bình thường.',
    ],
    sample: [
      'Sáng: phở bò nhiều rau, hoặc bánh mì nguyên cám + trứng + bơ.',
      'Phụ: sữa + 1 quả chuối.',
      'Trưa: cơm gạo lứt + thịt/cá + 2 món rau + canh.',
      'Phụ: sữa chua + trái cây + hạt óc chó.',
      'Tối: cơm + đậu hũ sốt + rau xào + canh cua/ngao chín kỹ.',
      'Trước ngủ: sữa hoặc ngũ cốc.',
    ],
  },
  {
    trimester: 3,
    title: 'Tam cá nguyệt 3 — bé tăng cân, mẹ giữ sức',
    energy:
      'Thêm khoảng 450 kcal/ngày; đạm 75–100 g/ngày (bé tăng ~200 g mỗi tuần).',
    points: [
      'Bụng chật → 5–6 bữa nhỏ, ăn chậm; tránh nằm ngay sau ăn để đỡ ợ nóng.',
      'Đủ canxi, sắt, DHA; thêm thực phẩm giàu kali (chuối, khoai) giảm chuột rút.',
      'Ít muối, ít đường nếu có phù, huyết áp cao hoặc tiểu đường thai kỳ.',
      'Chà là (3–6 quả/ngày từ tuần 36) có vài nghiên cứu nhỏ cho thấy giúp cổ tử cung thuận lợi — không bắt buộc.',
      'Chuẩn bị bữa ăn cấp đông cho tuần đầu sau sinh.',
    ],
    sample: [
      'Sáng: cháo cá/yến mạch + trứng.',
      'Phụ: sữa + hạt; hoặc sinh tố bơ tự làm.',
      'Trưa: cơm + thịt bò xào rau + canh + trái cây.',
      'Phụ: sữa chua + chà là/trái cây.',
      'Tối (sớm, nhẹ): cháo/súp đạm + rau.',
      'Trước ngủ 1–2 giờ: sữa ấm.',
    ],
  },
];

export interface WeightGainRow {
  bmi: string;
  label: string;
  total: string;
  perWeek: string;
}

/** IOM 2009 cho đơn thai; tam cá nguyệt 1 tăng 0,5–2 kg tổng. */
export const WEIGHT_GAIN: readonly WeightGainRow[] = [
  {
    bmi: 'Dưới 18,5',
    label: 'Gầy',
    total: '12,5–18 kg',
    perWeek: '~0,5 kg/tuần (từ T2)',
  },
  {
    bmi: '18,5–24,9',
    label: 'Bình thường',
    total: '11,5–16 kg',
    perWeek: '~0,4 kg/tuần',
  },
  {
    bmi: '25–29,9',
    label: 'Thừa cân',
    total: '7–11,5 kg',
    perWeek: '~0,3 kg/tuần',
  },
  {
    bmi: '30 trở lên',
    label: 'Béo phì',
    total: '5–9 kg',
    perWeek: '~0,2 kg/tuần',
  },
];

/**
 * Chuỗi tìm kiếm: bỏ dấu + thường hóa để "ca song" bắt được "cá sống".
 * Export để page dựng sẵn `data-search` lúc build, client chỉ so chuỗi.
 */
export function searchKey(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase();
}

export function foodSearchKey(food: Food): string {
  return searchKey([food.name, ...(food.aliases ?? [])].join(' | '));
}

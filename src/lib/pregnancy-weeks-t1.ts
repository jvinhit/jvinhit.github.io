/**
 * Nội dung tuần 1–13 (tam cá nguyệt 1) cho khu /be-yeu-dotro/ (spec 009).
 * Tổng hợp từ NHS week-by-week, ACOG, WHO và Hướng dẫn quốc gia CSSKSS —
 * giọng ấm, xưng mẹ/bố/bé, mỗi khối 2–5 gạch đầu dòng. Type ở
 * `pregnancy-weeks.ts`. Dấu hiệu nguy hiểm viết cụ thể, kèm hành động.
 */
import type { WeekGuide } from '~/lib/pregnancy-weeks';

export const WEEK_GUIDES_T1: readonly WeekGuide[] = [
  {
    week: 1,
    title: 'Điểm xuất phát: ngày đầu kỳ kinh cuối',
    note: 'Tuổi thai được tính từ ngày đầu kỳ kinh cuối, nên tuần 1 và 2 là lúc bé chưa thực sự tồn tại — đây là quy ước y khoa để mọi mốc khám thống nhất.',
    baby: [
      'Chưa có bé: tuần này mẹ đang có kinh, niêm mạc tử cung cũ bong ra để chuẩn bị lớp mới.',
      'Trong buồng trứng, một nhóm nang noãn bắt đầu "chạy đua" để chọn ra trứng của tháng này.',
    ],
    mom: [
      'Cơ thể như mọi kỳ kinh bình thường: có thể đau bụng dưới, mỏi lưng, mệt nhẹ.',
      'Nếu đang canh thai, đây là ngày 1 để đếm chu kỳ.',
    ],
    todo: [
      'Bắt đầu (hoặc duy trì) uống acid folic 400 mcg mỗi ngày — lý tưởng là trước khi thụ thai ít nhất 1 tháng.',
      'Bỏ rượu, thuốc lá, hạn chế cà phê dưới 200 mg caffeine/ngày (khoảng 1 ly).',
      'Ghi lại ngày đầu kỳ kinh — bác sĩ sẽ hỏi câu này đầu tiên.',
    ],
    warning: [
      'Kinh ra rất nhiều (thấm ướt băng mỗi giờ liên tục) hoặc đau dữ dội khác hẳn mọi lần.',
    ],
  },
  {
    week: 2,
    title: 'Tuần rụng trứng',
    note: 'Thụ thai thường diễn ra cuối tuần này hoặc đầu tuần 3 — nên khi que thử lên hai vạch, mẹ đã "4 tuần" dù bé mới được 2 tuần tuổi.',
    baby: [
      'Trứng trưởng thành được phóng ra khỏi buồng trứng (rụng trứng), sống khoảng 12–24 giờ chờ tinh trùng.',
      'Tinh trùng có thể sống 3–5 ngày trong cơ thể mẹ, nên "cửa sổ thụ thai" kéo dài khoảng 6 ngày.',
    ],
    mom: [
      'Dịch âm đạo trong, dai như lòng trắng trứng — dấu hiệu sắp rụng trứng.',
      'Một số mẹ thấy nhói nhẹ một bên bụng dưới hoặc tăng ham muốn.',
    ],
    todo: [
      'Nếu đang canh thai: quan hệ cách ngày trong cửa sổ này là đủ, không cần căng thẳng tính giờ.',
      'Tiếp tục acid folic; ăn uống đủ sắt, rau xanh.',
      'Nếu đang dùng thuốc dài ngày (huyết áp, tuyến giáp, trứng cá…), hỏi bác sĩ thuốc nào an toàn khi có thai.',
    ],
    warning: [
      'Đau một bên bụng dưới dữ dội kèm choáng — có thể là nang buồng trứng xoắn, cần khám ngay.',
    ],
  },
  {
    week: 3,
    title: 'Thụ tinh và hành trình về tử cung',
    baby: [
      'Trứng và tinh trùng gặp nhau ở vòi trứng tạo thành hợp tử — giới tính và bộ gen của bé đã được quyết định từ khoảnh khắc này.',
      'Hợp tử vừa chia tế bào vừa trôi về tử cung trong 5–6 ngày, thành phôi nang rồi bắt đầu làm tổ.',
    ],
    mom: [
      'Hầu như chưa có cảm giác gì khác thường.',
      'Cuối tuần có thể ra vài giọt máu hồng nhạt (máu báo làm tổ) — không phải ai cũng có.',
    ],
    todo: [
      'Sinh hoạt bình thường, đừng ăn gấp đôi; cơ thể chỉ cần thêm chất chứ chưa cần thêm nhiều calo.',
      'Tránh xông hơi, tắm nước quá nóng, hạn chế thuốc không kê đơn.',
    ],
    warning: [
      'Ra máu nhiều như hành kinh kèm đau quặn — khám để loại trừ thai ngoài tử cung hoặc sảy sớm.',
    ],
  },
  {
    week: 4,
    title: 'Hai vạch!',
    baby: [
      'Phôi đã bám chắc vào niêm mạc tử cung và bắt đầu tiết hCG — hormone làm que thử lên vạch.',
      'Bé lúc này nhỏ như hạt mè, gồm hai lớp tế bào sẽ thành mọi cơ quan sau này; túi ối và nhau thai sơ khai đang hình thành.',
    ],
    mom: [
      'Trễ kinh, ngực căng tức, mệt mỏi, đi tiểu nhiều hơn, nhạy mùi.',
      'Que thử buổi sáng cho kết quả rõ nhất; vạch mờ vẫn là dương tính.',
    ],
    todo: [
      'Thử que vào sáng sớm; dương tính thì đặt lịch khám lần đầu khoảng tuần 6–8 (sớm hơn chưa thấy tim thai dễ lo không cần thiết).',
      'Đổi sang vitamin bầu có acid folic + sắt + iod; uống đủ nước.',
      'Báo cho bố biết — hành trình này đi cùng nhau từ đầu.',
    ],
    warning: [
      'Đau bụng dưới một bên dữ dội, choáng váng, ra máu đen nâu — dấu hiệu nghi thai ngoài tử cung, đi cấp cứu ngay.',
    ],
  },
  {
    week: 5,
    title: 'Ống thần kinh hình thành',
    baby: [
      'Phôi dài khoảng 2–3 mm, hình hạt đậu; ống thần kinh (tiền thân của não và tủy sống) đang khép lại — vì vậy acid folic quan trọng nhất ở tuần này.',
      'Tim nguyên thủy bắt đầu hình thành và sẽ đập vào cuối tuần.',
    ],
    mom: [
      'Ốm nghén có thể bắt đầu: buồn nôn sáng (hoặc cả ngày), chán ăn, thèm/ghét món lạ.',
      'Mệt như hết pin, buồn ngủ sớm — progesterone tăng vọt là thủ phạm.',
    ],
    todo: [
      'Ăn ít, chia nhiều bữa; để sẵn bánh quy mặn cạnh giường, ăn vài miếng trước khi ngồi dậy.',
      'Gừng (trà gừng, kẹo gừng) và vitamin B6 giúp giảm buồn nôn — hỏi bác sĩ liều.',
      'Ngủ sớm hơn 1 tiếng, nhờ bố gánh việc nhà.',
    ],
    warning: [
      'Nôn liên tục không giữ được nước, sụt cân, tiểu ít sẫm màu — nghén nặng (hyperemesis) cần truyền dịch.',
      'Ra máu đỏ tươi kèm đau quặn từng cơn.',
    ],
  },
  {
    week: 6,
    title: 'Tim bé bắt đầu đập',
    baby: [
      'Dài khoảng 4–6 mm; tim đập 100–160 nhịp/phút, có thể thấy trên siêu âm đầu dò.',
      'Mầm tay chân nhú ra như nụ nhỏ; mắt, tai, mũi bắt đầu định hình.',
    ],
    mom: [
      'Nghén thường rõ nhất tuần 6–9; ngực to và nhạy cảm, quầng vú sẫm màu.',
      'Hay đi tiểu, táo bón nhẹ, tâm trạng lên xuống thất thường.',
    ],
    todo: [
      'Khám thai lần đầu (6–10 tuần): xác nhận thai trong tử cung, tim thai, chốt tuổi thai — đây là mốc tính ngày dự sinh chính xác nhất.',
      'Hỏi bác sĩ về các xét nghiệm máu cơ bản và lịch khám cả thai kỳ.',
      'Bố ơi: đi khám cùng mẹ lần này nhé — nghe tim bé lần đầu là khoảnh khắc đáng nhớ.',
    ],
    warning: [
      'Ra máu đỏ tươi, đau bụng dưới tăng dần.',
      'Sốt cao trên 38,5°C — sốt cao đầu thai kỳ cần khám để tìm nguyên nhân.',
    ],
  },
  {
    week: 7,
    title: 'Não lớn nhanh như thổi',
    baby: [
      'Dài khoảng 1 cm (bằng quả việt quất); não tạo thêm hàng trăm tế bào thần kinh mỗi phút.',
      'Tay chân dài ra, bàn tay dẹt như mái chèo; thận, gan, phổi đang hình thành.',
    ],
    mom: [
      'Nghén đạt đỉnh với nhiều mẹ; nước bọt tiết nhiều, nhạy mùi dầu mỡ, cà phê, nước hoa.',
      'Tử cung to gấp đôi nhưng bụng chưa lộ; cân nặng có thể giữ nguyên hoặc giảm nhẹ do nghén — bình thường.',
    ],
    todo: [
      'Ăn được gì thì ăn nấy miễn an toàn, đừng ép đủ chất lúc này — bé lấy dự trữ từ mẹ.',
      'Uống nước từng ngụm cả ngày; nước chanh ấm, nước dừa, canh loãng dễ vào hơn.',
      'Nếu vitamin bầu gây nôn, đổi giờ uống sang tối sau bữa ăn hoặc hỏi đổi loại.',
    ],
    warning: [
      'Nôn trên 3–4 lần/ngày kéo dài, không ăn uống được gì trong 24 giờ.',
      'Đau rát khi tiểu, tiểu buốt — viêm tiết niệu thai kỳ cần điều trị sớm.',
    ],
  },
  {
    week: 8,
    title: 'Bé bắt đầu cử động',
    baby: [
      'Dài khoảng 1,6 cm, nặng chừng 1 g; ngón tay ngón chân xuất hiện nhưng còn màng dính.',
      'Bé cử động những nhịp đầu tiên (mẹ chưa cảm nhận được); môi, mũi, mí mắt đang thành hình.',
    ],
    mom: [
      'Quần áo bắt đầu chật ở eo do đầy hơi và tử cung to; da có thể nổi mụn hoặc sáng hơn.',
      'Mệt, buồn ngủ, chóng mặt khi đứng dậy nhanh (huyết áp giảm nhẹ là bình thường).',
    ],
    todo: [
      'Khám thai lần đầu nếu chưa đi; xét nghiệm máu, nước tiểu, đo huyết áp nền.',
      'Bắt đầu thói quen ăn đủ canxi (sữa, sữa chua, cá nhỏ ăn cả xương, đậu hũ).',
      'Đứng dậy từ từ; ăn nhẹ giữa các bữa để tránh tụt đường huyết.',
    ],
    warning: [
      'Chóng mặt đến mức ngất, tim đập rất nhanh kèm khó thở.',
      'Ra máu kèm mô lợn cợn hoặc đau quặn như đau đẻ.',
    ],
  },
  {
    week: 9,
    title: 'Từ phôi thành thai nhi',
    baby: [
      'Dài khoảng 2,3 cm (bằng quả nho); đuôi phôi biến mất, bé đã có hình dáng người tí hon.',
      'Van tim, cơ quan sinh dục trong đang phát triển; bé mút ngón tay trong vài tuần tới.',
    ],
    mom: [
      'Ngực đầy và nặng hơn, có thể thấy gân xanh nổi; dễ xúc động, khóc cười vô cớ.',
      'Nhức đầu nhẹ do hormone và thiếu ngủ; ợ nóng bắt đầu xuất hiện.',
    ],
    todo: [
      'Mua áo ngực mới rộng rãi, không gọng; ưu tiên cotton thoáng.',
      'Chia sẻ với bố cảm giác lúc này — nghén và mệt mỏi dễ làm mẹ thấy đơn độc.',
      'Hỏi bác sĩ về NIPT nếu gia đình muốn sàng lọc sớm (làm được từ tuần 10).',
    ],
    warning: [
      'Nhức đầu dữ dội không đỡ sau nghỉ ngơi, kèm nhìn mờ.',
      'Ra máu đỏ tươi nhiều hơn vài giọt.',
    ],
  },
  {
    week: 10,
    title: 'Các cơ quan đã đủ',
    baby: [
      'Dài khoảng 3 cm, nặng 4 g; tất cả cơ quan chính đã hình thành — từ nay là giai đoạn lớn lên và hoàn thiện.',
      'Xương bắt đầu cứng, móng tay nhú, bé có thể gập khuỷu tay, đá chân.',
    ],
    mom: [
      'Bụng dưới hơi tròn với mẹ gầy; mạch máu nổi rõ ở tay chân, bụng.',
      'Nghén với nhiều mẹ bắt đầu "hạ nhiệt" dần trong 2–3 tuần tới.',
    ],
    todo: [
      'Đặt lịch siêu âm độ mờ da gáy cho tuần 11–13 (cửa sổ hẹp, dễ lỡ).',
      'Đi bộ nhẹ 20–30 phút mỗi ngày nếu không có chống chỉ định.',
      'Khám răng: lợi dễ chảy máu khi mang thai, điều trị nha khoa thông thường vẫn an toàn.',
    ],
    warning: [
      'Dịch âm đạo đổi màu xanh vàng, có mùi, ngứa — viêm nhiễm cần điều trị để không ảnh hưởng thai.',
      'Đau bụng dưới dữ dội hoặc ra máu nhiều.',
    ],
  },
  {
    week: 11,
    title: 'Mở cửa sổ sàng lọc',
    baby: [
      'Dài khoảng 4 cm, nặng 7 g; đầu còn chiếm nửa chiều dài cơ thể.',
      'Bé biết nuốt nước ối, nấc, duỗi người; cơ quan sinh dục ngoài bắt đầu phân biệt được.',
    ],
    mom: [
      'Thèm ăn trở lại ở một số mẹ; tóc dày bóng hơn do hormone.',
      'Táo bón và đầy hơi — progesterone làm ruột "lười" đi.',
    ],
    todo: [
      'Siêu âm độ mờ da gáy + Double test (hoặc NIPT) trong tuần 11–13 — mốc sàng lọc quan trọng nhất tam cá nguyệt 1.',
      'Ăn thêm chất xơ (rau, trái cây cả vỏ, yến mạch), uống 2–2,5 lít nước, vận động để đỡ táo bón.',
      'Bắt đầu nghĩ chuyện thông báo với gia đình nếu hai đứa muốn chờ qua 12 tuần.',
    ],
    warning: [
      'Không đi ngoài trên 4–5 ngày kèm đau bụng, chướng cứng.',
      'Ra máu, đau bụng dưới từng cơn.',
    ],
  },
  {
    week: 12,
    title: 'Mốc 12 tuần',
    baby: [
      'Dài khoảng 5,4 cm, nặng 14 g; phản xạ xuất hiện — chạm vào bụng bé có thể cử động dù mẹ chưa cảm nhận.',
      'Ruột đã chui vào ổ bụng, thận bắt đầu tạo nước tiểu, tủy xương sinh bạch cầu.',
    ],
    mom: [
      'Nguy cơ sảy thai giảm rõ sau mốc này; nhiều mẹ thấy khỏe hơn hẳn.',
      'Tử cung nhô lên khỏi khung chậu, bụng bắt đầu lộ nhẹ; có thể xuất hiện đường sẫm giữa bụng (linea nigra).',
    ],
    todo: [
      'Hoàn thành siêu âm độ mờ da gáy + Double test nếu chưa làm (hạn chót 13 tuần 6 ngày).',
      'Nhận kết quả xét nghiệm máu lần đầu: hỏi rõ về sắt, đường, viêm gan B, rubella.',
      'Chụp một tấm ảnh bụng đầu tiên — đây là lúc nhiều nhà bắt đầu "nhật ký bụng bầu".',
    ],
    warning: [
      'Ra máu đỏ tươi hoặc đau bụng dưới dữ dội.',
      'Sốt cao kèm phát ban — cần khám để loại trừ rubella, thủy đậu.',
    ],
  },
  {
    week: 13,
    title: 'Khép lại tam cá nguyệt 1',
    baby: [
      'Dài khoảng 7,4 cm, nặng 23 g (bằng quả chanh dây); vân tay riêng của bé đã hình thành.',
      'Dây thanh âm phát triển; nhau thai đảm nhận hoàn toàn việc nuôi bé và sản xuất hormone.',
    ],
    mom: [
      'Ốm nghén thường dịu hẳn, năng lượng quay lại — giai đoạn "trăng mật" của thai kỳ bắt đầu.',
      'Ngực có thể rỉ vài giọt sữa non vàng nhạt; cân nặng bắt đầu tăng đều 0,3–0,5 kg/tuần.',
    ],
    todo: [
      'Hạn chót siêu âm độ mờ da gáy là 13 tuần 6 ngày — lỡ thì tuần 15–18 làm Triple test.',
      'Lên kế hoạch ăn uống 3 tháng giữa: thêm khoảng 300 kcal/ngày (một bữa phụ), đủ sắt – canxi – DHA.',
      'Thông báo với gia đình, công ty nếu hai đứa đã sẵn sàng; tìm hiểu chế độ thai sản ở chỗ làm.',
    ],
    warning: [
      'Ra máu hoặc đau bụng dưới dữ dội.',
      'Nghén vẫn nặng, sụt cân trên 5% cân nặng trước mang thai — cần được điều trị.',
    ],
  },
];

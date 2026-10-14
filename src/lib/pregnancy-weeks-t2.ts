/**
 * Nội dung tuần 14–27 (tam cá nguyệt 2) cho khu /be-yeu-dotro/ (spec 009).
 * Cùng nguồn và giọng với `pregnancy-weeks-t1.ts`.
 */
import type { WeekGuide } from '~/lib/pregnancy-weeks';

export const WEEK_GUIDES_T2: readonly WeekGuide[] = [
  {
    week: 14,
    title: 'Bước vào giai đoạn dễ chịu nhất',
    baby: [
      'Dài khoảng 8,7 cm, nặng 43 g (bằng quả đào); bé biết nhăn mặt, nheo mắt, mút ngón tay.',
      'Lông tơ mịn (lanugo) phủ khắp người để giữ ấm; cổ dài ra nên cằm không còn dính ngực.',
    ],
    mom: [
      'Năng lượng quay lại, ăn ngon hơn; bụng lộ rõ hơn với người quen.',
      'Có thể nghẹt mũi, chảy máu cam nhẹ do mạch máu niêm mạc giãn.',
    ],
    todo: [
      'Tăng khẩu phần khoảng 300 kcal/ngày — một bữa phụ lành mạnh (sữa chua + trái cây, bánh mì trứng).',
      'Bắt đầu tập nhẹ đều đặn: đi bộ, bơi, yoga bầu 20–30 phút hầu hết các ngày.',
      'Nếu lỡ mốc sàng lọc tuần 11–13: hỏi bác sĩ về Triple test (tuần 15–18).',
    ],
    warning: [
      'Chảy máu cam nhiều, không cầm sau 20 phút ép cánh mũi.',
      'Đau bụng dưới dữ dội hoặc ra máu.',
    ],
  },
  {
    week: 15,
    title: 'Bé cảm nhận được ánh sáng',
    baby: [
      'Dài khoảng 10 cm, nặng 70 g (bằng quả táo); mắt vẫn nhắm nhưng cảm nhận được ánh sáng chiếu qua bụng mẹ.',
      'Xương tiếp tục cứng lại; bé tập "thở" bằng cách hít nước ối vào phổi.',
    ],
    mom: [
      'Đau nhói hai bên bụng dưới khi đứng dậy hoặc xoay người — đau dây chằng tròn do tử cung lớn.',
      'Lợi dễ sưng, chảy máu khi đánh răng; mạch máu da nổi rõ hơn.',
    ],
    todo: [
      'Đổi động tác từ từ, đỡ bụng khi ho hoặc hắt hơi để giảm đau dây chằng.',
      'Đánh răng bàn chải mềm, dùng chỉ nha khoa; khám nha khoa định kỳ trong thai kỳ là an toàn.',
      'Triple test trong tuần 15–18 nếu chưa làm sàng lọc trước đó.',
    ],
    warning: ['Đau bụng không giảm khi nghỉ, kèm sốt hoặc ra dịch bất thường.'],
  },
  {
    week: 16,
    title: 'Những cú máy đầu tiên',
    baby: [
      'Dài khoảng 11,6 cm, nặng 100 g (bằng quả bơ); tai đã vào đúng vị trí, bé bắt đầu nghe tiếng tim mẹ.',
      'Hệ cơ xương đủ mạnh để đá, duỗi, nhào lộn — với mẹ mang thai lần hai có thể cảm nhận từ tuần này.',
    ],
    mom: [
      'Thai máy sớm giống bong bóng vỡ hoặc cá quẫy, dễ nhầm với sôi bụng.',
      'Da mặt có thể sạm (nám thai kỳ), đường giữa bụng sẫm hơn — sẽ nhạt dần sau sinh.',
    ],
    todo: [
      'Khám định kỳ tháng thứ 4: cân nặng, huyết áp, nước tiểu, nghe tim thai.',
      'Thoa kem chống nắng SPF 30+ mỗi ngày để hạn chế nám.',
      'Bắt đầu nằm nghiêng (ưu tiên bên trái) khi ngủ; kê gối giữa hai gối cho đỡ mỏi.',
    ],
    warning: [
      'Nhức đầu nặng kèm nhìn mờ, sưng mặt hoặc tay đột ngột.',
      'Ra nước âm đạo trong, loãng, liên tục — cần loại trừ rỉ ối.',
    ],
  },
  {
    week: 17,
    title: 'Bé tích mỡ, xương chắc dần',
    baby: [
      'Dài khoảng 13 cm, nặng 140 g (bằng quả lê); lớp mỡ nâu bắt đầu tích để giữ nhiệt sau sinh.',
      'Dây rốn dày và chắc hơn; tuyến mồ hôi hình thành; bé nghe được tiếng nói to bên ngoài.',
    ],
    mom: [
      'Thèm ăn tăng rõ; tăng cân đều 0,4–0,5 kg/tuần là hợp lý với mẹ BMI bình thường.',
      'Mắt khô, hay mơ lạ, đổ mồ hôi nhiều hơn.',
    ],
    todo: [
      'Canxi 1.000 mg/ngày từ thực phẩm (sữa, phô mai tiệt trùng, cá nhỏ, rau xanh đậm) hoặc viên bổ sung theo bác sĩ.',
      'Bố đọc sách, hát cho bé nghe mỗi tối — bé nhận ra giọng quen sau sinh.',
      'Đặt lịch siêu âm hình thái học cho tuần 18–22.',
    ],
    warning: [
      'Tăng trên 1,5 kg trong một tuần kèm phù — cần đo huyết áp và thử nước tiểu.',
    ],
  },
  {
    week: 18,
    title: 'Tai bé đã nghe được',
    baby: [
      'Dài khoảng 14 cm, nặng 190 g (bằng quả ớt chuông); hệ thần kinh bọc myelin giúp truyền tín hiệu nhanh hơn.',
      'Bé giật mình với tiếng động lớn; nếu là bé gái, tử cung và vòi trứng đã ở đúng chỗ.',
    ],
    mom: [
      'Chóng mặt khi nằm ngửa lâu vì tử cung đè tĩnh mạch chủ — nằm nghiêng sẽ đỡ ngay.',
      'Đau lưng dưới bắt đầu do trọng tâm dồn về trước.',
    ],
    todo: [
      'Siêu âm hình thái học (18–22 tuần): khảo sát chi tiết các cơ quan, bánh nhau, nước ối — bố nên đi cùng.',
      'Mang giày đế thấp, đệm êm; ngồi có tựa lưng, tránh đứng lâu.',
      'Ghi lại cảm giác thai máy đầu tiên vào nhật ký — bác sĩ sẽ hỏi.',
    ],
    warning: [
      'Đau lưng dữ dội lan xuống chân, tê yếu chân hoặc mất kiểm soát tiểu tiện.',
      'Ra máu, đau bụng từng cơn đều đặn.',
    ],
  },
  {
    week: 19,
    title: 'Lớp sáp bảo vệ da bé',
    baby: [
      'Dài khoảng 15 cm, nặng 240 g (bằng quả xoài); da phủ lớp sáp trắng (vernix) chống nước ối làm nhăn.',
      'Các giác quan (vị giác, khứu giác, thính giác, thị giác, xúc giác) đang chuyên biệt hóa trong não.',
    ],
    mom: [
      'Chuột rút bắp chân ban đêm; đau hông khi nằm nghiêng.',
      'Nám, rạn da có thể bắt đầu ở bụng, đùi, ngực.',
    ],
    todo: [
      'Duỗi bắp chân trước khi ngủ, bổ sung đủ magie và canxi, uống đủ nước để giảm chuột rút.',
      'Dưỡng ẩm da bụng mỗi ngày (dầu dừa, kem dưỡng) — giảm ngứa, rạn vẫn tùy cơ địa.',
      'Nếu bố mẹ muốn biết giới tính: siêu âm hình thái thường cho biết ở tuần này.',
    ],
    warning: [
      'Bắp chân sưng đau một bên, nóng đỏ — nghi huyết khối tĩnh mạch, khám ngay.',
    ],
  },
  {
    week: 20,
    title: 'Nửa chặng đường',
    baby: [
      'Dài khoảng 16,4 cm đầu–mông (≈25 cm đầu–gót), nặng 300 g (bằng quả chuối); từ tuần sau sẽ đo chiều dài cả người.',
      'Bé nuốt nhiều nước ối hơn — tập cho hệ tiêu hóa; phân su bắt đầu hình thành trong ruột.',
    ],
    mom: [
      'Đỉnh tử cung ngang rốn; rốn có thể lồi ra.',
      'Hầu hết mẹ đã cảm nhận thai máy rõ; bố đặt tay lên bụng có thể cảm thấy vài cú đá.',
    ],
    todo: [
      'Siêu âm hình thái nếu chưa làm; hỏi kết quả về tim, não, cột sống, thận, vị trí nhau.',
      'Kiểm tra lại sắt: xét nghiệm công thức máu lần giữa thai kỳ nếu bác sĩ chỉ định; ăn thịt đỏ, gan (vừa phải), đậu, rau xanh.',
      'Tiêm uốn ván mũi 1 có thể bắt đầu từ tuần 20 (hỏi lịch tại trạm y tế / bệnh viện).',
    ],
    warning: [
      'Cảm giác nặng, tức vùng kín hoặc cơn gò đều đặn nhiều lần mỗi giờ.',
      'Ra máu hoặc ra nước âm đạo.',
    ],
  },
  {
    week: 21,
    title: 'Thai máy rõ hơn mỗi ngày',
    baby: [
      'Dài khoảng 26,7 cm đầu–gót, nặng 360 g (bằng củ cà rốt); bé có nhịp ngủ – thức, hay hoạt động khi mẹ nằm nghỉ.',
      'Tủy xương bắt đầu sản xuất hồng cầu; lông mày, mí mắt rõ nét.',
    ],
    mom: [
      'Thèm ăn mạnh, ợ nóng tăng; giãn tĩnh mạch chân có thể xuất hiện.',
      'Bụng ngứa do da căng; mụn trứng cá ở một số mẹ.',
    ],
    todo: [
      'Ăn tối trước khi ngủ 2–3 tiếng, kê cao đầu giường để đỡ ợ nóng; tránh đồ chiên, cay, chua quá.',
      'Kê cao chân khi ngồi, không ngồi vắt chéo, đi tất áp lực nếu giãn tĩnh mạch.',
      'Khám định kỳ tháng thứ 5; mang theo danh sách thắc mắc.',
    ],
    warning: [
      'Ngứa dữ dội lòng bàn tay, bàn chân nhất là ban đêm, không có mẩn — cần xét nghiệm gan mật (ứ mật thai kỳ).',
    ],
  },
  {
    week: 22,
    title: 'Khuôn mặt bé đủ nét',
    baby: [
      'Dài khoảng 27,8 cm, nặng 430 g (bằng quả đu đủ nhỏ); môi, mí mắt, lông mày rõ; mắt đã hình thành nhưng tròng mắt chưa có màu.',
      'Tuyến tụy phát triển để sản xuất hormone; bé nắm được dây rốn.',
    ],
    mom: [
      'Bàn chân có thể to ra nửa số do phù và giãn dây chằng; tóc, móng mọc nhanh.',
      'Hụt hơi nhẹ khi leo cầu thang.',
    ],
    todo: [
      'Mua giày rộng hơn nửa số; tránh đứng lâu, gác chân khi có thể.',
      'Nói chuyện, đặt tên gọi ở nhà cho bé — tốt cho gắn kết cả bố lẫn mẹ.',
      'Tìm hiểu lớp tiền sản (bệnh viện hoặc online) cho tam cá nguyệt 3.',
    ],
    warning: [
      'Khó thở đột ngột, đau ngực, tim đập nhanh bất thường.',
      'Phù mặt, tay đột ngột kèm nhức đầu.',
    ],
  },
  {
    week: 23,
    title: 'Phổi tập làm việc',
    baby: [
      'Dài khoảng 28,9 cm, nặng 500 g (bằng quả bưởi); phổi bắt đầu tạo chất hoạt diện (surfactant) giúp phế nang không xẹp khi thở.',
      'Bé nghe được tiếng ồn bên ngoài: nhạc, tiếng chó sủa, máy hút bụi — và quen dần.',
    ],
    mom: [
      'Cơn gò Braxton Hicks (gò sinh lý) có thể xuất hiện: bụng cứng lại vài chục giây rồi mềm, không đau, không đều.',
      'Nướu, mũi dễ chảy máu; đãng trí nhẹ ("não bầu").',
    ],
    todo: [
      'Học phân biệt gò sinh lý (thưa, không đau, hết khi đổi tư thế/uống nước) với gò chuyển dạ (đều, tăng dần).',
      'Ăn nhiều bữa nhỏ giàu đạm; cá béo 2 bữa/tuần (cá hồi, cá mòi) cho DHA, tránh cá lớn nhiều thủy ngân.',
      'Chuẩn bị cho tầm soát tiểu đường thai kỳ tuần 24–28: hỏi phòng khám cách nhịn ăn.',
    ],
    warning: [
      'Gò trên 4 cơn/giờ kèm đau lưng âm ỉ, tức bụng dưới — dấu hiệu dọa sinh non, khám ngay.',
      'Ra nước âm đạo liên tục.',
    ],
  },
  {
    week: 24,
    title: 'Mốc 24 tuần',
    baby: [
      'Dài khoảng 30 cm, nặng 600 g (bằng bắp ngô); da còn mỏng, trong, nhăn nheo, sẽ đầy dần khi tích mỡ.',
      'Từ tuần này bé có khả năng sống được nếu sinh non (với chăm sóc đặc biệt) — mốc "viability".',
    ],
    mom: [
      'Mắt khô, nhạy sáng; đau lưng, đau hông tăng khi đứng lâu.',
      'Có thể xuất hiện hội chứng ống cổ tay: tê, châm chích ngón tay về đêm.',
    ],
    todo: [
      'Làm nghiệm pháp dung nạp glucose 75 g (OGTT) trong tuần 24–28 — nhịn ăn 8 tiếng, mất ~2 tiếng tại viện.',
      'Tiêm uốn ván theo lịch (mũi 1 nếu chưa; mũi 2 cách mũi 1 ít nhất 1 tháng và trước sinh 1 tháng).',
      'Nghỉ tay, lắc cổ tay, đeo nẹp cổ tay ban đêm nếu tê nhiều.',
    ],
    warning: [
      'Khát nhiều, tiểu nhiều, mệt lả bất thường — báo bác sĩ, có thể cần kiểm tra đường huyết sớm.',
      'Gò đều, đau lưng âm ỉ hoặc áp lực vùng chậu tăng.',
    ],
  },
  {
    week: 25,
    title: 'Bé nhận ra giọng bố mẹ',
    baby: [
      'Dài khoảng 34,6 cm, nặng 660 g (bằng bông súp lơ); bé phản ứng với giọng quen bằng cách cử động hoặc tăng nhịp tim.',
      'Mũi bắt đầu thông, bé tập hít thở nước ối; lớp mỡ làm da đỡ nhăn.',
    ],
    mom: [
      'Trĩ, táo bón do tử cung đè lên ruột và tĩnh mạch; ngủ khó vì bụng và đi tiểu đêm.',
      'Tóc dày, da bóng — "glow" thai kỳ.',
    ],
    todo: [
      'Chất xơ + nước + vận động là bộ ba chống táo bón; ngâm nước ấm giúp dịu trĩ; không tự ý dùng thuốc nhuận tràng.',
      'Thiết lập giờ ngủ đều, gối ôm chữ U, tắt màn hình 1 tiếng trước ngủ.',
      'Lập danh sách đồ sơ sinh cần sắm — xem checklist, mua dần để không dồn vào cuối.',
    ],
    warning: [
      'Chảy máu hậu môn nhiều hoặc đau dữ dội.',
      'Nhức đầu, nhìn mờ, đau vùng thượng vị bên phải — dấu hiệu tiền sản giật, khám ngay.',
    ],
  },
  {
    week: 26,
    title: 'Mắt bé bắt đầu mở',
    baby: [
      'Dài khoảng 35,6 cm, nặng 760 g (bằng quả dưa leo); mắt mở lần đầu, bé chớp mắt và phản ứng với ánh sáng mạnh.',
      'Sóng não hoạt động như trẻ sơ sinh; nếu là bé trai, tinh hoàn bắt đầu di chuyển xuống bìu.',
    ],
    mom: [
      'Huyết áp có thể nhích lên nhẹ so với giữa thai kỳ; sưng nhẹ chân cuối ngày là bình thường.',
      'Đau xương sườn khi bé đạp lên cao; khó ngủ, mơ nhiều.',
    ],
    todo: [
      'Khám định kỳ tháng thứ 6: huyết áp, nước tiểu, cân nặng, bề cao tử cung, tim thai; hỏi kết quả OGTT.',
      'Tập bài Kegel mỗi ngày để sàn chậu khỏe cho sinh nở và hồi phục sau sinh.',
      'Bố: lên kế hoạch nghỉ phép quanh ngày dự sinh, tìm đường đến bệnh viện ngoài giờ.',
    ],
    warning: [
      'Huyết áp đo được từ 140/90 trở lên, phù đột ngột, nhức đầu dai dẳng.',
      'Bé máy ít hẳn so với mọi ngày.',
    ],
  },
  {
    week: 27,
    title: 'Khép lại tam cá nguyệt 2',
    baby: [
      'Dài khoảng 36,6 cm, nặng 875 g (bằng bắp cải nhỏ); bé nấc cụt (mẹ thấy giật đều nhịp), mút tay, ngủ – thức theo chu kỳ.',
      'Phổi, gan, hệ miễn dịch còn cần hoàn thiện nhưng cơ hội sống nếu sinh non đã khá cao.',
    ],
    mom: [
      'Tăng cân tổng khoảng 7–9 kg với BMI bình thường; đau lưng, chuột rút, trĩ có thể song hành.',
      'Hội chứng chân không yên về đêm ở một số mẹ.',
    ],
    todo: [
      'Hoàn tất OGTT và uốn ván nếu còn; hỏi về tiêm ho gà (Tdap) từ tuần 27–36 để bé có kháng thể sớm.',
      'Bắt đầu học cách đếm cử động thai (từ tuần 28): chọn khung giờ bé hay máy, đếm đủ 10 cử động trong 2 giờ.',
      'Chuẩn bị tinh thần cho tam cá nguyệt 3: lịch khám dày hơn (2 tuần/lần từ tuần 28–36).',
    ],
    warning: [
      'Bé máy ít hẳn hoặc không máy trong 2 giờ dù đã ăn uống, nằm nghiêng theo dõi.',
      'Gò đều đặn, ra nước, ra máu.',
    ],
  },
];

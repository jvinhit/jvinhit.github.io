/**
 * Cẩm nang chăm sóc mẹ bầu (spec 009, AC-11): ăn ngủ nghỉ, vận động, da –
 * răng, quan hệ vợ chồng, tinh thần, việc của bố — sắp theo tam cá nguyệt
 * trong từng chủ đề. Shape `GuideTopic` dùng chung với cẩm nang sơ sinh
 * (`pregnancy-newborn.ts`) và component GuideTopics.astro.
 * Nguồn: NHS, ACOG, WHO, Bộ Y tế; luật lao động/BHXH VN cho phần nghỉ phép.
 */
export interface GuideBlock {
  title: string;
  items: string[];
}

export interface GuideTopic {
  id: string;
  emoji: string;
  title: string;
  intro: string;
  blocks: GuideBlock[];
  /** Dấu hiệu cần đi khám ngay — render bằng AlertBox nếu có. */
  warning?: string[];
}

export const CARE_TOPICS: readonly GuideTopic[] = [
  {
    id: 'ngu',
    emoji: '😴',
    title: 'Giấc ngủ',
    intro:
      'Ngủ đủ là "thuốc bổ" rẻ nhất của thai kỳ — nhưng mỗi giai đoạn lại khó ngủ theo kiểu riêng.',
    blocks: [
      {
        title: 'Tam cá nguyệt 1 — buồn ngủ cả ngày',
        items: [
          'Progesterone tăng làm mẹ mệt như hết pin: ngủ sớm hơn 1 tiếng, chợp mắt trưa 20–30 phút nếu được.',
          'Ngủ tư thế nào thoải mái cũng được, chưa cần kiêng nằm ngửa.',
          'Đi tiểu đêm nhiều: uống đủ nước ban ngày, giảm dần 2 tiếng trước khi ngủ.',
        ],
      },
      {
        title: 'Tam cá nguyệt 2 — tập nằm nghiêng',
        items: [
          'Từ khoảng tuần 20 ưu tiên nằm nghiêng (bên trái tốt nhất cho máu về tim và nhau thai); tỉnh dậy thấy mình nằm ngửa thì chỉ cần xoay lại, đừng hoảng.',
          'Gối ôm chữ U hoặc kê gối giữa hai gối + dưới bụng giảm đau hông, đau lưng.',
          'Chuột rút ban đêm: duỗi thẳng chân, kéo mũi bàn chân về phía người; ban ngày đủ nước, canxi, magie.',
        ],
      },
      {
        title: 'Tam cá nguyệt 3 — bụng to, khó ngủ',
        items: [
          'Kê cao đầu giường 10–15 cm và ăn tối trước ngủ 2–3 tiếng để đỡ ợ nóng.',
          'Thức giấc giữa đêm là bình thường (cơ thể "tập" cho những đêm có bé); nằm im thư giãn, không xem điện thoại.',
          'Ngáy, ngưng thở khi ngủ mới xuất hiện → báo bác sĩ, có liên quan huyết áp.',
        ],
      },
      {
        title: 'Khi mất ngủ kéo dài',
        items: [
          'Giữ giờ ngủ – dậy cố định, phòng tối mát, tắt màn hình 1 tiếng trước ngủ.',
          'Tắm nước ấm, uống sữa ấm, hít thở 4-7-8, viết ra điều đang lo rồi gập sổ lại.',
          'Không tự mua thuốc ngủ hay thảo dược an thần; hỏi bác sĩ sản trước.',
        ],
      },
    ],
  },
  {
    id: 'van-dong',
    emoji: '🚶‍♀️',
    title: 'Vận động',
    intro:
      'Thai kỳ bình thường nên vận động 150 phút/tuần cường độ vừa — mức "vừa" là tập mà vẫn nói chuyện được.',
    blocks: [
      {
        title: 'Nên',
        items: [
          'Đi bộ nhanh, bơi, yoga/pilates bầu, đạp xe tại chỗ, khiêu vũ nhẹ.',
          'Kegel mỗi ngày (siết như nín tiểu 5 giây, thả 5 giây, 10–15 lần × 3 lượt) — giúp sinh dễ và đỡ són tiểu sau sinh.',
          'Khởi động, uống nước trước – trong – sau; dừng khi mệt, không cố "cháy" như trước.',
          'Mẹ chưa từng tập: bắt đầu 10–15 phút/ngày rồi tăng dần.',
        ],
      },
      {
        title: 'Tránh',
        items: [
          'Môn dễ ngã hoặc va chạm: bóng đá, bóng rổ, cưỡi ngựa, trượt, leo núi địa hình.',
          'Nằm ngửa tập lâu sau tam cá nguyệt 1; nín thở khi gắng sức; nâng tạ nặng.',
          'Lặn biển, tập ở độ cao trên 2.500 m, tập nơi nóng ẩm, xông hơi, bồn nước nóng.',
          'Gập bụng (crunch) từ tam cá nguyệt 2 — dễ gây tách cơ bụng.',
        ],
      },
      {
        title: 'Chống chỉ định — hỏi bác sĩ trước khi tập',
        items: [
          'Nhau tiền đạo sau 26 tuần, hở eo cổ tử cung, dọa sinh non, ra máu kéo dài, tiền sản giật, thiếu máu nặng, đa thai có nguy cơ.',
        ],
      },
    ],
    warning: [
      'Chảy máu âm đạo, ra nước, cơn gò đều đặn.',
      'Đau ngực, khó thở trước khi gắng sức, chóng mặt, nhức đầu.',
      'Đau bắp chân hoặc sưng một bên chân.',
      'Bé máy ít hẳn sau khi tập.',
    ],
  },
  {
    id: 'nghi-ngoi',
    emoji: '💼',
    title: 'Nghỉ ngơi, làm việc, đi lại',
    intro:
      'Đa số mẹ làm việc bình thường tới gần ngày sinh — quan trọng là tư thế, nhịp nghỉ và biết quyền lợi của mình.',
    blocks: [
      {
        title: 'Làm việc văn phòng',
        items: [
          'Đứng dậy đi lại 3–5 phút mỗi 45–60 phút; kê chân lên ghế thấp; ghế có tựa lưng, thêm gối nhỏ sau thắt lưng.',
          'Màn hình ngang tầm mắt, cổ tay thẳng (hội chứng ống cổ tay hay nặng lên khi mang thai).',
          'Ăn phụ 10h và 15h, để chai nước ngay bàn.',
        ],
      },
      {
        title: 'Đứng lâu, đi lại nhiều',
        items: [
          'Giày đế thấp êm, tất áp lực nếu giãn tĩnh mạch; đổi chân, ngồi nghỉ 10 phút mỗi giờ.',
          'Không bê vác nặng hơn 10 kg, bê gì cũng gập gối chứ không cúi lưng.',
          'Tránh hóa chất, tia X không che chắn, tiếng ồn lớn, ca đêm liên tục — đề nghị chuyển việc phù hợp, luật cho phép.',
        ],
      },
      {
        title: 'Quyền lợi theo luật (kiểm tra lại với HR)',
        items: [
          'Nghỉ đi khám thai hưởng BHXH 5 lần, mỗi lần 1–2 ngày; nghỉ thai sản 6 tháng (có thể nghỉ trước sinh tối đa 2 tháng).',
          'Từ tháng thứ 7 (hoặc tháng thứ 6 ở vùng cao, xa) không phải làm đêm, làm thêm, đi công tác xa; được chuyển việc nhẹ hơn hoặc giảm 1 giờ/ngày.',
          'Chồng có BHXH được nghỉ 5–14 ngày khi vợ sinh (tùy sinh thường/mổ, một hay nhiều bé) trong 30 ngày đầu.',
          'Nuôi con dưới 12 tháng: nghỉ 60 phút/ngày hưởng nguyên lương.',
        ],
      },
      {
        title: 'Đi lại',
        items: [
          'Xe máy: đi chậm, tránh ổ gà, đoạn đường xóc; từ tam cá nguyệt 3 bụng to khó giữ thăng bằng — để bố chở hoặc đi ô tô/taxi khi có thể.',
          'Ô tô: luôn thắt dây an toàn — đai dưới vòng qua hông dưới bụng, đai chéo giữa ngực; ngồi lùi xa túi khí.',
          'Máy bay: an toàn nhất tuần 14–28; đa số hãng yêu cầu giấy bác sĩ từ 28 tuần và từ chối từ 36 tuần. Chuyến dài: đi lại mỗi giờ, uống nước, tất áp lực.',
        ],
      },
    ],
  },
  {
    id: 'da-rang',
    emoji: '✨',
    title: 'Da, tóc, răng miệng',
    intro:
      'Hormone làm da tóc thay đổi nhiều; phần lớn tự hết sau sinh, nhưng có vài thứ nên làm và vài thứ phải tránh.',
    blocks: [
      {
        title: 'Da',
        items: [
          'Rạn da: do gen và tốc độ tăng cân là chính; dưỡng ẩm (dầu dừa, bơ hạt mỡ, kem dưỡng) giúp đỡ ngứa và da đàn hồi tốt hơn, nhưng đừng tin "hết rạn 100%".',
          'Nám, đường giữa bụng sẫm: chống nắng SPF 30+ mỗi ngày, đội mũ; nhạt dần sau sinh.',
          'Mụn: được dùng sữa rửa mặt dịu, azelaic acid, benzoyl peroxide nồng độ thấp; TRÁNH retinoid (tretinoin, isotretinoin), salicylic acid nồng độ cao, hydroquinone — hỏi bác sĩ da liễu nếu nặng.',
          'Ngứa toàn thân, nhất là lòng bàn tay chân về đêm mà không nổi mẩn → cần xét nghiệm gan (ứ mật thai kỳ).',
        ],
      },
      {
        title: 'Tóc',
        items: [
          'Tóc dày bóng hơn khi mang thai và rụng nhiều 3–4 tháng sau sinh — bình thường, mọc lại trong một năm.',
          'Nhuộm, uốn: nên chờ qua tam cá nguyệt 1, chọn thuốc gốc nước/không amoniac, phòng thoáng, hoặc chỉ nhuộm highlight không chạm da đầu.',
        ],
      },
      {
        title: 'Răng miệng',
        items: [
          'Lợi sưng, chảy máu khi mang thai rất phổ biến; đánh răng bàn chải mềm 2 lần/ngày + chỉ nha khoa, súc nước muối.',
          'Khám nha khoa 1 lần trong thai kỳ; trám, lấy cao răng, điều trị tủy, gây tê tại chỗ đều an toàn — nói với nha sĩ là đang mang thai. Tẩy trắng răng để sau sinh.',
          'Nôn nghén: súc miệng nước lọc hoặc nước baking soda loãng, chờ 30 phút rồi mới đánh răng để không mòn men.',
        ],
      },
    ],
  },
  {
    id: 'vo-chong',
    emoji: '💞',
    title: 'Quan hệ vợ chồng',
    intro:
      'Thai kỳ bình thường thì gần gũi hoàn toàn an toàn: bé được bảo vệ bởi túi ối, cơ tử cung và nút nhầy cổ tử cung.',
    blocks: [
      {
        title: 'Những điều bình thường',
        items: [
          'Ham muốn lên xuống thất thường — tam cá nguyệt 1 mệt và nghén, tam cá nguyệt 2 thường tăng, tam cá nguyệt 3 lại giảm vì bụng to. Cả hai đều ổn.',
          'Sau quan hệ có gò nhẹ hoặc rỉ chút máu hồng (cổ tử cung nhạy cảm) — thường vô hại; nhiều hoặc kéo dài thì khám.',
          'Chọn tư thế không đè bụng: nằm nghiêng, mẹ ở trên, hoặc từ phía sau; dùng gel bôi trơn nếu khô.',
        ],
      },
      {
        title: 'Khi nào cần kiêng (theo bác sĩ)',
        items: [
          'Nhau tiền đạo, nhau bám thấp; hở eo cổ tử cung hoặc đã khâu eo; dọa sinh non, tiền sử sinh non.',
          'Đang ra máu, rỉ ối, vỡ ối; mắc bệnh lây qua đường tình dục chưa điều trị.',
          'Đa thai có nguy cơ cao — hỏi rõ bác sĩ.',
        ],
      },
      {
        title: 'Sau sinh',
        items: [
          'Chờ ít nhất 4–6 tuần cho sản dịch hết, vết khâu lành và đến khi mẹ thật sự sẵn sàng — không có "hạn chót".',
          'Cho con bú không phải biện pháp tránh thai chắc chắn; bàn chuyện tránh thai ở lần tái khám 6 tuần (bao cao su, vòng, que cấy, thuốc chỉ progestin).',
          'Nói chuyện với nhau về sự thay đổi cơ thể và cảm xúc — gần gũi không chỉ là quan hệ.',
        ],
      },
    ],
  },
  {
    id: 'tinh-than',
    emoji: '🫶',
    title: 'Sức khỏe tinh thần',
    intro:
      'Một trong năm mẹ gặp vấn đề tâm lý trong thai kỳ hoặc sau sinh. Nhận ra sớm và nói ra là mạnh mẽ, không phải yếu đuối.',
    blocks: [
      {
        title: 'Bình thường',
        items: [
          'Khóc vô cớ, cáu gắt, lo lắng về việc làm mẹ, mơ lạ, "não bầu" hay quên.',
          'Buồn thoáng qua vài ngày đầu sau sinh (baby blues) ở tới 80% mẹ — tự hết trong 2 tuần.',
        ],
      },
      {
        title: 'Tự chăm mình mỗi ngày',
        items: [
          'Ngủ đủ (giao bớt việc), vận động nhẹ ngoài trời, ăn đúng bữa.',
          'Giữ 1 việc chỉ cho mình: đọc sách, vẽ, nghe nhạc, cà phê (decaf) với bạn.',
          'Bớt lướt mạng xã hội so sánh bụng, cân, "mẹ bỉm hoàn hảo".',
          'Nói với bố điều mình cần thay vì chờ bố đoán; viết nhật ký cảm xúc ngay trong trang này.',
          'Đi lớp tiền sản, nói chuyện với mẹ khác cùng giai đoạn — thấy mình không một mình.',
        ],
      },
      {
        title: 'Dấu hiệu cần được giúp (trầm cảm, lo âu thai kỳ / sau sinh)',
        items: [
          'Buồn, trống rỗng hoặc lo lắng kéo dài hơn 2 tuần, gần như cả ngày.',
          'Mất hứng thú với mọi thứ kể cả bé; không ngủ được dù bé đang ngủ, hoặc ngủ li bì.',
          'Cảm giác mình là mẹ tồi, vô dụng, tội lỗi quá mức; hoảng loạn, tim đập nhanh.',
          'Ý nghĩ làm hại bản thân hoặc bé — đây là cấp cứu, báo ngay người thân và bác sĩ.',
        ],
      },
    ],
    warning: [
      'Có bất kỳ dấu hiệu nào ở khối trên: nói với bố/người thân hôm nay, hẹn bác sĩ sản hoặc khoa tâm lý — điều trị (tư vấn, thuốc an toàn khi mang thai/cho bú) hiệu quả và không ảnh hưởng bé.',
    ],
  },
  {
    id: 'viec-cua-bo',
    emoji: '👨‍👩‍👧',
    title: 'Việc của bố',
    intro:
      'Bố không "giúp" mẹ — bố cùng mang thai theo cách của bố. Danh sách này để bố không phải đoán.',
    blocks: [
      {
        title: 'Tam cá nguyệt 1',
        items: [
          'Gánh việc nhà có mùi: nấu nướng, đổ rác, dọn nhà vệ sinh; để sẵn bánh quy mặn, nước chanh, gừng.',
          'Không bình luận chuyện mẹ ăn ít/ăn lạ, không "sao em mệt hoài"; thay vào đó hỏi "em cần gì bây giờ?".',
          'Đi khám lần đầu cùng mẹ — nghe tim thai lần đầu là của cả hai.',
          'Đọc trang Tuần này mỗi tuần để biết bé và mẹ đang ở đâu.',
        ],
      },
      {
        title: 'Tam cá nguyệt 2',
        items: [
          'Đi siêu âm hình thái cùng; chụp lại màn hình, lưu vào Nhật ký.',
          'Nói chuyện, đọc sách, hát cho bé nghe mỗi tối — bé nhận ra giọng bố sau sinh.',
          'Massage chân, lưng 10 phút trước ngủ; đổi gối ôm cho mẹ.',
          'Đăng ký lớp tiền sản cùng; bắt đầu tập mua đồ theo checklist.',
          'Rà lại tài chính: chi phí sinh, bảo hiểm, nghỉ phép của hai người.',
        ],
      },
      {
        title: 'Tam cá nguyệt 3',
        items: [
          'Soạn giỏ đồ đi sinh cùng mẹ và biết trong đó có gì; thử đường đến viện cả ngày lẫn đêm.',
          'Học cách thở, đếm cơn gò, thuộc quy tắc 5-1-1 và dấu hiệu nguy hiểm.',
          'Tập thay tã, quấn khăn, tắm búp bê ở lớp tiền sản hoặc video của bệnh viện.',
          'Sắp lịch nghỉ phép quanh ngày dự sinh ± 2 tuần; chuẩn bị người thay mình ở công ty.',
          'Lắp cũi, ghế ô tô, giặt đồ sơ sinh; cấp đông vài bữa ăn.',
        ],
      },
      {
        title: 'Trong phòng sinh và tuần đầu',
        items: [
          'Ở bên, giúp mẹ đổi tư thế, uống nước, thở theo; là người nói chuyện với nhân viên y tế khi mẹ không nói nổi.',
          'Da kề da với bé ngay khi có thể; học thay tã, ợ hơi, dỗ bé để chia ca đêm.',
          'Canh khách thăm: giới hạn giờ, nhắc rửa tay, từ chối người đang ốm.',
          'Để ý tâm trạng mẹ; thấy buồn kéo dài, khóc nhiều, nói "em không làm được" → gọi bác sĩ cùng mẹ.',
        ],
      },
    ],
  },
];

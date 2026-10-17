/**
 * Cẩm nang chăm sóc mẹ bầu (spec 009, AC-11): ăn ngủ nghỉ, khó chịu thường
 * gặp, thuốc – vắc xin, bệnh lý thai kỳ, vận động, da – răng, quan hệ vợ
 * chồng, tinh thần, chuyển dạ, việc của bố — sắp theo tam cá nguyệt trong
 * từng chủ đề. Shape `GuideTopic` dùng chung với cẩm nang sơ sinh
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
    id: 'kho-chiu',
    emoji: '🩹',
    title: 'Khó chịu thường gặp',
    intro:
      'Phần lớn là "tác dụng phụ" bình thường của hormone và bụng lớn dần — biết cách đỡ thì đỡ khổ, và biết khi nào nó không còn bình thường.',
    blocks: [
      {
        title: 'Nghén, buồn nôn',
        items: [
          'Ăn ít mà nhiều bữa, đừng để bụng rỗng; để bánh quy mặn đầu giường ăn trước khi ngồi dậy.',
          'Gừng (trà gừng, kẹo gừng), chanh, đồ nguội ít mùi thường dễ ăn hơn đồ nóng.',
          'Uống nước từng ngụm nhỏ giữa các bữa thay vì uống nhiều trong bữa.',
          'Vitamin B6, hoặc B6 + doxylamine, là thuốc chống nghén an toàn — chỉ dùng khi bác sĩ kê.',
          'Thường dịu dần sau tuần 12–14; một số mẹ nghén tới tam cá nguyệt 2.',
        ],
      },
      {
        title: 'Ợ nóng, đầy bụng',
        items: [
          'Chia nhỏ bữa, ăn chậm; không nằm ngay trong 2–3 tiếng sau ăn; kê cao đầu giường.',
          'Bớt đồ chua cay, chiên rán, cà phê, socola, nước có ga.',
          'Thuốc kháng acid chứa canxi/magie dùng được khi cần — hỏi bác sĩ loại và liều, uống cách viên sắt 2 giờ.',
        ],
      },
      {
        title: 'Táo bón, trĩ',
        items: [
          'Rau, trái cây cả vỏ, yến mạch, khoai lang + 2–2,5 lít nước + đi bộ mỗi ngày.',
          'Viên sắt hay gây táo bón — đừng tự bỏ, hỏi bác sĩ đổi loại hoặc thêm thuốc làm mềm phân (lactulose, macrogol).',
          'Trĩ: ngâm hậu môn nước ấm 10–15 phút, không rặn mạnh, không ngồi lâu trên bồn cầu; thuốc bôi theo bác sĩ.',
        ],
      },
      {
        title: 'Phù chân, chuột rút, giãn tĩnh mạch',
        items: [
          'Phù nhẹ ở bàn chân, cổ chân cuối ngày là bình thường: kê chân cao 15–20 phút, nằm nghiêng trái, tránh đứng/ngồi yên quá lâu.',
          'Tất áp lực mang từ sáng giúp đỡ giãn tĩnh mạch và phù.',
          'Chuột rút: duỗi gối, kéo mũi bàn chân về phía người; ban ngày đủ nước, đủ canxi, vận động nhẹ.',
        ],
      },
      {
        title: 'Đau lưng, đau xương mu',
        items: [
          'Đứng thẳng, giày đế thấp, ngồi có tựa lưng; bê đồ gập gối, không cúi lưng.',
          'Đau khớp mu (đau nhói vùng xương mu khi bước, trở mình): khép hai gối khi lên xuống giường/xe, bước ngắn, tránh đứng một chân khi mặc quần.',
          'Đai đỡ bụng, yoga bầu, bơi, chườm ấm (không chườm nóng lên bụng) giúp đỡ nhiều; đau nhiều thì hỏi bác sĩ về vật lý trị liệu.',
        ],
      },
      {
        title: 'Mũi, chân răng, huyết trắng, đi tiểu',
        items: [
          'Nghẹt mũi, chảy máu cam nhẹ do niêm mạc phù nề: rửa nước muối sinh lý, máy tạo ẩm; tránh tự dùng thuốc xịt co mạch.',
          'Huyết trắng nhiều hơn, trong hoặc trắng đục, không mùi là bình thường; không thụt rửa âm đạo.',
          'Huyết trắng vón cục như bã đậu, ngứa, mùi hôi, đổi màu → khám, đừng tự đặt thuốc.',
          'Đi tiểu nhiều là bình thường, nhưng tiểu buốt, tiểu rắt, nước tiểu đục → khám vì nhiễm trùng tiểu ở bà bầu dễ lan lên thận và gây gò sớm.',
          'Chóng mặt khi đứng dậy: ngồi dậy từ từ, ăn đúng bữa, đủ nước.',
        ],
      },
    ],
    warning: [
      'Nôn không giữ được gì kể cả nước trong 24 giờ, sụt cân, tiểu ít sẫm màu.',
      'Phù đột ngột ở mặt, tay, kèm nhức đầu hoặc nhìn mờ.',
      'Đau thượng vị hoặc dưới sườn phải dữ dội không giống ợ nóng thông thường.',
      'Tiểu buốt kèm sốt, đau hông lưng.',
      'Bắp chân sưng, đỏ, đau một bên.',
    ],
  },
  {
    id: 'thuoc-vac-xin',
    emoji: '💊',
    title: 'Thuốc và vắc xin',
    intro:
      'Nguyên tắc: không tự mua thuốc, nhưng cũng đừng chịu đựng — nhiều thuốc an toàn khi mang thai, chỉ cần hỏi đúng người. Luôn nói "em đang có thai tuần X" với bác sĩ, dược sĩ, nha sĩ.',
    blocks: [
      {
        title: 'Thuốc thường dùng',
        items: [
          'Paracetamol là thuốc giảm đau, hạ sốt ưu tiên khi mang thai — dùng khi thật cần, liều thấp nhất, thời gian ngắn nhất.',
          'Tránh nhóm NSAID (ibuprofen, diclofenac, naproxen, aspirin liều giảm đau), nhất là từ tuần 20 — ảnh hưởng thận của bé và lượng nước ối.',
          'Ngoại lệ: aspirin liều thấp do bác sĩ kê để phòng tiền sản giật — uống đúng theo đơn, đừng tự ngưng.',
          'Không tự dùng kháng sinh, thuốc xổ, thuốc nam, thuốc bắc, thực phẩm chức năng "an thai".',
          'Đang dùng thuốc dài ngày (tuyến giáp, huyết áp, động kinh, trầm cảm): đừng tự ngưng — hỏi bác sĩ đổi sang thuốc an toàn.',
          'Thuốc bôi da chứa retinoid, thuốc trị mụn uống isotretinoin: tuyệt đối tránh.',
        ],
      },
      {
        title: 'Vắc xin nên tiêm khi mang thai',
        items: [
          'Cúm: tiêm được ở bất kỳ tuần nào, nên tiêm khi tới mùa cúm — bảo vệ cả mẹ và bé 6 tháng đầu.',
          'Ho gà (Tdap: bạch hầu – ho gà – uốn ván): tuần 27–36, nhắc lại ở mỗi lần mang thai; kháng thể truyền qua nhau bảo vệ bé trước khi bé đủ tuổi tiêm.',
          'Uốn ván (VAT): theo lịch của trạm y tế/bệnh viện; nếu đã tiêm Tdap, hỏi bác sĩ có cần thêm mũi VAT không.',
          'RSV (virus hợp bào hô hấp): vắc xin cho mẹ bầu tuần 32–36 giúp bé ít bị viêm tiểu phế quản nặng — hỏi bác sĩ/trung tâm tiêm chủng xem đã có và có phù hợp với mẹ không.',
        ],
      },
      {
        title: 'Không tiêm khi đang mang thai',
        items: [
          'Vắc xin sống giảm độc lực: sởi – quai bị – rubella, thủy đậu — tiêm trước khi có thai ít nhất 1 tháng hoặc để sau sinh.',
          'Lỡ tiêm khi chưa biết có thai: báo bác sĩ, thường không phải lý do để bỏ thai.',
        ],
      },
      {
        title: 'Chụp chiếu, xét nghiệm',
        items: [
          'Siêu âm an toàn; X-quang răng hoặc ngực có che bụng có liều tia rất thấp.',
          'CT, chụp có thuốc cản quang chỉ làm khi thật cần — nhắc nhân viên y tế là đang mang thai.',
        ],
      },
    ],
  },
  {
    id: 'benh-ly',
    emoji: '🩺',
    title: 'Bệnh lý thai kỳ cần biết',
    intro:
      'Không phải để lo trước — mà để hiểu vì sao bác sĩ hẹn những xét nghiệm đó, và nhận ra sớm nếu có chuyện.',
    blocks: [
      {
        title: 'Tiểu đường thai kỳ',
        items: [
          'Tầm soát bằng nghiệm pháp dung nạp đường (OGTT 75 g) ở tuần 24–28; nguy cơ cao (thừa cân, gia đình có người tiểu đường, từng tiểu đường thai kỳ) có thể làm sớm hơn.',
          'Đa số kiểm soát được bằng ăn uống (bớt tinh bột trắng, chia nhỏ bữa, ăn rau trước) + đi bộ sau ăn; một số cần insulin — an toàn cho bé.',
          'Sau sinh 4–12 tuần làm lại xét nghiệm đường huyết; về lâu dài nên kiểm tra đường huyết định kỳ.',
        ],
      },
      {
        title: 'Tăng huyết áp và tiền sản giật',
        items: [
          'Huyết áp từ 140/90 trở lên sau tuần 20, kèm đạm trong nước tiểu hoặc tổn thương gan, thận, tiểu cầu.',
          'Nguy cơ cao (con so, trên 35–40 tuổi, béo phì, đa thai, có tăng huyết áp/tiểu đường/bệnh thận, từng tiền sản giật) → bác sĩ có thể cho aspirin liều thấp từ tuần 12–16.',
          'Có máy đo huyết áp ở nhà thì đo cùng giờ mỗi tuần, ghi vào Nhật ký; có thể xảy ra cả sau sinh tới 6 tuần.',
        ],
      },
      {
        title: 'Thiếu máu',
        items: [
          'Hemoglobin dưới 110 g/L khi mang thai; mệt, xanh xao, hồi hộp, khó thở khi gắng sức.',
          'Uống sắt đều theo đơn, ăn thịt đỏ, gan (vừa phải), rau xanh kèm trái cây giàu vitamin C.',
          'Một số mẹ mang gen thalassemia (tan máu bẩm sinh) — rất phổ biến ở Việt Nam; nếu cả bố và mẹ cùng mang gen, bác sĩ sẽ tư vấn chẩn đoán trước sinh cho bé.',
        ],
      },
      {
        title: 'Nhau thai, cổ tử cung',
        items: [
          'Nhau bám thấp ở siêu âm tuần 20 thường tự "kéo" lên khi tử cung lớn; siêu âm lại ở tam cá nguyệt 3.',
          'Nhau tiền đạo: ra máu đỏ tươi không đau là dấu hiệu điển hình — đi viện ngay; thường phải mổ.',
          'Cổ tử cung ngắn (đo khi siêu âm hình thái) → bác sĩ có thể cho progesterone đặt âm đạo hoặc khâu eo để phòng sinh non.',
        ],
      },
      {
        title: 'Khác',
        items: [
          'Ứ mật thai kỳ: ngứa nhiều lòng bàn tay, bàn chân về đêm — cần xét nghiệm acid mật, men gan.',
          'Tuyến giáp: suy giáp cần bổ sung hormone đủ liều để bé phát triển não bình thường.',
          'Nhóm máu Rh âm (hiếm ở người Việt): cần tiêm anti-D theo chỉ định để bảo vệ lần mang thai sau.',
          'Liên cầu khuẩn nhóm B (GBS): tầm soát tuần 35–37; dương tính chỉ cần kháng sinh lúc chuyển dạ.',
        ],
      },
    ],
    warning: [
      'Nhức đầu dữ dội, nhìn mờ, thấy đom đóm; phù mặt và tay đột ngột.',
      'Ra máu âm đạo ở bất kỳ tuần nào, kể cả không đau.',
      'Thai máy ít hẳn hoặc không máy.',
      'Đau bụng dữ dội, liên tục; gò cứng bụng đều đặn trước tuần 37.',
      'Ra nước âm đạo (nghi vỡ ối) trước khi chuyển dạ.',
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
    id: 'chuyen-da',
    emoji: '🏥',
    title: 'Chuyển dạ và ngày sinh',
    intro:
      'Biết trước lúc nào đi viện, chuyện gì sẽ diễn ra và mình muốn gì — ngày sinh sẽ bớt hoảng hơn rất nhiều. Bàn kế hoạch sinh với bác sĩ từ tuần 32–36.',
    blocks: [
      {
        title: 'Gò giả hay chuyển dạ thật',
        items: [
          'Gò sinh lý (Braxton Hicks): thưa, không đều, không đau tăng dần, hết khi đổi tư thế, đi lại hoặc uống nước.',
          'Chuyển dạ thật: gò đều, gần nhau dần, mạnh dần, đau lan từ lưng ra trước bụng, không hết khi nghỉ.',
          'Dấu hiệu sắp sinh (vài giờ đến vài ngày trước): bụng tụt xuống, ra nhớt hồng hoặc lẫn máu (bong nút nhầy), đau lưng âm ỉ, đi ngoài nhiều.',
        ],
      },
      {
        title: 'Khi nào xách giỏ đi viện',
        items: [
          'Con so: gò đều mỗi 5 phút, mỗi cơn khoảng 1 phút, kéo dài 1 giờ (quy tắc 5-1-1). Con rạ thường nhanh hơn — đi khi gò đều khoảng 10 phút/lần.',
          'Vỡ ối (ra nước ồ ạt hoặc rỉ liên tục) dù chưa gò: ghi lại giờ và màu nước ối, đi viện.',
          'Ra máu đỏ tươi, thai máy giảm, đau liên tục không có lúc nghỉ: đi ngay, không chờ đủ 5-1-1.',
          'Tính cả đường đi: giờ cao điểm, mưa ngập ở TP.HCM có thể mất gấp đôi thời gian — nhà xa thì đi sớm hơn.',
          'Muốn gây tê ngoài màng cứng (đẻ không đau) thì đừng đến quá muộn: bệnh viện cần khám, xét nghiệm máu trước khi tiêm.',
        ],
      },
      {
        title: 'Các giai đoạn',
        items: [
          'Giai đoạn 1 — cổ tử cung mở: pha tiềm thời (đến khoảng 5–6 cm) có thể kéo dài 12–20 giờ ở con so; pha hoạt động mở nhanh hơn, khoảng 1 cm/giờ.',
          'Giai đoạn 2 — rặn sinh: từ khi mở trọn 10 cm tới lúc bé ra, thường 30 phút đến 2–3 giờ với con so.',
          'Giai đoạn 3 — sổ nhau: 5–30 phút sau khi bé ra; nữ hộ sinh tiêm thuốc co hồi tử cung để giảm mất máu.',
          'Trong lúc chờ: đi lại, ngồi bóng, đổi tư thế, uống nước/ăn nhẹ nếu bệnh viện cho phép, đi tiểu mỗi 1–2 giờ.',
        ],
      },
      {
        title: 'Giảm đau',
        items: [
          'Gây tê ngoài màng cứng: phổ biến và an toàn, mẹ vẫn tỉnh, vẫn rặn được; có thể làm chuyển dạ dài hơn chút, tụt huyết áp, ngứa — bác sĩ gây mê theo dõi.',
          'Không làm được khi rối loạn đông máu, nhiễm trùng vùng lưng, hoặc khi sắp sinh tới nơi.',
          'Không dùng thuốc: thở chậm sâu theo cơn gò, massage lưng dưới, chườm ấm, tắm vòi sen ấm, bố ở bên đếm nhịp thở cùng.',
        ],
      },
      {
        title: 'Sinh thường hay sinh mổ',
        items: [
          'Sinh thường: hồi phục nhanh, bé được "ép" bớt dịch phổi khi qua đường sinh; có thể cần cắt tầng sinh môn khi bé to hoặc cần sinh nhanh.',
          'Sinh mổ khi có chỉ định: ngôi mông/ngang, nhau tiền đạo, suy thai, chuyển dạ không tiến triển, đã mổ nhiều lần…',
          'Mổ chủ động theo yêu cầu: không nên trước 39 tuần vì phổi bé chưa trưởng thành hẳn; hồi phục lâu hơn và lần sau dễ phải mổ tiếp.',
          'Từng mổ một lần vẫn có thể thử sinh thường (VBAC) ở bệnh viện có đủ điều kiện mổ cấp cứu — hỏi bác sĩ.',
        ],
      },
      {
        title: 'Kế hoạch sinh — những điều nên hỏi trước',
        items: [
          'Ai được vào phòng sinh/phòng mổ cùng mẹ; bố có được cắt dây rốn không.',
          'Da kề da ngay sau sinh (kể cả sinh mổ), kẹp rốn muộn 1–3 phút, cho bé bú trong giờ đầu.',
          'Gây tê ngoài màng cứng: chi phí, thời điểm, ai thực hiện.',
          'Có đăng ký bác sĩ đỡ riêng được không, nếu bác sĩ không kịp đến thì ai đỡ.',
          'Bé được tiêm vitamin K1 và viêm gan B mũi sơ sinh; sàng lọc sơ sinh gói nào.',
          'Lưu tế bào gốc máu cuống rốn: tùy chọn, tốn kém — quyết định trước, không phải lúc đang đau đẻ.',
        ],
      },
    ],
    warning: [
      'Nước ối màu xanh, nâu, có mùi hôi, hoặc thấy dây rốn ở âm đạo — gọi 115 hoặc tới viện gần nhất ngay.',
      'Ra máu đỏ tươi nhiều; đau bụng liên tục, cứng như gỗ.',
      'Sốt từ 38°C khi đang chuyển dạ hoặc sau vỡ ối.',
      'Bé không máy hoặc máy ít hẳn.',
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

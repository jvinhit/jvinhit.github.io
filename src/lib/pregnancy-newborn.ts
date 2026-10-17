/**
 * Cẩm nang sơ sinh + mẹ sau sinh (spec 009, AC-12). Cùng shape GuideTopic
 * với `pregnancy-care.ts`. Lịch tiêm theo Chương trình Tiêm chủng mở rộng
 * (TCMR) hiện hành — xác nhận lại với trạm y tế vì lịch có thể cập nhật.
 * Nguồn: WHO (IMCI dấu hiệu nguy hiểm), AAP ngủ an toàn, Bộ Y tế.
 */
import type { GuideTopic } from '~/lib/pregnancy-care';

export const NEWBORN_TOPICS: readonly GuideTopic[] = [
  {
    id: 'bu',
    emoji: '🤱',
    title: 'Bú mẹ & dấu hiệu bú đủ',
    intro:
      'Hai tuần đầu là lúc "gọi sữa về": bú thường xuyên quan trọng hơn bú đúng giờ.',
    blocks: [
      {
        title: 'Nguyên tắc',
        items: [
          'Da kề da và bú trong giờ đầu sau sinh nếu được; sữa non ít nhưng là đủ cho dạ dày bé bằng quả nho.',
          'Bú theo nhu cầu, 8–12 cữ/24 giờ; không để bé ngủ quá 3–4 tiếng không bú trong 2 tuần đầu.',
          'Khớp ngậm đúng: miệng bé mở rộng, ngậm sâu cả quầng vú, cằm chạm ngực mẹ, mẹ không đau nhói. Đau rát kéo dài → nhờ nữ hộ sinh chỉnh lại.',
          'Cho bú cạn một bên rồi mới đổi bên để bé nhận sữa cuối giàu béo.',
          'Vitamin D3 400 IU/ngày cho bé bú mẹ, bắt đầu từ những ngày đầu.',
        ],
      },
      {
        title: 'Bé bú đủ khi',
        items: [
          'Từ ngày 5: ít nhất 6 tã ướt nặng/ngày, nước tiểu nhạt màu; phân vàng hoa cà hoa cải, 3–4 lần/ngày tháng đầu.',
          'Nghe tiếng nuốt khi bú; sau bú bé thả vú, thư giãn, ngủ được 1–3 tiếng.',
          'Sụt cân sinh lý dưới 7–10% trong 3–5 ngày đầu, về lại cân sinh trước 10–14 ngày, sau đó tăng 150–200 g/tuần.',
        ],
      },
      {
        title: 'Nếu dùng sữa công thức',
        items: [
          'Pha đúng tỉ lệ trên hộp với nước đun sôi để nguội còn khoảng 70°C, dùng trong 2 giờ; tiệt trùng bình núm.',
          'Khoảng 150 ml/kg/ngày sau tuần đầu, chia 6–8 cữ; bé no thì thôi, không ép hết bình.',
          'Không pha loãng/đặc hơn, không thêm đường, mật ong, ngũ cốc; không cho bé dưới 1 tuổi uống sữa bò tươi hay mật ong.',
        ],
      },
      {
        title: 'Khó khăn hay gặp tuần đầu',
        items: [
          'Nứt, đau đầu ti: gần như luôn do khớp ngậm nông — chỉnh lại cách ngậm trước; sau bú thoa vài giọt sữa hoặc kem lanolin, để khô thoáng.',
          'Căng sữa ngày 3–5: cho bú thường xuyên, vắt bớt chút cho mềm quầng vú trước khi bé ngậm, chườm mát sau bú.',
          'Thấy "ít sữa": đa số là đủ nếu tã và cân của bé đạt; muốn tăng sữa thì cho bú/hút thường xuyên hơn, kể cả ban đêm — không cần lợi sữa đặc biệt.',
          'Bệnh viện thường có chuyên viên tư vấn sữa mẹ (IBCLC) — nhờ họ xem một cữ bú trước khi ra viện.',
        ],
      },
      {
        title: 'Vắt và trữ sữa',
        items: [
          'Rửa tay, tiệt trùng bộ hút; ghi ngày giờ trên túi, trữ mỗi túi 60–120 ml cho đỡ phí.',
          'Nhiệt độ phòng (dưới 25°C): dùng trong 4 giờ. Ngăn mát: 4 ngày. Ngăn đá: tốt nhất trong 6 tháng, tối đa 12 tháng.',
          'Rã đông trong ngăn mát hoặc ngâm nước ấm, dùng trong 24 giờ, không đông đá lại; không hâm bằng lò vi sóng (nóng không đều, bỏng miệng bé).',
          'Sữa bé bú dở dùng trong 2 giờ rồi bỏ.',
        ],
      },
    ],
  },
  {
    id: 'khoc-tro-phan',
    emoji: '🍼',
    title: 'Khóc, ợ hơi, trớ, phân',
    intro:
      'Những thứ làm bố mẹ mới lo nhất thường lại bình thường — còn vài dấu hiệu nhỏ thì cần đi khám ngay.',
    blocks: [
      {
        title: 'Bé khóc',
        items: [
          'Kiểm tra lần lượt: đói, tã bẩn, nóng/lạnh (sờ gáy), buồn ngủ, cần ợ hơi, muốn được ôm.',
          'Dỗ theo "5S": quấn chặt tay, bế nghiêng hoặc úp trên tay (chỉ khi bế, không khi ngủ), tiếng "suỵt" hoặc ồn trắng, đung đưa nhẹ, cho ngậm (vú hoặc ti giả).',
          'Khóc dạ đề (colic): bé khỏe, tăng cân tốt nhưng khóc trên 3 giờ/ngày, trên 3 ngày/tuần, thường chiều tối, đỡ dần sau 3–4 tháng.',
          'Thấy mình sắp mất kiểm soát: đặt bé nằm ngửa an toàn trong cũi, ra ngoài hít thở vài phút, gọi người thay. KHÔNG BAO GIỜ lắc bé.',
        ],
      },
      {
        title: 'Ợ hơi, trớ, nấc',
        items: [
          'Cho ợ hơi giữa và sau cữ: bế đứng tựa vai hoặc ngồi đỡ cằm, vỗ/xoa lưng nhẹ vài phút; không ợ được cũng không sao.',
          'Trớ một ít sữa sau bú là bình thường nếu bé vẫn tăng cân và vui vẻ: bế đứng 20–30 phút sau bú, không cho bú quá no.',
          'Nấc, hắt hơi, khò khè mũi, thở không đều lúc ngủ (có khoảng ngưng ngắn dưới 10 giây) là bình thường ở trẻ sơ sinh.',
        ],
      },
      {
        title: 'Phân của bé',
        items: [
          'Ngày 1–3: phân su xanh đen, dính như hắc ín; ngày 3–5: chuyển màu xanh nâu; sau đó vàng hoa cà hoa cải (bú mẹ) hoặc vàng nâu, đặc hơn (sữa công thức).',
          'Bé bú mẹ tháng đầu đi nhiều lần/ngày; sau 6 tuần có thể vài ngày mới đi một lần nếu phân vẫn mềm — không phải táo bón.',
          'Đối chiếu màu phân với thẻ màu phân trong sổ theo dõi/sổ tiêm chủng mỗi ngày tháng đầu: phân trắng, vàng nhạt như phấn hoặc màu đất sét → khám ngay (nghi teo đường mật, phẫu thuật càng sớm càng tốt).',
        ],
      },
    ],
    warning: [
      'Nôn vọt sau mọi cữ bú, hoặc nôn ra dịch xanh lá/vàng mật.',
      'Phân trắng, bạc màu, hoặc có máu, nhầy máu.',
      'Khóc thét không dỗ được kèm sốt, bỏ bú, lừ đừ, bụng chướng.',
      'Ngưng thở trên 15–20 giây, hoặc kèm tím tái.',
    ],
  },
  {
    id: 'ngu-an-toan',
    emoji: '🛏️',
    title: 'Ngủ an toàn',
    intro:
      'Bé sơ sinh ngủ 14–17 tiếng/ngày nhưng mỗi giấc ngắn. Cách đặt bé ngủ quyết định sự an toàn.',
    blocks: [
      {
        title: 'Quy tắc ABC: Alone – Back – Crib',
        items: [
          'Luôn đặt bé NẰM NGỬA khi ngủ, cả ngủ ngày — giảm đột tử sơ sinh (SIDS) rõ rệt; bé tự lật được thì không cần xoay lại.',
          'Mặt phẳng cứng, ga trải phẳng; KHÔNG gối, chăn dày, thú bông, nệm mềm, gối chống lật, dây buộc trong cũi.',
          'Cùng phòng với bố mẹ ít nhất 6 tháng đầu nhưng khác giường (nôi/cũi sát giường).',
          'Phòng mát 24–26°C, mặc túi ngủ thay chăn; không để quá nóng, không hút thuốc trong nhà.',
          'Bé ngủ gục trên ghế ô tô, địu, ghế rung → chuyển sang mặt phẳng khi về nhà.',
        ],
      },
      {
        title: 'Nhịp ngủ những tuần đầu',
        items: [
          'Ngày đêm lẫn lộn 6–8 tuần đầu là bình thường; ban ngày mở rèm, nói chuyện, ban đêm tối và yên lặng để bé học dần.',
          'Dấu hiệu buồn ngủ: ngáp, dụi mắt, nhìn xa xăm — đặt xuống lúc đó dễ hơn lúc đã khóc.',
          'Khóc chiều tối (colic/"giờ phù thủy") đạt đỉnh tuần 6: ôm, quấn, ồn trắng, đung đưa; không bao giờ lắc bé.',
        ],
      },
    ],
  },
  {
    id: 'tam-ron-da',
    emoji: '🛁',
    title: 'Tắm, rốn, da',
    intro:
      'Da bé mỏng bằng 1/5 da người lớn — ít can thiệp, giữ sạch và khô là đủ.',
    blocks: [
      {
        title: 'Tắm',
        items: [
          'Tuần đầu lau người là đủ; tắm 2–3 lần/tuần, 5–10 phút, nước 37°C (thử bằng khuỷu tay), phòng kín gió 26–28°C.',
          'Sữa tắm gội sơ sinh không mùi hoặc chỉ nước; lau khô kỹ nếp gấp cổ, nách, bẹn.',
          'Luôn một tay đỡ đầu cổ; không bao giờ rời bé trong chậu dù một giây.',
        ],
      },
      {
        title: 'Rốn',
        items: [
          'Giữ khô và thoáng: gấp mép tã dưới rốn, không bôi gì trừ khi bệnh viện dặn; rụng trong 7–14 ngày, hơi rỉ dịch vàng nhạt là bình thường.',
          'Đỏ lan quanh chân rốn, có mủ, mùi hôi, chảy máu nhiều, bé sốt → khám ngay.',
        ],
      },
      {
        title: 'Da & tã',
        items: [
          'Thay tã mỗi 2–3 giờ hoặc ngay khi ị; rửa nước ấm, lau khô, bôi kem kẽm oxit lớp mỏng khi hăm; để mông thoáng vài phút mỗi lần.',
          'Mụn sữa, vảy cứt trâu, bong da, mảng đỏ trên mí/gáy đều lành tính — không nặn, không chà.',
          'Cắt móng khi bé ngủ bằng kềm sơ sinh hoặc dũa; đeo bao tay nếu bé cào mặt.',
          'Phơi nắng: không bắt buộc và không thay được vitamin D3; nếu phơi thì trước 8h, 10–15 phút, không để nắng chiếu thẳng mắt.',
        ],
      },
    ],
  },
  {
    id: 'vang-da',
    emoji: '🌕',
    title: 'Vàng da',
    intro:
      'Khoảng 60% bé đủ tháng vàng da sinh lý. Việc của bố mẹ là biết khi nào nó không còn "sinh lý".',
    blocks: [
      {
        title: 'Vàng da sinh lý',
        items: [
          'Xuất hiện ngày 2–3, đỉnh ngày 4–5, hết trong 1–2 tuần (bé bú mẹ có thể kéo dài hơn nhưng bé vẫn bú tốt, tăng cân).',
          'Chỉ vàng ở mặt, ngực; bé vẫn tỉnh táo, bú khỏe.',
          'Cách tốt nhất để giảm: bú nhiều (đào thải bilirubin qua phân). Phơi nắng KHÔNG thay được chiếu đèn khi cần.',
        ],
      },
      {
        title: 'Quan sát mỗi ngày',
        items: [
          'Dưới ánh sáng tự nhiên, ấn nhẹ ngón tay lên trán, ngực, bụng, đùi, lòng bàn chân rồi thả — da vàng tới đâu.',
          'Tái khám theo hẹn bệnh viện ngày 3–7 để đo bilirubin nếu bé ra viện sớm.',
        ],
      },
    ],
    warning: [
      'Vàng da trong 24 giờ đầu sau sinh.',
      'Vàng lan xuống bụng, đùi, lòng bàn tay chân; mắt vàng đậm.',
      'Bé lừ đừ, bú kém, khóc thét cao, gồng ưỡn người.',
      'Vàng kéo dài trên 2 tuần (đủ tháng) hoặc 3 tuần (non tháng), phân bạc màu, nước tiểu sẫm.',
    ],
  },
  {
    id: 'tiem-chung',
    emoji: '💉',
    title: 'Lịch tiêm chủng năm đầu',
    intro:
      'Theo Chương trình Tiêm chủng mở rộng (miễn phí tại trạm y tế). Xác nhận lịch cụ thể với trạm/bệnh viện vì có thể cập nhật.',
    blocks: [
      {
        title: 'Tiêm chủng mở rộng',
        items: [
          'Sơ sinh (24 giờ đầu): viêm gan B mũi sơ sinh; trong tháng đầu: lao (BCG).',
          '2 tháng: 5 trong 1 (bạch hầu – ho gà – uốn ván – viêm gan B – Hib) mũi 1 + bại liệt uống (bOPV) lần 1 + Rota liều 1.',
          '3 tháng: 5 trong 1 mũi 2 + bOPV lần 2 + Rota liều 2.',
          '4 tháng: 5 trong 1 mũi 3 + bOPV lần 3 + bại liệt tiêm (IPV) mũi 1.',
          '9 tháng: sởi mũi 1 + IPV mũi 2.',
          '12 tháng: viêm não Nhật Bản mũi 1 và 2 (cách nhau 1–2 tuần).',
          '18 tháng: sởi – rubella + bạch hầu – ho gà – uốn ván nhắc lại.',
        ],
      },
      {
        title: 'Dịch vụ nên cân nhắc (có phí)',
        items: [
          'Phế cầu (từ 2 tháng), 6 trong 1 thay 5 trong 1 nếu muốn ít mũi hơn, cúm (từ 6 tháng, nhắc hằng năm), thủy đậu và viêm gan A (từ 12 tháng), não mô cầu.',
        ],
      },
      {
        title: 'Sau tiêm',
        items: [
          'Theo dõi tại điểm tiêm 30 phút; về nhà theo dõi 24–48 giờ: sốt nhẹ, quấy, sưng chỗ tiêm là bình thường — chườm mát, bú nhiều, hạ sốt theo cân nặng nếu ≥ 38,5°C.',
          'Sốt cao không hạ, co giật, tím tái, khó thở, phát ban toàn thân, khóc thét kéo dài trên 3 giờ → đi viện ngay.',
          'Giữ sổ tiêm chủng cùng chỗ với giấy tờ của bé; chụp ảnh lưu vào Nhật ký.',
        ],
      },
    ],
  },
  {
    id: 'sang-loc-giay-to',
    emoji: '📋',
    title: 'Sàng lọc sơ sinh & giấy tờ cho bé',
    intro:
      'Vài việc chỉ làm được trong những ngày đầu (sàng lọc), vài việc có hạn chót (khai sinh, hồ sơ thai sản). Gom một chỗ để bố đi làm cho nhanh.',
    blocks: [
      {
        title: 'Ngay sau sinh, tại viện',
        items: [
          'Vitamin K1 tiêm bắp phòng xuất huyết não, viêm gan B mũi sơ sinh trong 24 giờ đầu — hỏi lại nếu chưa thấy làm.',
          'Lấy máu gót chân sau 48–72 giờ để sàng lọc bệnh bẩm sinh (suy giáp bẩm sinh, thiếu men G6PD, tăng sản thượng thận…); bệnh viện tư thường có gói cơ bản và gói mở rộng.',
          'Đo thính lực (OAE) và đo SpO2 tay – chân để tầm soát tim bẩm sinh trước khi ra viện.',
          'Thiếu men G6PD: tránh long não, băng phiến (kể cả trong tủ đồ của bé), một số thuốc và lá thuốc — đưa danh sách bác sĩ cho mỗi lần khám.',
        ],
      },
      {
        title: 'Khai sinh, BHYT',
        items: [
          'Kiểm tra giấy chứng sinh trước khi rời viện: họ tên, ngày sinh, số CCCD của mẹ, ngày giờ sinh, giới tính, cân nặng đúng hết.',
          'Đăng ký khai sinh trong 60 ngày kể từ ngày sinh — làm online trên ứng dụng VNeID hoặc Cổng Dịch vụ công quốc gia (thủ tục liên thông khai sinh + đăng ký thường trú + cấp thẻ BHYT cho trẻ dưới 6 tuổi), hoặc tại UBND phường.',
          'Bé được cấp số định danh cá nhân cùng lúc khai sinh; thẻ BHYT trẻ dưới 6 tuổi miễn phí — có thẻ rồi thì mang theo mỗi lần đi khám.',
          'Chụp giấy chứng sinh, giấy khai sinh, thẻ BHYT, sổ tiêm chủng lưu vào Nhật ký và album chung của hai bố mẹ.',
        ],
      },
      {
        title: 'Chế độ thai sản (BHXH)',
        items: [
          'Mẹ có đóng BHXH: nộp bản sao giấy khai sinh (hoặc giấy chứng sinh) cho HR sớm — hỏi HR hạn chót, thường tính từ ngày đi làm lại.',
          'Trợ cấp một lần khi sinh: 2 lần mức lương cơ sở/mức tham chiếu cho mỗi con; nếu mẹ không đóng BHXH mà bố có đóng thì bố nhận.',
          'Bố nộp hồ sơ nghỉ khi vợ sinh (5–14 ngày làm việc tùy sinh thường/mổ, sinh đôi) trong 30 ngày đầu.',
          'Quy định có thể thay đổi theo Luật BHXH mới — xác nhận lại với HR hoặc tổng đài BHXH 1900 9068.',
        ],
      },
    ],
  },
  {
    id: 'nguy-hiem',
    emoji: '🚑',
    title: 'Dấu hiệu nguy hiểm ở trẻ sơ sinh',
    intro:
      'Trẻ sơ sinh bệnh nặng thường không sốt cao hay khóc to — mà lặng đi. Thuộc danh sách này và đừng ngại đi viện "oan".',
    blocks: [
      {
        title: 'Cách theo dõi hằng ngày',
        items: [
          'Đếm nhịp thở khi bé ngủ yên trong 1 phút (bình thường 40–60); nhìn bụng và lồng ngực.',
          'Để ý số cữ bú, số tã, màu da, mức tỉnh táo khi thay tã.',
          'Nhiệt kế điện tử đo nách: bình thường 36,5–37,5°C.',
        ],
      },
    ],
    warning: [
      'Bú kém hẳn hoặc bỏ bú; nôn vọt liên tục, bụng chướng cứng.',
      'Thở nhanh trên 60 lần/phút, rút lõm ngực, thở rên, ngưng thở, tím môi/đầu chi.',
      'Sốt từ 38°C trở lên hoặc hạ thân nhiệt dưới 36°C (bé dưới 3 tháng sốt là phải khám).',
      'Lừ đừ, ngủ li bì khó đánh thức, ít cử động, khóc yếu hoặc khóc thét bất thường.',
      'Co giật, gồng cứng; thóp phồng căng.',
      'Vàng da nặng/sớm; rốn đỏ lan rộng, có mủ; mụn mủ nhiều trên da.',
      'Không tiểu quá 8–12 giờ, môi khô, mắt trũng; phân có máu.',
    ],
  },
  {
    id: 'me-sau-sinh',
    emoji: '🌷',
    title: 'Mẹ sau sinh',
    intro:
      'Sáu tuần hậu sản là "tam cá nguyệt thứ tư": cơ thể mẹ cần được chăm như lúc mang thai, thậm chí hơn.',
    blocks: [
      {
        title: 'Cơ thể hồi phục',
        items: [
          'Sản dịch: đỏ tươi 3–4 ngày → hồng nâu → vàng trắng, hết trong 4–6 tuần; dùng băng vệ sinh, không tampon/cốc nguyệt san.',
          'Đau co hồi tử cung khi cho bú là tốt (tử cung đang nhỏ lại); giảm đau bằng paracetamol/ibuprofen theo bác sĩ — an toàn khi cho bú.',
          'Vết khâu tầng sinh môn: rửa nước ấm sau mỗi lần vệ sinh, thấm khô, thay băng 3–4 giờ, ngồi gối tròn; lành 2–3 tuần.',
          'Vết mổ: giữ khô, không băng kín, mặc quần cạp cao mềm; đau nhiều hơn, chảy dịch, đỏ nóng → khám.',
          'Táo bón, trĩ: nước, chất xơ, đi bộ nhẹ, thuốc làm mềm phân nếu cần; đừng nhịn vì sợ đau.',
          'Tắc tia sữa: cho bú/hút thường xuyên bên đó, chườm ấm trước – mát sau, massage nhẹ hướng về núm; sốt, mảng đỏ đau → viêm vú, cần khám sớm.',
        ],
      },
      {
        title: 'Sinh hoạt',
        items: [
          'Ăn đủ 3 bữa + 2–3 phụ, thêm khoảng 500 kcal và 2–3 lít nước/ngày nếu cho bú; tiếp tục vitamin bầu và sắt theo bác sĩ.',
          'Kiêng cữ hiện đại: được tắm gội nước ấm từ ngày đầu, được ra ngoài hít thở, không nằm than, không hơ nóng, ăn đa dạng (không chỉ cơm với thịt kho mặn).',
          'Vận động nhẹ (đi bộ, Kegel) từ tuần đầu; tập bụng, chạy sau 6–12 tuần và khi bác sĩ đồng ý.',
          'Ngủ khi bé ngủ — thật sự; giao việc, hạn chế khách, chia ca đêm với bố.',
          'Tái khám 1–2 tuần (vết mổ/khâu, huyết áp nếu từng cao) và 6 tuần; bàn tránh thai, sàng lọc trầm cảm sau sinh.',
        ],
      },
    ],
    warning: [
      'Ra máu ướt đẫm một băng/giờ trong 2 giờ liền, hoặc ra cục máu to hơn quả trứng.',
      'Sốt từ 38°C; sản dịch hôi; đau bụng dữ dội.',
      'Nhức đầu dữ dội, nhìn mờ, phù mặt tay, huyết áp cao — tiền sản giật sau sinh vẫn xảy ra tới 6 tuần.',
      'Đau ngực, khó thở, ho ra máu; bắp chân sưng đau một bên.',
      'Vết mổ/khâu đỏ, sưng, chảy mủ, hở.',
      'Buồn, trống rỗng kéo dài hơn 2 tuần; ý nghĩ làm hại mình hoặc bé — cấp cứu tâm lý, báo ngay người thân và bác sĩ.',
    ],
  },
];

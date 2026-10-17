/**
 * Cẩm nang bệnh viện & bác sĩ (spec 009): nơi khám thai + sinh ở TP.HCM,
 * MêKông xếp đầu vì nhà mình ưu tiên. Dữ liệu tra cứu tay tháng 10/2026 từ
 * website chính thức của từng viện + bài review của các mẹ — bác sĩ hay đổi
 * nơi làm, bảng giá hay đổi, nên mỗi viện ghi rõ nguồn và ngày kiểm tra để
 * lần sau rà lại thay vì tin mù quáng.
 *
 * Bác sĩ chỉ ghi người còn có tên trên trang chính thức của viện (hoặc ghi rõ
 * là chưa xác nhận); `note` nói vì sao hay được nhắc, không phải xếp hạng.
 */
export interface HospitalDoctor {
  name: string;
  /** Học hàm/học vị như viện ghi: ThS.BS, BS.CKII… */
  title: string;
  role: string;
  note?: string;
}

export interface HospitalSource {
  label: string;
  url: string;
}

export interface Hospital {
  id: string;
  name: string;
  /** Công / tư / quốc tế + chuyên khoa hay đa khoa. */
  kind: string;
  /** Nhà mình đang nghiêng về viện này — đưa lên đầu, gắn nhãn. */
  preferred?: boolean;
  summary: string;
  address: string;
  phones: { label: string; tel: string }[];
  website: string;
  cost: string[];
  strengths: string[];
  cautions: string[];
  doctors: HospitalDoctor[];
  sources: HospitalSource[];
  /** Tháng/năm kiểm tra dữ liệu lần cuối. */
  checked: string;
}

export const HOSPITALS: readonly Hospital[] = [
  {
    id: 'mekong',
    name: 'Bệnh viện Phụ sản MêKông',
    kind: 'Tư nhân · chuyên sản phụ khoa',
    preferred: true,
    summary:
      'Bệnh viện chuyên sản ở Tân Bình, gần sân bay. Đội ngũ phần lớn từ khoa Sản Bệnh viện Đại học Y Dược và Từ Dũ chuyển về; không quá tải như viện công, sản phụ được phòng sanh riêng.',
    address:
      '243 – 243A – 243B Hoàng Văn Thụ, P. Tân Sơn Hòa (trước là P.1, Q. Tân Bình), TP.HCM',
    phones: [
      { label: 'Tổng đài đặt lịch', tel: '19006113' },
      { label: 'Bệnh viện', tel: '02838442989' },
    ],
    website: 'https://benhvienphusanmekong.com/',
    cost: [
      'Khám sản: 200.000đ (ngoài giờ/Chủ nhật 250.000đ); khám VIP 500.000đ.',
      'Sanh thường 7,5 triệu; sanh thường có vết mổ cũ 8,5 triệu; mổ lấy thai lần đầu 10 triệu (chưa gồm tiền phòng, thuốc, xét nghiệm).',
      'Gây tê ngoài màng cứng (đẻ không đau): 2,4 triệu; siêu âm 4D hình thái 700.000đ.',
      'Phòng nằm: đôi từ 1,6 triệu, đơn từ 2,5 triệu, VIP từ 3,2 triệu mỗi đêm.',
      'BookingCare (08/2026) ước tính cả gói khoảng 13,8 triệu sinh thường, 23–25 triệu sinh mổ, chưa tính phòng.',
      'Bảng giá trên web ghi năm 2022 và không có gói sinh trọn gói — gọi tổng đài để lấy báo giá hiện tại.',
    ],
    strengths: [
      'Mỗi sản phụ một phòng sanh riêng; da kề da, kẹp rốn muộn, bác sĩ thăm mẹ và bé mỗi ngày (theo review của các mẹ).',
      'Chọn được bác sĩ khám thai và đăng ký bác sĩ đỡ; nhiều bác sĩ lâu năm từng là trưởng/phó khoa ở Từ Dũ, ĐHYD.',
      'Có khoa Sơ sinh riêng (trưởng khoa từng làm ở Từ Dũ), phòng đơn, đôi, VIP.',
      'Không quá tải như viện công, nhân viên được khen nhẹ nhàng, phòng sạch.',
    ],
    cautions: [
      'Chi phí cao hơn viện công khá nhiều khi cộng tiền phòng và dịch vụ — hỏi rõ gói trước.',
      'Bác sĩ đăng ký có thể không kịp tới khi sinh nhanh, lúc đó bác sĩ trực đỡ — hỏi trước cách xử lý.',
      'Muốn đẻ không đau phải đến đủ sớm để kịp xét nghiệm (có mẹ đến muộn bị từ chối).',
      'Ca thai nguy cơ rất cao hoặc bé cần hồi sức sơ sinh chuyên sâu kéo dài có thể phải chuyển viện tuyến cuối — hỏi bác sĩ nếu thai kỳ có bệnh lý.',
    ],
    doctors: [
      {
        title: 'ThS.BS',
        name: 'Võ Thị Tuyết',
        role: 'Trưởng khoa Sanh',
        note: 'Hơn 20 năm, từng làm ở BV Đại học Y Dược; hay có tên trong các bài giới thiệu bác sĩ đỡ đẻ ở MêKông.',
      },
      {
        title: 'BS.CKII',
        name: 'Hồ Kỳ Thu Nguyệt',
        role: 'Bác sĩ khoa Sanh (từng là Trưởng khoa Sanh)',
        note: '30 năm nghề, gần 27 năm ở Từ Dũ — từng là Trưởng khoa Sản H.',
      },
      {
        title: 'ThS.BS',
        name: 'Bành Thanh Lan',
        role: 'Trưởng khoa Khám bệnh',
        note: 'Hợp để theo dõi khám thai từ đầu; 13 năm ở Từ Dũ, giảng viên Phụ sản ĐHYD.',
      },
      {
        title: 'BS.CKI',
        name: 'Vũ Xuân Thọ',
        role: 'Bác sĩ sản phụ khoa',
        note: 'Hơn 40 năm nghề, 30 năm ở Từ Dũ (khoa Sanh, Phụ, Hậu phẫu); nhiều mẹ nhắc tên.',
      },
      {
        title: 'ThS.BS',
        name: 'Trần Thị Thu Lan',
        role: 'Trưởng khoa Cấp cứu',
        note: 'Gắn bó với MêKông từ 2007, từng phụ trách khoa Sanh, Phụ, Sản.',
      },
      {
        title: 'ThS.BS',
        name: 'Lê Thị Phương Uyên',
        role: 'Phó trưởng khoa Khám bệnh',
        note: 'Khám thai; 20 năm nghề, từng làm ở BV ĐHYD cơ sở 4 và Gia Định; hay có tên trong các bài giới thiệu của các mẹ.',
      },
      {
        title: 'ThS.BS',
        name: 'Nguyễn Thị Mỹ Phượng',
        role: 'Bác sĩ sản phụ khoa',
        note: 'Gần 30 năm, từng là trưởng khoa Cấp cứu, Phụ, Khám bệnh.',
      },
      {
        title: 'ThS.BS.CKII',
        name: 'Trần Đại Quân',
        role: 'Trưởng khoa Phụ sản',
        note: 'Hơn 20 năm, từng làm ở BV ĐHYD và BV Nguyễn Tri Phương.',
      },
      {
        title: 'BS.CKII',
        name: 'Đoàn Châu Quỳnh',
        role: 'Bác sĩ sản phụ khoa',
        note: 'Hơn 20 năm, từng là Trưởng khoa Sản BV Quốc tế Vũ Anh; về MêKông từ 2022.',
      },
      {
        title: 'BS.CKI',
        name: 'Trần Anh Tài',
        role: 'Phó trưởng khoa Phụ sản',
        note: 'Bác sĩ trẻ hơn (12 năm), từng làm ở Vinmec, đào tạo tại Từ Dũ.',
      },
    ],
    sources: [
      {
        label: 'Đội ngũ bác sĩ (trang chính thức)',
        url: 'https://benhvienphusanmekong.com/bac-si/',
      },
      {
        label: 'Bảng giá (trang chính thức)',
        url: 'https://benhvienphusanmekong.com/tin-tuc/bang-gia-cap-nhat-ngay-03-06-2022/',
      },
      {
        label: 'Review đi sinh ở MêKông (2020)',
        url: 'https://blog.bluecare.vn/review-di-de-benh-vien-mekong-2/',
      },
      {
        label: 'Giá phòng VIP (trang chính thức)',
        url: 'https://benhvienphusanmekong.com/uncategorized/phong-vip/',
      },
    ],
    checked: '10/2026',
  },
  {
    id: 'tu-du',
    name: 'Bệnh viện Từ Dũ',
    kind: 'Công · tuyến cuối sản phụ khoa phía Nam',
    summary:
      'Bệnh viện sản lớn nhất phía Nam, nhận ca khó từ khắp nơi chuyển về; khoa Sơ sinh nhận hơn 2.000 bé sinh non mỗi năm. Rẻ, giỏi, nhưng đông.',
    address: '284 Cống Quỳnh, P. Bến Thành (Q.1 cũ), TP.HCM',
    phones: [
      { label: 'Đặt lịch', tel: '19002125' },
      { label: 'Bệnh viện', tel: '02839526568' },
      { label: 'Chăm sóc khách hàng', tel: '02838395117' },
    ],
    website: 'https://tudu.com.vn/',
    cost: [
      'Sinh thường khoảng 3–5 triệu nếu không dịch vụ, 8–15 triệu có dịch vụ (BookingCare 08/2026); có gói sanh thường trọn gói (tiêu chuẩn/chuyên gia) và sanh mổ trọn gói — giá đăng dạng ảnh trên web, gọi hỏi.',
      'Muốn chọn bác sĩ đỡ phải đăng ký sanh dịch vụ (phí chọn bác sĩ khoảng 1,5–3 triệu theo hỏi đáp cũ của viện); phòng 2 giường thêm khoảng 1 triệu/ngày.',
    ],
    strengths: [
      'Tuyến cuối: hồi sức sản, truyền máu, phẫu thuật ca khó, NICU mạnh — an tâm nhất cho thai kỳ nguy cơ cao, sinh non, bé có dị tật.',
      'Chi phí thấp, dùng được BHYT.',
    ],
    cautions: [
      'Thường quá tải, chờ lâu; không đăng ký dịch vụ thì bác sĩ trực/nữ hộ sinh đỡ, có thể nằm phòng nhiều giường.',
      'Có phàn nàn về thái độ nhân viên ở khu thường.',
      'Viện không công bố danh sách bác sĩ; nhiều bác sĩ nổi tiếng từng ở Từ Dũ nay đã sang viện tư (MêKông, Tâm Anh, Vinmec, FV).',
    ],
    doctors: [
      {
        title: 'BS.CKII',
        name: 'Trần Ngọc Hải',
        role: 'Giám đốc bệnh viện',
        note: 'Người đứng đầu chuyên môn — tên thường xuất hiện trên báo khi nói về các ca khó.',
      },
      {
        title: 'BS.CKII',
        name: 'Nguyễn Bá Mỹ Ngọc',
        role: 'Trưởng khoa Sanh (chưa xác nhận trên trang chính thức)',
        note: 'Chỉ thấy trên blog của phòng Chỉ đạo tuyến Từ Dũ — hỏi lại khi đăng ký sanh dịch vụ.',
      },
      {
        title: 'BS',
        name: 'Nguyễn Ngọc Yến Oanh',
        role: 'Phó khoa Sản A',
        note: 'Theo báo Tuổi Trẻ 01/2026.',
      },
    ],
    sources: [
      {
        label: 'Bảng giá sanh thường, mổ (trang chính thức)',
        url: 'https://tudu.com.vn/vn/huong-dan-dich-vu/bang-gia/tong-hop-bang-gia-sanh-thuong-mo-lay-thai-dich-vu-tai-benh-vien-tu-du/',
      },
      {
        label: 'Hỏi đáp chọn bác sĩ đỡ sinh',
        url: 'https://tudu.com.vn/vn/khac/chon-bac-si-do-sinh-dv/',
      },
      {
        label: 'BookingCare: review đi sinh (08/2026)',
        url: 'https://bookingcare.vn/cam-nang/sinh-con-o-benh-vien-nao-tot-tphcm-review-di-sinh-thuc-te-p6984.html',
      },
    ],
    checked: '10/2026',
  },
  {
    id: 'hung-vuong',
    name: 'Bệnh viện Hùng Vương',
    kind: 'Công · chuyên khoa sản tuyến cuối',
    summary:
      'Bệnh viện sản công lâu đời ở Chợ Lớn, ít quá tải hơn Từ Dũ một chút; nhiều mẹ quay lại sinh lần hai, lần ba.',
    address: '128 Hồng Bàng (Q.5 cũ), TP.HCM',
    phones: [
      { label: 'Tổng đài', tel: '02838558532' },
      { label: 'Phòng khám chuyên gia', tel: '02839552228' },
    ],
    website: 'https://bvhungvuong.vn/',
    cost: [
      'Tạm ứng khoảng 7 triệu sinh thường (10 triệu dịch vụ), 10 triệu sinh mổ (18 triệu dịch vụ) theo BookingCare 08/2026.',
      'Giảm đau sản khoa khoảng 2 triệu; bảng giá dịch vụ theo yêu cầu mới nhất áp dụng từ 04/2025 (file PDF trên web viện).',
    ],
    strengths: [
      'Có Khoa Hồi sức tích cực sơ sinh và dịch vụ giảm đau sản khoa chính thức.',
      'Chi phí vừa phải, dùng được BHYT; có phòng khám chuyên gia để khám thai với bác sĩ lâu năm.',
    ],
    cautions: [
      'Đông vào mùa cao điểm, hết phòng có thể phải nằm ghép; có mẹ kể chờ sanh rất lâu.',
      'Viện không đăng danh sách bác sĩ; chọn bác sĩ đỡ tùy lịch, hỏi khi khám thai.',
    ],
    doctors: [
      {
        title: 'PGS.TS.BS',
        name: 'Hoàng Thị Diễm Tuyết',
        role: 'Giám đốc bệnh viện',
        note: 'Được bổ nhiệm lại 06/2025.',
      },
      {
        title: 'PGS.TS.BS',
        name: 'Huỳnh Nguyễn Khánh Trang',
        role: 'Trưởng khoa Sản bệnh (bài của viện khoảng 2022 — xác nhận lại)',
        note: 'Trưởng bộ môn Phụ sản ĐH Y khoa Phạm Ngọc Thạch; mạnh về thai kỳ bệnh lý.',
      },
    ],
    sources: [
      {
        label: 'Ban giám đốc (trang chính thức)',
        url: 'https://bvhungvuong.vn/gioi-thieu/dang-uy-ban-giam-doc-1015/',
      },
      {
        label: 'Dịch vụ giảm đau sản khoa',
        url: 'https://bvhungvuong.vn/danh-cho-benh-nhan/dich-vu-giam-dau-san-khoa-1137/',
      },
      {
        label: 'BookingCare: review đi sinh (08/2026)',
        url: 'https://bookingcare.vn/cam-nang/sinh-con-o-benh-vien-nao-tot-tphcm-review-di-sinh-thuc-te-p6984.html',
      },
    ],
    checked: '10/2026',
  },
  {
    id: 'tam-anh',
    name: 'Bệnh viện Đa khoa Tâm Anh TP.HCM',
    kind: 'Tư nhân · đa khoa, có Trung tâm Sản Phụ khoa',
    summary:
      'Cùng phường Tân Sơn Hòa với MêKông (2B Phổ Quang) — phương án dự phòng gần nhất. Phòng kiểu khách sạn, nhiều bác sĩ từ Từ Dũ, Hùng Vương, cả MêKông chuyển sang.',
    address: '2B Phổ Quang, P. Tân Sơn Hòa (Q. Tân Bình cũ), TP.HCM',
    phones: [
      { label: 'Hotline', tel: '02871026789' },
      { label: 'Di động', tel: '0931806858' },
    ],
    website: 'https://tamanhhospital.vn/',
    cost: [
      'Gói thai đơn từ 36 tuần: khoảng 31,4 triệu sinh thường, 35,1 triệu có giảm đau, 36,9 triệu mổ lần đầu.',
      'Gói theo dõi từ 12 tuần: khoảng 41–46,5 triệu; gói VIP 41,5–68,9 triệu (bảng giá 05/2025, viện ghi có điều chỉnh từ 05/2026).',
    ],
    strengths: [
      'Gói trọn gói rõ ràng; da kề da kể cả khi mổ; có Trung tâm Sơ sinh riêng.',
      'Bệnh viện đa khoa: mẹ có bệnh nền (tim, tuyến giáp, tiểu đường) được hội chẩn tại chỗ.',
    ],
    cautions: ['Chi phí cao gấp 2–3 lần MêKông; đông vào giờ cao điểm.'],
    doctors: [
      {
        title: 'BS.CKII',
        name: 'Nguyễn Bá Mỹ Nhi',
        role: 'Giám đốc Trung tâm Sản Phụ khoa',
        note: 'Nguyên Phó Giám đốc chuyên môn BV Từ Dũ; được nhiều mẹ chọn để khám và siêu âm thai.',
      },
      {
        title: 'ThS.BS.CKII',
        name: 'Lê Thanh Hùng',
        role: 'Phó khoa Sản',
        note: 'Gần 30 năm, chuyên thai kỳ nguy cơ cao và chuyển dạ; từng làm ở FV.',
      },
      {
        title: 'BSNT.CKII',
        name: 'Phan Thế Thi',
        role: 'Bác sĩ sản',
        note: 'Từng là Phó khoa Cấp cứu ở MêKông (2013–2022), trước đó ở Từ Dũ — hợp nếu muốn bác sĩ quen “văn hóa” MêKông.',
      },
      {
        title: 'BS.CKII',
        name: 'Nguyễn Ngọc Thoại',
        role: 'Bác sĩ sản',
        note: '12 năm ở Hùng Vương; khám thai, thai nguy cơ cao.',
      },
      {
        title: 'BS.CKII',
        name: 'Hà Nguyễn Quỳnh Hương',
        role: 'Bác sĩ sản',
        note: '17 năm ở Hùng Vương trước khi về Tâm Anh.',
      },
    ],
    sources: [
      {
        label: 'Gói sinh trọn gói (trang chính thức)',
        url: 'https://tamanhhospital.vn/sinh-con-tron-goi/',
      },
      {
        label: 'Chuyên khoa Sản phụ',
        url: 'https://tamanhhospital.vn/chuyen-khoa/san-phu/',
      },
    ],
    checked: '10/2026',
  },
  {
    id: 'dhyd',
    name: 'Bệnh viện Đại học Y Dược TP.HCM',
    kind: 'Công lập tự chủ · đa khoa, khoa Phụ sản',
    summary:
      'Bệnh viện trường, chuyên môn được đánh giá cao, mạnh về chẩn đoán trước sinh. Đội ngũ gốc của MêKông cũng xuất thân từ đây.',
    address:
      '215 Hồng Bàng, P. Chợ Lớn (Q.5 cũ), TP.HCM — khoa Phụ sản lầu 2–4 khu B',
    phones: [
      { label: 'Khoa Phụ sản', tel: '02839525220' },
      { label: 'Bệnh viện', tel: '02838554269' },
    ],
    website: 'https://bvdaihoc.com.vn/',
    cost: [
      'Khoảng 11,5–15 triệu sinh thường, 19,8–20 triệu sinh mổ (BookingCare 08/2026, Mytour); không có trang gói sinh chính thức.',
    ],
    strengths: [
      'Đa khoa tuyến cuối, có giảm đau sản khoa và phòng sanh gia đình.',
      'Hợp khi thai có bất thường cần chẩn đoán, tư vấn trước sinh kỹ.',
    ],
    cautions: [
      'Phòng ốc kém hiện đại hơn viện tư; đông bệnh nhân.',
      'Trang khoa không nhắc tới NICU — hỏi kỹ nếu nguy cơ sinh non.',
    ],
    doctors: [
      {
        title: 'TS.BS',
        name: 'Trần Nhật Thăng',
        role: 'Trưởng khoa Phụ sản',
        note: 'Chuyên chẩn đoán trước sinh, y học bào thai; cũng có lịch tại FV.',
      },
      {
        title: 'ThS.BS',
        name: 'Lê Thị Kiều Dung',
        role: 'Cố vấn chuyên môn, nguyên Trưởng khoa',
      },
      {
        title: 'ThS.BS',
        name: 'Trần Thị Bích Huyền',
        role: 'Bác sĩ sản, khám tại Cơ sở 2',
      },
    ],
    sources: [
      {
        label: 'Khoa Phụ sản (trang chính thức)',
        url: 'https://bvdaihoc.com.vn/chuyen-khoa/khoa-phu-san',
      },
      { label: 'Danh sách bác sĩ', url: 'https://bvdaihoc.com.vn/bac-si' },
    ],
    checked: '10/2026',
  },
  {
    id: 'vinmec',
    name: 'Bệnh viện Vinmec Central Park',
    kind: 'Tư nhân · quốc tế (chuẩn JCI)',
    summary:
      'Bệnh viện quốc tế ở Bình Thạnh cũ, gói sinh trọn gói với phòng đơn khép kín. Đắt, yên tĩnh, dịch vụ chu đáo.',
    address: '720A Điện Biên Phủ, P. Thạnh Mỹ Tây (Q. Bình Thạnh cũ), TP.HCM',
    phones: [{ label: 'Hotline', tel: '02836221166' }],
    website: 'https://www.vinmec.com/',
    cost: [
      'Gói sinh: khoảng 37 triệu sinh thường, 51 triệu mổ lần đầu; gói theo dõi từ 12 tuần: 52 / 65 triệu (bảng giá 06/2025).',
      'Gói sinh thường gồm gây tê ngoài màng cứng nếu có chỉ định; phòng đơn 2 ngày (thường) / 4 ngày (mổ).',
    ],
    strengths: [
      'Quy trình chuẩn quốc tế, phòng đơn, ít chờ; bệnh viện đa khoa nên xử lý được bệnh nền của mẹ.',
    ],
    cautions: [
      'Đắt; chưa thấy thông tin NICU riêng của cơ sở Central Park — hỏi trước nếu nguy cơ sinh non.',
    ],
    doctors: [
      {
        title: 'ThS.BS.CKII',
        name: 'Phan Diễm Đoan Ngọc',
        role: 'Bác sĩ sản',
        note: 'Từng ở Từ Dũ (2015–2021); thai nguy cơ cao, sinh thường và mổ.',
      },
      {
        title: 'BS.CKII',
        name: 'Nguyễn Thị Hương Xuân',
        role: 'Bác sĩ sản',
        note: 'Nguyên giảng viên ĐHYD, bác sĩ BV ĐHYD 10 năm; khám thai, mổ lấy thai.',
      },
      {
        title: 'BS.CKII',
        name: 'Quách Hữu Dương',
        role: 'Bác sĩ sản',
        note: 'Từng ở Từ Dũ và Hùng Vương; về Vinmec từ 2024.',
      },
      {
        title: 'BS.CKII',
        name: 'Nguyễn Thị Minh Tuyết',
        role: 'Bác sĩ sản phụ khoa',
        note: 'Nguyên Trưởng khoa Hậu sản, Trưởng khoa Phụ ở Từ Dũ; thiên về phụ khoa.',
      },
    ],
    sources: [
      {
        label: 'Khoa Sản (trang chính thức)',
        url: 'https://www.vinmec.com/vie/co-so-y-te/khoa-san-phu-khoa-benh-vien-da-khoa-quoc-te-vinmec-central-park-47738-vi-ho-tro-sinh-san',
      },
      {
        label: 'Bảng giá gói sinh (PDF 06/2025)',
        url: 'https://www.vinmec.com/static/uploads/FLYER_BANGGIAKHOASANG_VN_EDIT_2_2f801a0ed5.pdf',
      },
    ],
    checked: '10/2026',
  },
  {
    id: 'fv',
    name: 'Bệnh viện FV',
    kind: 'Tư nhân · quốc tế, khoa sản FV Thomson Maternity',
    summary:
      'Bệnh viện quốc tế lâu đời ở Q.7 cũ, có NICU, làm được sinh dưới nước và sinh thường sau mổ (VBAC).',
    address: '6 Nguyễn Lương Bằng, P. Tân Mỹ (Q.7 cũ), TP.HCM',
    phones: [{ label: 'Tổng đài', tel: '02835113333' }],
    website: 'https://www.fvhospital.com/',
    cost: [
      'Gói Silver: 45 triệu sinh thường (3 đêm), 55 triệu mổ (4 đêm); Gold 56/66 triệu; Diamond 75/85 triệu; Platinum 140/150 triệu.',
      'Mọi gói có gây tê ngoài màng cứng nếu có chỉ định; gói không áp dụng khi dùng bảo hiểm quốc tế.',
    ],
    strengths: [
      'Có NICU và đơn vị chăm sóc sơ sinh tích cực; nhiều chuyên gia thai nguy cơ cao, y học bào thai.',
      'Linh hoạt với kế hoạch sinh (sinh dưới nước, VBAC).',
    ],
    cautions: ['Xa Tân Bình (nhất là giờ cao điểm); đắt nhất trong danh sách.'],
    doctors: [
      {
        title: 'ThS.BS',
        name: 'Võ Triệu Đạt',
        role: 'Trưởng khoa Sản',
        note: 'Ở FV từ 2009, trước đó ở Hùng Vương; làm sinh dưới nước và VBAC.',
      },
      {
        title: 'TS.BS',
        name: 'Mai Thị Công Danh',
        role: 'Bác sĩ cố vấn cao cấp',
        note: 'Gần 30 năm ở Từ Dũ; chuyên thai kỳ nguy cơ cao.',
      },
      {
        title: 'TS.BS',
        name: 'Trần Nhật Thăng',
        role: 'Bác sĩ cố vấn cao cấp',
        note: 'Y học bào thai; đồng thời là Trưởng khoa Phụ sản BV ĐHYD.',
      },
      {
        title: 'BS.CKI',
        name: 'Khúc Minh Thúy',
        role: 'Bác sĩ sản',
        note: 'Cựu trưởng khoa ở Hùng Vương; khám ở phòng khám FV Sài Gòn (Q.1 cũ).',
      },
    ],
    sources: [
      {
        label: 'Gói sinh (trang chính thức)',
        url: 'https://www.fvhospital.com/en/fv-thomson-maternity/delivery-packages/',
      },
      {
        label: 'Bác sĩ sản (Find an Expert)',
        url: 'https://www.fvhospital.com/en/fv-thomson-maternity/find-an-expert/',
      },
    ],
    checked: '10/2026',
  },
  {
    id: 'cih',
    name: 'Bệnh viện Quốc tế City (CIH)',
    kind: 'Tư nhân · đa khoa quốc tế',
    summary:
      'Bệnh viện tư ở Bình Tân cũ, gói sinh giá giữa MêKông và nhóm quốc tế; cho người nhà vào phòng sanh.',
    address: 'Số 3 đường 17A, P. An Lạc (Q. Bình Tân cũ), TP.HCM',
    phones: [
      { label: 'Tổng đài', tel: '19008146' },
      { label: 'Cấp cứu', tel: '02862901155' },
    ],
    website: 'https://cih.com.vn/',
    cost: [
      'Gói sinh thường 29,9 triệu; mổ lần đầu 40,1–43,1 triệu tùy gói (web không ghi ngày, gói gồm gì cần hỏi).',
    ],
    strengths: ['Gói giá rõ ràng; người nhà được vào phòng sanh.'],
    cautions: ['Không thấy thông tin NICU; khá xa Tân Bình.'],
    doctors: [
      {
        title: 'BS.CKII',
        name: 'Trần Thế Lộc',
        role: 'Phó khoa Sản (theo BookingCare)',
      },
      {
        title: 'BS.CKII',
        name: 'Phạm Minh Khôi Nguyên',
        role: 'Bác sĩ sản phụ khoa',
      },
      {
        title: 'TS.BS',
        name: 'Tạ Thị Thanh Thủy',
        role: 'Từng là Giám đốc Y khoa kiêm Trưởng khoa Sản (chưa chắc còn làm ở đây)',
        note: 'Nguyên Giám đốc Y khoa MêKông, từng ở Hùng Vương; hay có tên trong các bài giới thiệu bác sĩ sản — hỏi tổng đài xem còn lịch khám không.',
      },
    ],
    sources: [
      {
        label: 'Gói sinh (trang chính thức)',
        url: 'https://cih.com.vn/goi-kham/goi-sinh-hoa-khai-phu-quy/',
      },
      {
        label: 'Khoa Phụ sản',
        url: 'https://cih.com.vn/chuyen-khoa/khoa-phu-san/',
      },
    ],
    checked: '10/2026',
  },
];

/** Câu hỏi nên hỏi khi chọn viện/bác sĩ — dùng chung cho mọi viện. */
export const HOSPITAL_QUESTIONS: readonly { title: string; items: string[] }[] =
  [
    {
      title: 'Hỏi bệnh viện',
      items: [
        'Gói sinh thường/sinh mổ trọn gói gồm những gì (phòng mấy ngày, thuốc, xét nghiệm, sàng lọc sơ sinh, tiêm cho bé) và phát sinh thường gặp.',
        'Có đăng ký bác sĩ đỡ/mổ riêng không, phí bao nhiêu, bác sĩ không kịp đến thì sao.',
        'Gây tê ngoài màng cứng có 24/7 không, khi nào được tiêm, giá.',
        'Bố có được vào phòng sinh/phòng mổ không; da kề da, kẹp rốn muộn, cho bú giờ đầu có làm thường quy không.',
        'Có khoa sơ sinh/hồi sức sơ sinh (NICU) tại chỗ không, bé sinh non hoặc cần thở máy thì xử lý ở đâu.',
        'Nhận bảo hiểm sức khỏe nào (bảo lãnh trực tiếp hay tự trả rồi đòi lại), có dùng BHYT được không.',
        'Từ nhà tới viện mất bao lâu lúc cao điểm và lúc nửa đêm; cổng cấp cứu sản ở đâu.',
      ],
    },
    {
      title: 'Hỏi bác sĩ',
      items: [
        'Bác sĩ có trực tiếp đỡ/mổ cho sản phụ mình khám không, hay chỉ khám thai.',
        'Quan điểm về sinh thường, khởi phát chuyển dạ, cắt tầng sinh môn, mổ chủ động.',
        'Lúc nào thì nên gọi cho bác sĩ, có số liên lạc ngoài giờ không.',
        'Lịch khám thai và các mốc xét nghiệm bác sĩ muốn làm (so với Lịch khám trong app).',
      ],
    },
    {
      title: 'Cách chọn',
      items: [
        'Chọn viện trước, bác sĩ sau: ca khó lúc nửa đêm phụ thuộc vào cả ê-kíp trực, không chỉ một người.',
        'Thai kỳ có bệnh lý (tiền sản giật, nhau tiền đạo, đa thai, bé có dị tật cần can thiệp) → ưu tiên viện có hồi sức sản và NICU mạnh, hoặc hỏi bác sĩ về kế hoạch chuyển viện.',
        'Đi khám thử 1–2 lần, xem cách bác sĩ giải thích và mình có thấy thoải mái để hỏi không — đó là tiêu chí quan trọng nhất.',
        'Tên bác sĩ ở đây là người hay được các mẹ nhắc tới, không phải bảng xếp hạng; gọi tổng đài để xác nhận lịch khám trước khi đi.',
      ],
    },
  ];

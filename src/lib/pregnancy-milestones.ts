/**
 * Mốc khám / xét nghiệm chuẩn theo tuần thai (spec 009, AC-9). Cửa sổ tuần
 * theo Hướng dẫn quốc gia CSSKSS (Bộ Y tế) + thực hành phổ biến ở bệnh viện
 * sản VN; phần tính trạng thái (đã qua / đang / sắp) ở `pregnancy.ts`.
 *
 * `id` ổn định — lịch hẹn tạo từ mốc lưu `milestoneId` để đối chiếu.
 */
import type { MilestoneWindow } from '~/lib/pregnancy';

export interface Milestone extends MilestoneWindow {
  id: string;
  title: string;
  /** Vì sao cần — một đoạn ngắn. */
  why: string;
  /** Chuẩn bị gì trước khi đi. */
  prep: string;
}

export const MILESTONES: readonly Milestone[] = [
  {
    id: 'first-visit',
    fromWeek: 6,
    toWeek: 10,
    title: 'Khám thai lần đầu + xét nghiệm cơ bản',
    why: 'Xác nhận thai trong tử cung và tim thai, chốt tuổi thai; xét nghiệm máu (nhóm máu, công thức máu, HBsAg, HIV, giang mai, rubella, đường huyết), nước tiểu, đo huyết áp và cân nặng nền.',
    prep: 'Nhớ ngày đầu kỳ kinh cuối, mang theo kết quả khám cũ; hỏi phòng khám có cần nhịn ăn không.',
  },
  {
    id: 'nt-scan',
    fromWeek: 11,
    toWeek: 13,
    title: 'Siêu âm độ mờ da gáy + Double test (hoặc NIPT)',
    why: 'Sàng lọc bất thường nhiễm sắc thể (Down, Edwards, Patau). Cửa sổ 11 tuần 0 ngày → 13 tuần 6 ngày — qua là không đo độ mờ da gáy được nữa.',
    prep: 'Đặt lịch sớm để không lỡ cửa sổ. NIPT (xét nghiệm máu mẹ) làm được từ tuần 10, chính xác hơn Double test.',
  },
  {
    id: 'triple-test',
    fromWeek: 15,
    toWeek: 18,
    title: 'Triple test (nếu lỡ mốc 11–13 tuần)',
    why: 'Sàng lọc dị tật ống thần kinh và nhiễm sắc thể khi chưa làm Double test / NIPT.',
    prep: 'Không cần nhịn ăn; mang kết quả siêu âm gần nhất.',
  },
  {
    id: 'anatomy-scan',
    fromWeek: 18,
    toWeek: 22,
    title: 'Siêu âm hình thái học (4D)',
    why: 'Khảo sát chi tiết tim, não, cột sống, thận, chi, mặt của bé; xem vị trí bánh nhau và lượng nước ối.',
    prep: 'Mất 30–45 phút; ăn nhẹ trước để bé cử động, mặc đồ dễ kéo bụng.',
  },
  {
    id: 'tetanus',
    fromWeek: 20,
    toWeek: 28,
    title: 'Tiêm uốn ván (VAT)',
    why: 'Phòng uốn ván sơ sinh. Mang thai lần đầu: 2 mũi cách nhau ít nhất 1 tháng, mũi 2 trước sinh ít nhất 1 tháng; lần sau thường chỉ cần 1 mũi nhắc.',
    prep: 'Tiêm ở trạm y tế hoặc bệnh viện; hỏi luôn về vắc xin cúm và ho gà (Tdap, tuần 27–36) để bảo vệ bé sơ sinh.',
  },
  {
    id: 'ogtt',
    fromWeek: 24,
    toWeek: 28,
    title: 'Tầm soát tiểu đường thai kỳ (OGTT 75 g)',
    why: 'Phát hiện đái tháo đường thai kỳ để điều chỉnh ăn uống kịp thời, tránh bé quá to và biến chứng lúc sinh.',
    prep: 'Nhịn ăn 8–12 tiếng, uống 75 g glucose rồi lấy máu 3 lần trong 2 tiếng — đi sáng sớm, mang sách và đồ ăn nhẹ dùng sau khi xong.',
  },
  {
    id: 'growth-scan',
    fromWeek: 30,
    toWeek: 32,
    title: 'Siêu âm tăng trưởng + ngôi thai',
    why: 'Ước cân nặng, nước ối, bánh nhau, ngôi thai; Doppler động mạch nếu bé nhỏ hoặc mẹ có huyết áp cao.',
    prep: 'Bắt đầu bàn với bác sĩ về nơi sinh, sinh thường hay mổ, và kế hoạch sinh.',
  },
  {
    id: 'gbs',
    fromWeek: 35,
    toWeek: 37,
    title: 'Xét nghiệm liên cầu khuẩn nhóm B (GBS)',
    why: 'Mẹ dương tính sẽ được truyền kháng sinh lúc chuyển dạ để bé không nhiễm khuẩn sơ sinh.',
    prep: 'Phết âm đạo – trực tràng, nhanh và không đau; không cần chuẩn bị gì.',
  },
  {
    id: 'weekly',
    fromWeek: 36,
    toWeek: 42,
    title: 'Khám hàng tuần + đo tim thai (NST)',
    why: 'Cuối thai kỳ theo dõi sát huyết áp, nước ối, ngôi thai, cử động thai và dấu hiệu chuyển dạ; quá ngày dự sinh thì tần suất dày hơn.',
    prep: 'Để sẵn giỏ đồ đi sinh trong xe từ tuần 36; nhớ mang sổ khám mỗi lần.',
  },
];

/** Mốc rơi vào tuần `week` (cửa sổ bao gồm hai đầu). */
export function milestonesForWeek(week: number): Milestone[] {
  return MILESTONES.filter((m) => week >= m.fromWeek && week <= m.toWeek);
}

export function milestoneById(id: string): Milestone | undefined {
  return MILESTONES.find((m) => m.id === id);
}

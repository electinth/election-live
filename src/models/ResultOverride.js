import _ from "lodash"
import produce from "immer"
// Data for analysis based on https://docs.google.com/spreadsheets/d/1nWKaLVZ1ORRt4ZxpM0OjaNi0-87T_q4N4M22_yXQkyg/edit#gid=2107804974
// Checked with https://www.facebook.com/Pr.Ect.Thailand/posts/1249405225217547

/**
 * Activate data override only total vote count is more than this threshold.
 */
const resultOverrideActivationThreshould = 33353799

/**
 * Actual override data.
 *
 * Note that the `score` is the latest score we have.
 */
const resultOverrideData = {
  // สมุทรสาคร เขต 3 'ชาติไทยพัฒนา' => 'พลังประชารัฐ'
  // https://www.facebook.com/Pr.Ect.Thailand/photos/pcb.1249405225217547/1249437881880948/?type=3&theater
  "74-3": {
    no: 1,
    partyId: 83,
    title: "นางสาว",
    firstName: "จอมขวัญ",
    lastName: "กลับบ้านเกาะ",
    score: 21506,
  },
  // กรุงเทพมหานคร เขต 5 'พลังประชารัฐ' => 'เพื่อไทย'
  // https://www.facebook.com/Pr.Ect.Thailand/photos/pcb.1249405225217547/1249437881880948/?type=3&theater
  "10-5": {
    no: 13,
    partyId: 8,
    title: "นาย",
    firstName: "ประเดิมชัย",
    lastName: "บุญช่วยเหลือ",
    score: 26416,
  },
  // กรุงเทพมหานคร เขต 28 'พลังประชารัฐ' => 'อนาคตใหม่'
  // https://www.facebook.com/Pr.Ect.Thailand/photos/pcb.1249405225217547/1249437898547613/?type=3&theater
  "10-28": {
    no: 9,
    partyId: 68,
    title: "นาย",
    firstName: "ณัฐพงษ์",
    lastName: "เรืองปัญญาวุฒิ",
    score: 23262,
  },
  // ประจวบคีรีขันธ์ เขต 2 'ประชาธิปัตย์' => 'เพื่อไทย'
  // https://www.facebook.com/Pr.Ect.Thailand/photos/pcb.1249405225217547/1249437965214273/?type=3&theater
  "77-2": {
    no: 6,
    partyId: 8,
    title: "นาย",
    firstName: "พรเทพ",
    lastName: "วิสุทธิ์วัฒนศักดิ์",
    score: 30872,
  },
}

/**
 * Does the actual overriding.
 * @param {ElectionDataSource.SummaryJSON} summary
 */
export function performOverrideOnSummaryJSON(summary) {
  if (
    _.sum(_.values(summary.partyScoreMap)) < resultOverrideActivationThreshould
  )
    return summary
  return produce(summary, draft => {
    _.forOwn(resultOverrideData, (value, key) => {
      const [provinceId, zoneNo] = key.split("-")
      draft.zoneWinningCandidateMap[provinceId][zoneNo] = value
    })
  })
}

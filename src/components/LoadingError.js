import React from "react"
import UndesirableState from "./UndesirableState"

export default function LoadingError() {
  return (
    <UndesirableState heading={<span>กำลังรอข้อมูลจากกกต.</span>}>
      ลองโหลดหน้านี้อีกครัั้ง
    </UndesirableState>
  )
}

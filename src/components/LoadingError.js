import React from "react"
import UndesirableState from "./UndesirableState"

export default function LoadingError() {
  return (
    <UndesirableState
      heading={
        <span>
          มีข้อผิดพลาด
          <br />
          ในการโหลดข้อมูล
        </span>
      }
    >
      ลองโหลดหน้านี้อีกครัั้ง
    </UndesirableState>
  )
}

/**
 * 검색어로 주소 리스트 필터링
 */
export function filterAddressList(addresses: string[], keyword: string): string[] {
  if (!keyword.trim()) {
    return []
  }

  return addresses.filter(address => {
    return address.includes(keyword.trim())
  })
}

/**
 * 주소 문자열에서 마지막 depth 추출
 *
 * @param address - 주소 문자열 (예: "서울특별시-종로구-청운동")
 * @returns 마지막 depth (예: "청운동")
 */
export function getLastDepthAddress(address: string): string {
  const parts = address.split(' ')
  return parts[parts.length - 1]
}

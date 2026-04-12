export type AddressResponse = {
  documents: {
    region_type: 'B' | 'H' // B: 법정동, H: 행정동
    address_name: string
    region_1depth_name: string
    region_2depth_name: string
    region_3depth_name: string
    region_4depth_name: string
    x: number // longitude
    y: number // latitude
  }[]
}

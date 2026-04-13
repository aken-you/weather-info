import koreaDistrictsData from '../../../../korea-districts.json'

export const koreaAddressList = koreaDistrictsData.koreaDistricts.map(address => address.replaceAll('-', ' '))

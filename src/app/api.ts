const RAKUTEN_API_SIMPLE_HOTEL_SEARCH_URL =
  "https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426";

const RAKUTEN_API_ADDRESS_CODE_URL =
  "https://app.rakuten.co.jp/services/api/Travel/GetAreaClass/20131024";

const RAKUTEN_APP_ID = process.env.NEXT_PUBLIC_RAKUTEN_APP_ID;
const RAKUTEN_AF_ID = process.env.NEXT_PUBLIC_RAKUTEN_AF_ID;

// param先頭に?,&は不要
export async function fetchRTravelApi(param: string) {
  return fetch(
    `${RAKUTEN_API_SIMPLE_HOTEL_SEARCH_URL}?applicationId=${RAKUTEN_APP_ID}&${param}`
  );
}
// APIとして用意はするが、基本的にローカルデータ読み込んだ方がコスパ良い
// クソデカデータが飛んでくる
export async function fetchRTravelAddressCodeApi(param: string) {
  return fetch(
    `${RAKUTEN_API_ADDRESS_CODE_URL}?applicationId=${RAKUTEN_APP_ID}&${param}`
  );
}

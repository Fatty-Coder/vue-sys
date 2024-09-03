interface Weather {
  shidu: string;
  pm25: number;
  quality: string;
  wendu: string;
}

//export type UserInfoResponseData = ApiResponseData<{ username: string; roles: string[] }>
export type WeatherResponseData = ApiResponseData<Weather>;

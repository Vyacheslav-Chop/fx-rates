import axios from 'axios';

type UserInfoProps = {
  latitude: number;
  longitude: number;
};

type UserInfoRes = {
  results: Array<{
    annotations: {
      currency: {
        iso_code: string;
      };
    };
  }>;
};

export const getUserInfo = async ({ latitude, longitude }: UserInfoProps): Promise<UserInfoRes> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
  const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}`;

  const { data } = await axios.get<UserInfoRes>(urlPosition, {
    params: {
      key: apiKey,
      language: 'en',
    },
  });

  return data;
};



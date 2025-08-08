import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_LAYER_API_KEY;

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: { apikey: apiKey ?? '' },
});

type ExchangeResult = {
  from: string;
  to: string;
  amount: number;
  rate: number;
  result: number;
};

type ExchangeResponce = {
  info: {
    rate: number;
  };
  query: {
    amount: number;
    from: string;
    to: string;
  };
  result: number;
};

type Credentials = {
  amount: string;
  from: string;
  to: string;
};

export const exchangeCurrency = async (credentials: Credentials): Promise<ExchangeResult> => {
  const {
    data: { query, info, result },
  } = await instance.get<ExchangeResponce>('/convert', {
    params: credentials,
  });

  return { ...query, rate: info.rate, result };
};

type LatestRatesRes = {
  rates: Record<string, number>;
};

export const latestRates = async (baseCurrency: string): Promise<[string, number][]> => {
  const { data } = await instance.get<LatestRatesRes>(`/latest?symbols&base=${baseCurrency}`);

  return Object.entries(data.rates);
};

import { useEffect, useState } from "react";
import axios from "axios";

type SheetData = {
  [key: string]: string | number;
};

const API_URL = "https://script.google.com/macros/s/AKfycbyVDQnlu9uHkVa8IV_oOwAfNoI_zA2Nih5FiwlJEZVJWkDLzAV3RZMHfN3zcDxSx1-1/exec";

export const useGoogleSheet = () => {
  const [data, setData] = useState<SheetData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<SheetData[]>(API_URL, {
          headers: {
            'Accept': 'application/json',
          },
          transformResponse: [(data) => {
            try {
              return JSON.parse(data);
            } catch (e) {
              console.error(e);
              return data;
            }
          }]
        });
        
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error(response.data);
          setError(response.data);
        }
      } catch (err) {
        console.error(err);
        setError(err as string);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

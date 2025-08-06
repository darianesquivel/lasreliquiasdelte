import { useEffect, useState } from "react";
import axios from "axios";

type SheetData = {
  [key: string]: string | number;
};

// URL base sin el parámetro ?sheet=
const BASE_API_URL = "https://script.google.com/macros/s/AKfycbyVDQnlu9uHkVa8IV_oOwAfNoI_zA2Nih5FiwlJEZVJWkDLzAV3RZMHfN3zcDxSx1-1/exec";

// Hook que recibe el nombre de la solapa como argumento
export const useGoogleSheet = (sheetName: string = "Hoja1") => {

  const [data, setData] = useState<SheetData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `${BASE_API_URL}?sheet=${encodeURIComponent(sheetName)}`;
        console.log("url", url);
        const response = await axios.get<SheetData[]>(url, {
          headers: {
            'Accept': 'application/json',
          },
          transformResponse: [(data) => {
            try {
              return JSON.parse(data);
            } catch (e) {
              console.error("Error parsing response:", e);
              return data;
            }
          }]
        });

        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setError("Formato inesperado de los datos");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err as string);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sheetName]);

  return { data, loading, error };
};

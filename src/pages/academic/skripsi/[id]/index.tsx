import React, {useEffect, useState} from 'react'
import api from "@/configs/axios-interceptors";
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter();
  const [path, setPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [skripsi, setSkripsi] = useState<any>({});
  
  const getSkripsi = async (id: any) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/skripsi/${id}`);
      if (response.status === 200) {
        console.log("Skripsi", response.data);
        setSkripsi(response.data);
        setPath(response.data.scan_skripsi.url);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (router.isReady) {
      getSkripsi(router.query.id);
    }
  }, [router.isReady]);
  
  return <iframe src={path} width="100%" height="720px" />
}

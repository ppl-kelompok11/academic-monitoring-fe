import React, {useEffect, useState} from 'react'
import api from "@/configs/axios-interceptors";
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter();
  const [path, setPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [khs, setKhs] = useState<any>({});
  
  const getKhs = async (id: any) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/khs/${id}`);
      if (response.status === 200) {
        console.log("KHS", response.data);
        setKhs(response.data);
        setPath(response.data.scan_khs.url);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (router.isReady) {
      getKhs(router.query.id);
    }
  }, [router.isReady]);
  
  return <iframe src={path} width="100%" height="720px" />
}

import React, {useEffect, useState} from 'react'
import api from "@/configs/axios-interceptors";
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter();
  const [path, setPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [irs, setIrs] = useState<any>({});
  
  const getIrs = async (id: any) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/irs/${id}`);
      if (response.status === 200) {
        console.log("IRS", response.data);
        setIrs(response.data);
        setPath(response.data.scan_irs.url);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (router.isReady) {
      getIrs(router.query.id);
    }
  }, [router.isReady]);
  
  return <iframe src={path} width="100%" height="720px" />
}

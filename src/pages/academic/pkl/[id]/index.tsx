import React, {useEffect, useState} from 'react'
import api from "@/configs/axios-interceptors";
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter();
  const [path, setPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pkl, setPkl] = useState<any>({});
  
  const getPkl = async (id: any) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/pkl/${id}`);
      if (response.status === 200) {
        console.log("PKL", response.data);
        setPkl(response.data);
        setPath(response.data.scan_pkl.url);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (router.isReady) {
      getPkl(router.query.id);
    }
  }, [router.isReady]);
  
  return <iframe src={path} width="100%" height="720px" />
}

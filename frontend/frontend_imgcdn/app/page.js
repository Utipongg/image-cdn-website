import Image from "next/image";
import axios from "axios";

export async function uploadimg(){
  const res = await axios.post('http://127.0.0.1:8000/api/uploadimg/', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
  });
}


export default function Home() {
  return (
    <>
    <a>dfsfg</a>
    </>
  );
}

import Head from "next/head";
import { useQuery } from "react-query";
import Axios from "axios";

export default function Home() {
  function fetchMembers() {
    Axios.get("http://localhost:3000/api/getMembers").then((res) => {
      return res;
    });
  }

  const { data } = useQuery("members", fetchMembers);

  return (
    <>
      <Head>
        <title>Pollls</title>
      </Head>

      <body>{data}</body>
    </>
  );
}

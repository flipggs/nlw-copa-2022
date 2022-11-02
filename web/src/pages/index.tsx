import { api } from "../lib/api"

interface HomeProps {
  count: number;
}

export default function Home({ count }: HomeProps) {
  return (
    <h1>{count}</h1>
  )
}

export const getServerSideProps = async () => {
  const poolsCount = await api.get('/pools/count')
  return {
    props: {
      count: poolsCount.data.count
    }
  }
}
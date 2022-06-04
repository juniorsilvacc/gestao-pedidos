// Utils
import { SSRAuth } from '../../utils/SSRAuth'

export default function dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export const getServerSideProps = SSRAuth(async (context) => {
  return {
    props: {}
  }
})

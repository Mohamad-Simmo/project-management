import { gql, useQuery } from '@apollo/client';

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

function Demo() {
  const { data } = useQuery(GET_CLIENTS);

  console.log(data);

  return <div>Demo</div>;
}
export default Demo;

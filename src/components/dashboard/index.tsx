import { RouteComponentProps } from "react-router-dom";

const Dashboard = ({ match }: RouteComponentProps) => {
  return <p>{match.path}</p>;
};

export default Dashboard;

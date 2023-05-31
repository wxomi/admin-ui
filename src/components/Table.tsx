import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import Member from "../interfaces/Member";
import Row from "./Row";

interface TableProps {
  data: Array<Member>;
  selectAllRows: () => void;
}

const Table: React.FC<TableProps> = ({ data, selectAllRows }) => {
  const contextValue = useContext(AppContext);
  if (contextValue === null) {
    return <div>Loading...</div>;
  }
  const { selectedRows } = contextValue;
  return (
    <table id="members">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectedRows.length === 10}
              onClick={selectAllRows}
            />
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((member: Member) => (
          <Row key={member.id} member={member} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;

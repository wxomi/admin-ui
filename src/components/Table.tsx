import Member from "../interfaces/Member";
import Row from "./Row";

interface TableProps {
  data: Array<Member>;
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <table id="members">
      <thead>
        <tr>
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

import { FC } from "react";
import Member from "../interfaces/Member";

interface TableProps {
  data: Array<Member>;
  onDelete: (id: number) => void;
  editRowId: number;
  setEditRowId: React.Dispatch<React.SetStateAction<number>>;
  setFilteredMembers: (members: Array<Member>) => void;
}

const Table: FC<TableProps> = ({
  data,
  onDelete,
  editRowId,
  setEditRowId,
  setFilteredMembers,
}) => {
  const handleNameChange = (id: number, name: string) => {
    const index = data.findIndex((member) => member.id === id);
    const member = data[index];
    const updatedMember = { ...member, name };
    const updatedData = [
      ...data.slice(0, index),
      updatedMember,
      ...data.slice(index + 1),
    ];
    setFilteredMembers(updatedData);
  };
  const handleEmailChange = (id: number, email: string) => {
    const index = data.findIndex((member) => member.id === id);
    const member = data[index];
    const updatedMember = { ...member, email };
    const updatedData = [
      ...data.slice(0, index),
      updatedMember,
      ...data.slice(index + 1),
    ];
    setFilteredMembers(updatedData);
  };
  const handleRoleChange = (id: number, role: string) => {
    const index = data.findIndex((member) => member.id === id);
    const member = data[index];
    const updatedMember = { ...member, role };
    const updatedData = [
      ...data.slice(0, index),
      updatedMember,
      ...data.slice(index + 1),
    ];
    setFilteredMembers(updatedData);
  };

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
        {data.map((member) => (
          <tr key={member.id}>
            <td>{member.id}</td>
            <td>
              {editRowId === member.id ? (
                <input
                  type="text"
                  value={member.name}
                  onChange={(event) =>
                    handleNameChange(member.id, event.target.value)
                  }
                />
              ) : (
                member.name
              )}
            </td>
            <td>
              {editRowId === member.id ? (
                <input
                  type="text"
                  value={member.email}
                  onChange={(event) =>
                    handleEmailChange(member.id, event.target.value)
                  }
                />
              ) : (
                member.email
              )}
            </td>
            <td>
              {editRowId === member.id ? (
                <input
                  type="text"
                  value={member.role}
                  onChange={(event) =>
                    handleRoleChange(member.id, event.target.value)
                  }
                />
              ) : (
                member.role
              )}
            </td>
            <td>
              {editRowId === member.id ? (
                <button onClick={() => setEditRowId(-1)}>Save</button>
              ) : (
                <button onClick={() => setEditRowId(member.id)}>Edit</button>
              )}
              <button onClick={() => onDelete(member.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

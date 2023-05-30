import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import Member from "../interfaces/Member";

interface RowProps {
  member: Member;
}

const Row: React.FC<RowProps> = ({ member }) => {
  const [name, setName] = useState<string>(member.name);
  const [email, setEmail] = useState<string>(member.email);
  const [role, setRole] = useState<string>(member.role);

  const contextValue = useContext(AppContext);
  if (contextValue === null) {
    return <div>Loading...</div>;
  }

  const { editRowId, setEditRowId, setMembers, handleDelete } = contextValue;

  const handleNameChange = (name: string) => {
    setName(name);
  };

  const handleEmailChange = (email: string) => {
    setEmail(email);
  };

  const handleRoleChange = (role: string) => {
    setRole(role);
  };

  const handleSave = () => {
    setEditRowId(-1);

    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === editRowId ? { ...member, name, email, role } : member
      )
    );
  };

  return (
    <tr key={member.id}>
      <td>{member.id}</td>
      <td>
        {editRowId === member.id ? (
          <input
            type="text"
            value={name}
            onChange={(event) => handleNameChange(event.target.value)}
          />
        ) : (
          member.name
        )}
      </td>
      <td>
        {editRowId === member.id ? (
          <input
            type="text"
            value={email}
            onChange={(event) => handleEmailChange(event.target.value)}
          />
        ) : (
          member.email
        )}
      </td>
      <td>
        {editRowId === member.id ? (
          <input
            type="text"
            value={role}
            onChange={(event) => handleRoleChange(event.target.value)}
          />
        ) : (
          member.role
        )}
      </td>
      <td>
        {editRowId === member.id ? (
          <button onClick={() => handleSave()}>Save</button>
        ) : (
          <button onClick={() => setEditRowId(member.id)}>Edit</button>
        )}
        <button onClick={() => handleDelete(member.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Row;

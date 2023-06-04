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

  const {
    editRowId,
    setEditRowId,
    setMembers,
    handleDelete,
    setSelectedRows,
    searchTerm,
    setfilteredMembers,
    selectedRows,
    members,
  } = contextValue;

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
    const editMember = { ...member, name, email, role };
    const editedMembers = members.map((member) =>
      member.id === editRowId ? editMember : member
    );

    setMembers(editedMembers);

    setfilteredMembers(
      editedMembers.filter((member) => {
        const { id, name, email, role } = member;
        return (
          id.toString().includes(searchTerm) ||
          name.toLowerCase().includes(searchTerm) ||
          email.toLowerCase().includes(searchTerm) ||
          role.toLowerCase().includes(searchTerm)
        );
      })
    );
  };

  return (
    <tr key={member.id}>
      <td>
        <input
          type="checkbox"
          checked={selectedRows.includes(member.id)}
          onClick={() => {
            setSelectedRows((prevSelectedRows) => {
              if (prevSelectedRows.includes(member.id)) {
                return prevSelectedRows.filter((id) => id !== member.id);
              } else {
                return [...prevSelectedRows, member.id];
              }
            });
          }}
        />
      </td>
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
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={() => setEditRowId(member.id)}>Edit</button>
        )}
        <button onClick={() => handleDelete(member.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Row;

import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import SearchBar from "../components/SearchBar";

interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
}

const AdminPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [members, setMembers] = useState<Array<Member>>([]);
  const [filteredMembers, setfilteredMembers] = useState<Array<Member>>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    ApiService.getMembers()
      .then((members) => {
        console.log(members);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredData = members.filter((member) => {
      const { id, name, email, role } = member;
      return (
        id.toString().includes(searchTerm) ||
        name.toLowerCase().includes(searchTerm) ||
        email.toLowerCase().includes(searchTerm) ||
        role.toLowerCase().includes(searchTerm)
      );
    });

    setfilteredMembers(filteredData);
    setCurrentPage(1);
  };

  return (
    <div>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
    </div>
  );
};

export default AdminPage;

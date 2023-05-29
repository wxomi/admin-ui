import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import Member from "../interfaces/Member";

const AdminPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [members, setMembers] = useState<Array<Member>>([]);
  const [filteredMembers, setfilteredMembers] = useState<Array<Member>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editRowId, setEditRowId] = useState(-1);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    ApiService.getMembers()
      .then((members) => {
        console.log(members);
        setMembers(members);
        setfilteredMembers(members);
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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (id: number) => {
    filteredMembers.filter((member) => member.id !== id);
  };

  const handleEdit = (id: number) => {
    const index = filteredMembers.findIndex((member) => member.id === id);
  };

  const renderTable = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const currentData = filteredMembers.slice(startIndex, endIndex);

    return (
      <Table
        data={currentData}
        onDelete={handleDelete}
        setFilteredMembers={setfilteredMembers}
        editRowId={editRowId}
        setEditRowId={setEditRowId}
      />
    );
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredMembers.length / 10);

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    );
  };

  return (
    <div>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      {renderTable()}
      {renderPagination()}
    </div>
  );
};

export default AdminPage;

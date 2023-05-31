import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import { AppContext } from "../contexts/AppContext";
import Member from "../interfaces/Member";
import ApiService from "../services/ApiService";

const AdminPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [members, setMembers] = useState<Array<Member>>([]);
  const [filteredMembers, setfilteredMembers] = useState<Array<Member>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Array<number>>([]);
  const [editRowId, setEditRowId] = useState<number>(-1);

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
    const filteredData: Member[] = filteredMembers.filter(
      (member) => member.id !== id
    );
    setfilteredMembers(filteredData);
  };

  const deleteSelected = () => {
    const filteredData = filteredMembers.filter(
      (member) => !selectedRows.includes(member.id)
    );

    setfilteredMembers(filteredData);

    setSelectedRows([]);
  };

  const selectAllOfThatPage = () => {
    if (selectedRows.length === 10) {
      setSelectedRows([]);
      return;
    }
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const currentData = filteredMembers.slice(startIndex, endIndex);
    const currentIds = currentData.map((member) => member.id);
    setSelectedRows(currentIds);
  };

  const renderTable = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const currentData = filteredMembers.slice(startIndex, endIndex);

    return (
      <AppContext.Provider
        value={{
          editRowId,
          setEditRowId,
          setMembers,
          members,
          handleDelete,
          setSelectedRows,
          setfilteredMembers,
          searchTerm,
          selectedRows,
        }}
      >
        <Table data={currentData} selectAllRows={selectAllOfThatPage} />
      </AppContext.Provider>
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
      <button onClick={deleteSelected}>Delete Selected</button>
    </div>
  );
};

export default AdminPage;

import { useEffect, useState } from "react";
import Pagination from "./Components/Paginations";
import "./App.css";
import { Table } from "./Components/Table";
let PageSize = 10;
function App() {
  const [listData, setListData] = useState([]);
  const [allData, setAllDta] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((res) => {
        let resData = res?.map((ele) => ({ ...ele, checked: false }));
        setListData(resData?.slice(0, 10));
        setTotalData(resData);
        setAllDta(res);
      });
  }, []);

  const pageHandler = (page) => {
    const firstPageIndex = (page - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    setCurrentPage(page);
    setListData(totalData.slice(firstPageIndex, lastPageIndex));
  };
  const onChange = (e) => {
    setCurrentPage(1);
    let val = e.target.value;
    let filterData = allData.filter(
      (ele) =>
        ele.name.includes(val) ||
        ele.email.includes(val) ||
        ele.role.includes(val)
    );
    setTotalData(filterData);
    setListData(filterData?.slice(0, 10));
  };

  const deleteRowsHandler = ({ type, key }) => {
    let page = currentPage;
    if (listData?.length === 1) {
      page = currentPage - 1;
      setCurrentPage(page);
    }
    let ans = [];
    if (type === "checkbox") {
      ans = totalData?.filter((ele) => ele?.checked !== true);
    } else {
      ans = totalData?.filter((ele) => ele?.id !== key);
    }
    const firstPageIndex = (page - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    setTotalData(ans);
    setAllDta(ans);
    setListData(ans?.slice(firstPageIndex, lastPageIndex));
  };
  return (
    <div className="App">
      <input
        placeholder="Search by name,email or role"
        className="filter_input"
        onChange={onChange}
      />

      <Table
        setTotalData={setTotalData}
        setListData={setListData}
        listData={listData}
        deleteRowsHandler={deleteRowsHandler}
        currentPage={currentPage}
      />

      <div className="footer">
        <button
          className="delete_button"
          onClick={() => deleteRowsHandler({ type: "checkbox" })}
        >
          Delete Selected Rows
        </button>

        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={totalData.length}
          pageSize={10}
          onPageChange={(page) => pageHandler(page)}
        />
      </div>
    </div>
  );
}

export default App;

import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
let PageSize=10;
export const Table = ({setListData,setTotalData,listData,deleteRowsHandler,currentPage}) => {
  return (
    <table className="table_container">
      <tr>
        <div className="table_checkbox">
          <input
            type="checkbox"
            onChange={(e) => {
              let isChecked = e.target.checked;
              const firstPageIndex = (currentPage - 1) * PageSize;
              const lastPageIndex = firstPageIndex + PageSize;
              setTotalData((prev) => {
                let arr = prev?.map((ele, idx) => {
                  if (idx >= firstPageIndex && idx < lastPageIndex) {
                    return { ...ele, checked: isChecked };
                  } else {
                    return { ...ele };
                  }
                });
                return arr;
              });
              setListData((prev) =>
                prev?.map((ele) => ({ ...ele, checked: isChecked }))
              );
            }}
          />
        </div>

        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
      {listData?.length > 0 ? (
        listData?.map((res, index) => {
          return (
            <tr className={`tabel_row ${res?.checked && "active_row"}`}>
              <div className="table_checkbox">
                <input
                  type="checkbox"
                  checked={res?.checked}
                  onChange={(e) => {
                    setListData((prev) =>
                      prev?.map((ele, i) => {
                        if (i === index) {
                          return { ...ele, checked: e.target.checked };
                        } else return ele;
                      })
                    );
                    setTotalData((prev) =>
                      prev?.map((ele, i) => {
                        if (i === index) {
                          return { ...ele, checked: e.target.checked };
                        } else return ele;
                      })
                    );
                  }}
                />
              </div>
              <td>{res?.name}</td>
              <td>{res?.email}</td>
              <td>{res?.role}</td>
              <td className="action_row">
                <AiOutlineDelete
                  color="red"
                  cursor="pointer"
                  onClick={() => {
                    deleteRowsHandler({ key: res?.id });
                  }}
                />
              </td>
            </tr>
          );
        })
      ) : (
        <div className="no_data_text">No Data Found</div>
      )}
    </table>
  );
};

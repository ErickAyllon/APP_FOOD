import React from "react";

function Paginated({ recipesPage, allRecipes, paged }) {
  const pages = [];
  for (let i = 1; i <= Math.ceil(allRecipes / recipesPage); i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.lenght <= 1 ? (
        <></>
      ) : (
        <nav className="pagination">
          <ul className="pages">
            {pages?.map((p) => (
              <li className="page" key={p}>
                <button
                  className="pageBtn"
                  onClick={() => paged(p)}
                  style={{ width: "30px" }}
                >
                  {p}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Paginated;

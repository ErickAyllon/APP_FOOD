import React from "react";
import styles from "../Components/paginated.module.css";

function Paginated({ recipesPage, allRecipes, paged }) {
  const pages = [];
  for (let i = 1; i <= Math.ceil(allRecipes / recipesPage); i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.length <= 1 ? (
        <></>
      ) : (
        <nav className={styles.pagination}>
          <div className={styles.pages}>
            {pages?.map((p) => (
              <span className="page" key={p}>
                <button
                  className={styles.pageBtn}
                  onClick={() => paged(p)}
                  style={{ width: "30px" }}
                >
                  {p}
                </button>
              </span>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}

export default Paginated;

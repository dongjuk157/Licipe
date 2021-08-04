import React from "react";

function RecipeEvaluation({ menu }) {
  return (
    <div className="sidebar-item">
      <p>{menu.name}</p>
    </div>
  );
}

export default RecipeEvaluation;
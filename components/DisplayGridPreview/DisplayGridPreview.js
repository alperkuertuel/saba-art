import { useState } from "react";

export default function DisplayGrid({ handleSetGridRepeatMinsize }) {
  return (
    <>
      <button onClick={() => handleSetGridRepeatMinsize("50px")}>Grid Small</button>
      <button onClick={() => handleSetGridRepeatMinsize("100px")}>Grid Middle</button>
      <button onClick={() => handleSetGridRepeatMinsize("280px")}>Grid Big</button>
    </>
  );
}

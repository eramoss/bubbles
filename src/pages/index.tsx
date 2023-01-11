import Head from "next/head";
import React from "react";
import { useCreateDiv } from "../hooks/usoCreateDiv";

export default function Home() {
  const { DivList, getCoordinatesClick, redo, undo } = useCreateDiv();

  return (
    <>
      <Head>
        <title>Interview test</title>
        <meta
          name="description"
          content="test for a interview. Click in this page and see the bubbles"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="bg-slate-800 w-screen h-screen">
        <button
          data-testid="test"
          onClick={(e) => {
            getCoordinatesClick(e);
          }}
          className="w-full h-full bg-transparent z-10 cursor-default "
        ></button>
      </main>
      <div className=" fixed top-2 right-2 flex gap-1">
        <button onClick={undo} className="bg-white px-6 p-3 rounded ">
          undo
        </button>
        <button onClick={redo} className="bg-white px-6 p-3 rounded">
          redo
        </button>
      </div>

      {DivList}
    </>
  );
}

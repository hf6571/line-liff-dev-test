import React, { useState, useEffect } from "react";
import type { liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage<{ liff: typeof liff | null; liffError: string | null }> = ({
  liff,
  liffError
}) => {
  const [inputText, setInputText] = useState("init string");

  useEffect(() => {
    // 初期化が完了したら
    if (liff?.initPlugins) {
      handleGetProfileButtonClick();
    }
  }, [liff]);

  const handleGetProfileButtonClick = async () => {
    try {
      if (liff?.initPlugins) {
        const profile = await liff.getProfile();
        const userId = profile.userId;
        setInputText(userId);
      } else {
        // LIFF が未初期化の場合
        setInputText("LIFF is not initialized");
      }
    } catch (error) {
      // API 呼び出し中にエラーが発生した場合
      setInputText("Error occurred: " + error);
    }
  };

  const handleGetTokenButtonClick = async () => {
    try {
      if (liff?.initPlugins) {
        const token = await liff.getIDToken();
        if (token) {
          setInputText(token);
        } else {
          setInputText("Token is null");
        }
      } else {
        // LIFF が未初期化の場合
        setInputText("LIFF is not initialized");
      }
    } catch (error) {
      // API 呼び出し中にエラーが発生した場合
      setInputText("Error occurred: " + error);
    }
  };

  return (
    <div>
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>create-liff-app test2</h1>
        {liff && <p>LIFF init succeeded.</p>}
        {liffError && (
          <>
            <p>LIFF init failed.</p>
            <p>
              <code>{liffError}</code>
            </p>
          </>
        )}
        <label>入力欄：</label>
        <input id="input" type="text" value={inputText}></input>
        <button onClick={handleGetProfileButtonClick}>GetProfile</button>
        <button onClick={handleGetTokenButtonClick}>GetToken</button>
      </main>
    </div>
  );
};

export default Home;

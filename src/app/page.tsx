"use client";
import InputForm from "@/app/InputForm";
//import InputHistory from "@/app/InputHistory";
//import ChartArea from "@/app/ChartArea";
//import addressData from "./address.json";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { Address, createAddressMap, Top } from "./util";

export default function Home() {
  const [root, setRoot] = useState<Top>({ largeClasses: [] });
  const [lcode, setLcode] = useState<string | undefined>();
  const [mcode, setMcode] = useState<string | undefined>();
  const [scode, setScode] = useState<string | undefined>();
  const [dcode, setDcode] = useState<string | undefined>();
  const [largeCodeList, setLargeCodeList] = useState<Address[]>([]);
  const [middleCodeList, setMiddleCodeList] = useState<Address[]>([]);
  const [smallCodeList, setSmallCodeList] = useState<Address[]>([]);
  const [detailCodeList, setDetailCodeList] = useState<Address[]>([]);
  useEffect(() => {
    const r = createAddressMap();
    setLargeCodeList(
      r.largeClasses.map((x) => {
        return { code: x.largeClassCode, text: x.largeClassName };
      })
    );
    setRoot(r);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <InputForm
          largeCodeList={largeCodeList}
          middleCodeList={middleCodeList}
          smallCodeList={smallCodeList}
          detailCodeList={detailCodeList}
          lcode={lcode}
          mcode={mcode}
          scode={scode}
          dcode={dcode}
          onLcodeChange={(code: string) => {
            setLcode(code);
            const l = root.largeClasses.find((x) => x.largeClassCode === code);
            if (l) {
              const list = l.middleClasses.map((x) => {
                return {
                  code: x.middleClassCode,
                  text: x.middleClassName,
                };
              });
              setMiddleCodeList(list);
            }
          }}
          onMcodeChange={(code: string) => {
            setMcode(code);
            const l = root.largeClasses.find((x) => x.largeClassCode === lcode);
            if (!l) {
              return;
            }
            const m = l.middleClasses.find((x) => x.middleClassCode === code);
            if (m) {
              setSmallCodeList(
                m.smallClasses.map((x) => {
                  return {
                    code: x.smallClassCode,
                    text: x.smallClassName,
                  };
                })
              );
            }
          }}
          onScodeChange={(code: string) => {
            setScode(code);
            const l = root.largeClasses.find((x) => x.largeClassCode === lcode);
            if (!l) {
              return;
            }
            const m = l.middleClasses.find((x) => x.middleClassCode === mcode);
            if (!m) {
              return;
            }
            const s = m.smallClasses.find((x) => x.smallClassCode === code);
            if (s) {
              setDetailCodeList(
                s.detailClasses.map((x) => {
                  return {
                    code: x.detailClassCode,
                    text: x.detailClassName,
                  };
                })
              );
            }
          }}
          onDcodeChange={(code: string) => {
            setDcode(code);
          }}
        />
        <div>history</div>
        <div>chart</div>
      </div>
    </div>
  );
}

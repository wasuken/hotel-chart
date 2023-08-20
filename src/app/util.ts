import addressData from "./address.json";

export type Address = {
  code: string;
  text: string;
};

export type Top = {
  largeClasses: LargeClass[];
};
type LargeClass = {
  largeClassCode: string;
  largeClassName: string;
  middleClasses: MiddleClass[];
};

type MiddleClass = {
  middleClassCode: string;
  middleClassName: string;
  smallClasses: SmallClass[];
};
type SmallClass = {
  smallClassCode: string;
  smallClassName: string;
  detailClasses: DetailClass[];
};
type DetailClass = {
  detailClassCode: string;
  detailClassName: string;
};

export function createAddressMap() {
  const root: Top = {
    largeClasses: [],
  };
  for (const lcls of addressData.areaClasses.largeClasses) {
    const [linfo, mclasses] = lcls.largeClass;
    if (
      !mclasses.middleClasses ||
      !(linfo.largeClassName && linfo.largeClassCode)
    ) {
      continue;
    }
    const lclz: LargeClass = {
      largeClassCode: linfo.largeClassCode,
      largeClassName: linfo.largeClassName,
      middleClasses: [],
    };
    for (const mcls of mclasses.middleClasses) {
      const [minfo, sclasses] = mcls.middleClass;
      if (
        !sclasses.smallClasses ||
        !(minfo.middleClassName && minfo.middleClassCode)
      ) {
        console.log("debug", "middle cont");
        continue;
      }
      const mclz: MiddleClass = {
        ...minfo,
        smallClasses: [],
      };
      for (const scls of sclasses.smallClasses) {
        let sinfo;
        let dclasses;
        if (scls.smallClass.length > 1) {
          const [si, dcl] = scls.smallClass;
          sinfo = si;
          dclasses = dcl;
        } else {
          sinfo = scls.smallClass[0];
          dclasses = { detailClasses: [] };
        }
        if (
          !dclasses.detailClasses ||
          !(sinfo.smallClassName && sinfo.smallClassCode)
        ) {
          console.log("debug", "small cont");
          continue;
        }
        const sclz: SmallClass = {
          ...sinfo,
          detailClasses: [],
        };
        for (const dcls of dclasses.detailClasses) {
          const dclz: DetailClass = {
            ...dcls.detailClass,
          };
          sclz.detailClasses.push(dclz);
        }
        mclz.smallClasses.push(sclz);
      }
      lclz.middleClasses.push(mclz);
    }
    root.largeClasses.push(lclz);
  }
  return root;
}

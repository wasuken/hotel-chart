import Form from "react-bootstrap/Form";
import { Address } from "@/app/util";

interface IProps {
  lcode?: string;
  mcode?: string;
  scode?: string;
  dcode?: string;
  largeCodeList: Address[];
  middleCodeList: Address[];
  smallCodeList: Address[];
  detailCodeList: Address[];
  onLcodeChange: (s: string) => void;
  onMcodeChange: (s: string) => void;
  onScodeChange: (s: string) => void;
  onDcodeChange: (s: string) => void;
}

export default function InputForm(props: IProps) {
  const {
    lcode,
    mcode,
    scode,
    dcode,
    largeCodeList,
    middleCodeList,
    smallCodeList,
    detailCodeList,
    onLcodeChange,
    onMcodeChange,
    onScodeChange,
    onDcodeChange,
  } = props;
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>大分類</Form.Label>
        <Form.Select
          aria-label="large code"
          defaultValue=""
          onChange={(e) => onLcodeChange(e.target.value)}
          value={lcode}
        >
          <option>選択してください</option>
          {largeCodeList &&
            largeCodeList.map((l) => (
              <option value={l.code} key={l.code}>
                {l.text}
              </option>
            ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>中分類</Form.Label>
        <Form.Select
          aria-label="middle code"
          defaultValue=""
          onChange={(e) => onMcodeChange(e.target.value)}
          value={mcode}
        >
          <option>選択してください</option>
          {lcode &&
            middleCodeList.map((m) => (
              <option key={m.code} value={m.code}>
                {m.text}
              </option>
            ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>小分類</Form.Label>
        <Form.Select
          aria-label="small code"
          onChange={(e) => onScodeChange(e.target.value)}
          defaultValue=""
          value={scode}
        >
          <option>選択してください</option>
          {lcode &&
            mcode &&
            smallCodeList.map((s) => (
              <option key={s.code} value={s.code}>
                {s.text}
              </option>
            ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>細分類</Form.Label>
        <Form.Select
          aria-label="detail code"
          onChange={(e) => onDcodeChange(e.target.value)}
          defaultValue=""
          value={dcode}
        >
          <option>選択してください</option>
          {lcode &&
            mcode &&
            scode &&
            detailCodeList.map((d) => (
              <option key={d.code} value={d.code}>
                {d.text}
              </option>
            ))}
        </Form.Select>
      </Form.Group>
    </Form>
  );
}

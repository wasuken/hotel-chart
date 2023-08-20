import styles from "./Sidebar.module.css";
import ListGroup from "react-bootstrap/ListGroup";

type Item = {
  href: string;
  text: string;
};

interface IProps {
  items: Item[];
}

export default function Sidebar({ items }: IProps) {
  return (
    <div className={styles.sidebar}>
      <ListGroup>
        {items.map((item, k) => (
          <ListGroup.Item key={k} action href={item.href}>
            {item.text}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

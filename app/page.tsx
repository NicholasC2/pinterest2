import { Navbar } from "./navbar";
import { Masonry } from "@mui/lab"

const list: number[][] = [];

for(let i = 0; i < 100; i++) {
  list.push([Math.floor(Math.random() * 700 + 600), Math.floor(Math.random() * 700 + 600)])
}

const Item = (({width=100, height=100}) => (
  <img 
    style={{
      padding: 0.5,
    }} 
    src={"https://picsum.photos/"+width+"/"+height+"?"+Math.random()*48583475}
  />
));

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Masonry columns={5}>
        {list.map((size, index) => (
          <Item key={index*35425} width={size[0]} height={size[1]}></Item>
        ))}
      </Masonry>
    </>
  );
}

import { useSelector } from "react-redux";
import Form from "./components/Form";
import Image from './components/Image';
import Group from "./components/Group";

function App() {
  const images = useSelector(state => state.gif.images);
  const tags = useSelector(state => state.gif.tags);
  const isGroupped = useSelector(state => state.gif.isGroupped);

  return (
    <div className="app-wrapper">
      <h1>GIF catalog</h1>
      <Form/>
        {isGroupped ?
        <div className="groups-wrapper">
          {tags.map(tag => {
            return <Group
              key = {Math.ceil(Math.random()*10000)}
              tag = {tag}
            />
          })}
        </div> :
        <div className="images-list">
          {images.map(image => {
            return <Image
              key = {image.id}
              src = {image.src}
              tag = {image.tag}
            />
          })}
        </div>
        }
    </div>
  );
}

export default App;

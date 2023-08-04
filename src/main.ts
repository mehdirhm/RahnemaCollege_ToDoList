import "./style.css";

import { TODO } from "./types/type";
const createId = () => {
  return Math.floor(Math.random() * 100000);
};
type LABLE = "Green" | "Blue" | "Red" | "Yellow";
const lable: LABLE[] = ["Green", "Blue", "Red", "Yellow"];
let data: TODO[] = [
  {
    id: createId(),
    title: "todo1",
    state: "todo",
    date: "2020-01-01",
    description: "todo1",
    color: [],
  },
  {
    id: createId(),
    title: "todo2",
    state: "doing",
    date: "2020-01-02",
    description: "todo1",
    color: [],
  },
  {
    id: createId(),
    title: "todo3",
    state: "done",
    date: "2020-01-03",
    description: "todo1",
    color: [],
  },
];
type DO = "todo" | "doing" | "done";
const typeDo: DO[] = ["todo", "doing", "done"];
const input: HTMLInputElement = document.createElement("input");
const div: HTMLDivElement = document.createElement("div");
const handleChangeInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.value) {
    const todo: TODO = addTodo(target.value);
    target.value = "";
    renderUi();
  }
};
input.onchange = handleChangeInput;

export const renderUi = () => {
  div.innerHTML = "";
  div.appendChild(input);
  div.appendChild(renderList("todo"));
  div.appendChild(renderList("doing"));
  div.appendChild(renderList("done"));
  document.querySelector<HTMLDivElement>("#app")!.appendChild(div);
};

const handleClicked = (e: Event, id: number) => {
  const target = e.target as HTMLButtonElement;
  const state = target.textContent!.toLowerCase();
  console.log(data);
  data = data.map((todo: TODO) => {
    if (todo.id === id) {
      todo.state = state;
    }
    return todo;
  });
  renderUi();
};

const handleChangeLabel = (e: Event, id: number, color: string) => {
    const target = e.target as HTMLButtonElement; // Explicitly cast to HTMLButtonElement
    const button = target as HTMLButtonElement;
    
    console.log(data);
  data = data.map((todo: TODO) => {
    if (todo.id === id) {
        if(!todo.color.includes(color)){
            todo.color.push(color);
            button.style.backgroundColor = color;  
        }
        else{
            todo.color = todo.color.filter((item: string) => item !== color);
            button.style.backgroundColor = '';  
        }
      
    //   console.log(todo.color);
    }
    return todo;
  });
//   renderUi();
};

const addTodo: (title: string) => TODO = (title) => {
  const todo: TODO = {
    id: new Date().getTime(),
    title,
    state: "todo",
    date: new Date().toISOString(),
    description: title,
    color: [],
  };
  data.push(todo);
  return todo;
};

export const renderList: (state: string) => HTMLDivElement = (state) => {
  const filterTypeDo: DO[] = typeDo.filter((type: DO) => type !== state);
  const ul: HTMLUListElement = document.createElement("ul");
  const div = document.createElement("div");
  const h1 = document.createElement("h1");
  h1.innerHTML = state;
  ul.innerHTML = "";
  const filterData = data.filter((todo: TODO) => todo.state === state);
  filterData.forEach((todo: TODO) => {
    const li: HTMLLIElement = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.gap = "10px";
    const button_1: HTMLButtonElement = document.createElement("button");
    const button_2: HTMLButtonElement = document.createElement("button");
    const span: HTMLSpanElement = document.createElement("span");
    span.textContent = todo.title;
    button_1.textContent = filterTypeDo[0];
    button_2.textContent = filterTypeDo[1];
    button_1.onclick = (event) => handleClicked(event, todo.id);
    button_2.onclick = (event) => handleClicked(event, todo.id);

    li.appendChild(span);
    li.appendChild(button_1);
    li.appendChild(button_2);
    lable.map((color: LABLE) => {
      const button: HTMLButtonElement = document.createElement("button");
      button.onclick = (event) => handleChangeLabel(event, todo.id, color);
      button.style.width = "20px";
      button.style.height = "20px";
      if(todo.color.includes(color)){
        button.style.backgroundColor = color;
      }
      else{
        button.style.borderColor = color;
    }
      li.appendChild(button);
    });

    ul.appendChild(li);
  });
  div.appendChild(h1);
  div.appendChild(ul);
  return div;
};

renderUi();

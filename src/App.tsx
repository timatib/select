import "./assets/scss/index.scss";
import Container from "./ui/Container";
import { SelectOption } from "./ui/Select";
import defaultIcon_1 from "./assets/images/iocn_1.svg";

const defaultOptions: SelectOption[] = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4" },
];

const customOptions: SelectOption[] = [
  {
    label: "Соловьёв Александр",
    subLabel: "tima.matsuka@gmail.com",
    value: "1",
    icon: defaultIcon_1,
  },
  {
    label: "Соловьёв Александр",
    subLabel: "tima.matsuka@gmail.com",
    value: "2",
    icon: defaultIcon_1,
  },
  {
    label: "Соловьёв Александр",
    subLabel: "tima.matsuka@gmail.com",
    value: "3",
    icon: defaultIcon_1,
  },
  {
    label: "Соловьёв Александр",
    subLabel: "tima.matsuka@gmail.com",
    value: "4",
    icon: defaultIcon_1,
    disabled: true,
  },
];

function App() {
  return (
    <div>
      <h1>Custom Select Component</h1>

      <Container title="Single" mode="single" options={defaultOptions} />
      <Container
        title="Disabled"
        mode="single"
        options={defaultOptions}
        disabled
      />
      <Container title="Multiple" mode="multiple" options={defaultOptions} />
      <Container
        title="Multiple with disable"
        mode="multiple"
        options={customOptions}
      />
    </div>
  );
}

export default App;

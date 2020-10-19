import { createMachine, interpret } from "xstate";
import { toMachine } from "xstate/lib/scxml";
import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>XState TypeScript Example</h1>
<div>
  Open the <strong>Console</strong> to view the machine output.
</div>
`;

interface ToggleContext {
  count: number;
}

type ToggleEvent = {
  type: "TOGGLE";
};

const scxml = `<scxml 
    datamodel="ecmascript"
    xmlns="http://www.w3.org/2005/07/scxml"
    version="1.0">
    <state id="a">
        <transition target="b" event="t1"/>
    </state>
    <state id="b">
        <transition target="a" event="t2"/>
    </state>
</scxml>`;
const machine = toMachine(scxml, {
          delimiter: '$'
        });

// Edit your machine(s) here
// const machine = createMachine<ToggleContext, ToggleEvent>({
//   id: "machine",
//   initial: "inactive",
//   context: {
//     count: 0
//   },
//   states: {
//     inactive: {
//       on: { TOGGLE: "active" }
//     },
//     active: {
//       on: { TOGGLE: "inactive" }
//     }
//   }
// });

// Edit your service(s) here
const service = interpret(machine).onTransition(state => {
  console.log(state.value);
});

service.start();

// service.send("TOGGLE");
// service.send("TOGGLE");
service.send("t1");
service.send("t2");

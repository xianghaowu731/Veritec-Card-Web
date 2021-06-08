import './src/utils/theme.css'


const ReactDOM = require('react-dom')

console.error=()=>{}
console.warn = ()=>{}
console.log = ()=>{}

export const onInitialClientRender = () => {
    setTimeout(function() {
        const node = document.getElementById("___loader")
        if(node){        
            node.style.display = "none"
        }
    }, 3000)
}

export const replaceHydrateFunction = () => {
    return (element, container, callback) => {
      console.log("rendering!");
      ReactDOM.render(element, container, callback);
    };
  };


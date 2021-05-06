import './src/utils/theme.css'


console.error=()=>{}
console.warn = ()=>{}
console.log = ()=>{}

export const onInitialClientRender = () => {
    setTimeout(function() {
        const node = document.getElementById("___loader")
        if(node){        
            node.style.display = "none"
        }
    }, 5000)
}

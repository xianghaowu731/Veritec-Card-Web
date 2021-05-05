

const Utils = {

    convDateTimeToDate : (val)=>{
        if(!val){
            return '-'
        }

        try{
            let list = val.split(' ')
            if(list.length > 1){
                let dates = list[0].split('-')
                return `${dates[1]}/${dates[2]}/${dates[0]}`
            }
        }catch(ex){
            console.log(ex)
            return '-'
        }
    },

    shortString: (msg, len = 20)=>{
        if(!msg){
            return '';
        }
        if( msg.length){
            let more = msg.length > len ? ' ...' : ''
            return msg.substr(0, len) + more
        }
    },
    ValidateEmail: (inputText) => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputText))
        {
            return (true)
        }
        return false

    },
    upperFirstLetter : val=>{
        if(!val){
            return ''
        }

        const res = val.toString().toUpperCase().substr(0, 1)
        const rest = val.toString().substr(1)
        return `${res}${rest}`;


    },

    getKey:()=>{
        return Math.random().toString(36).substr(2, 10)
    }

    


}

export default Utils
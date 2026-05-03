import axios from "axios"

export const askai = async(message)=>{
    try{
        if(!message|| Array.isArray(message)||message.length===0){
            throw new Error("Message must be a non-empty array")
        }
    const response = await axios.post(process.env.OPEN_ROUTER_URL,{
        model:"deepseek/deepseek-chat",
        messages:message,
        temperature:0.7,
        max_tokens:2000,
        response_format:{type:"json_object"}
    }
,{
    headers:{
        Authorization: `Bearer ${process.env.OPEN_ROUTER_KEY}`,

    'X-OpenRouter-Title': 'SnappyUI', 
    'Content-Type': 'application/json',
    }
    })
    const content = response?.data?.choices?.[0]?.message?.content          
    if(!content|| !content.trim()){
        throw new Error("Invalid response from OpenRouter")
    }
    return content
        // const response = await 
    }catch(error){
        console.error("Error in askai:", error.message)
        throw new Error("Failed to get response from OpenRouter")

    }
}
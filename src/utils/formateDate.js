export const formateDate=(isDate)=>{
    const data=new Date(isoDate);
    return data.toLocaleDateString('en-US',{
        year:'numeric',
        month:'long',
        day:'numeric'
    })
}